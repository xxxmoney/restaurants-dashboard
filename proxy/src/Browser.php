<?php

use Facebook\WebDriver\Chrome\ChromeDriver;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;
require __DIR__ . '/Constants.php';

class Browser
{
    private ?RemoteWebDriver $driver = null;
    /** @var resource|null The process resource for chromedriver */
    private $process = null;
    private ?int $pid = null;
    private string $driverPath;
    private string $browserPath;

    /**
     * @param string $driverPath Path to the chromedriver executable
     * @param string $browserPath Path to the chrome browser executable
     */
    public function __construct(string $driverPath, string $browserPath)
    {
        $this->driverPath = $driverPath;
        $this->browserPath = $browserPath;
    }

    /**
     * Starts the ChromeDriver process and initializes the browser session
     */
    public function initialize(): void
    {
        if ($this->process !== null && is_resource($this->process)) {
            $status = proc_get_status($this->process);
            if ($status['running']) {
                return; // Already initialized and running
            }
        }

        // Start the ChromeDriver process with specified parameters
        $descriptorSpec = [
            0 => ["pipe", "r"], // stdin
            1 => ["pipe", "w"], // stdout
            2 => ["pipe", "w"], // stderr
        ];

        $command = $this->driverPath . ' --port=' . Constants::DRIVER_PORT;
        $this->process = proc_open($command, $descriptorSpec, $pipes);

        if (!is_resource($this->process)) {
            throw new RuntimeException('ChromeDriver could not be started');
        }

        $status = proc_get_status($this->process);
        if (Constants::IsWindows()) {
            $this->pid = $this->findChromeDriverPidOnWindows();
        } else {
            $status = proc_get_status($this->process);
            $this->pid = $status['pid'];
        }

        // Give the driver a moment to start
        sleep(2);

        // Configure Chrome options
        $options = new ChromeOptions();
        $options->setBinary($this->browserPath);
        $options->addArguments(['--headless', '--disable-gpu', '--no-sandbox']);

        $capabilities = DesiredCapabilities::chrome();
        $capabilities->setCapability(ChromeOptions::CAPABILITY, $options);

        // Connect to the running driver
        $this->driver = RemoteWebDriver::create(Constants::DRIVER_URL, $capabilities);
    }

    /**
     * Navigates to a URL and returns the full page HTML
     *
     * @param string $url The URL to navigate to
     * @param string $waitForSelector A CSS selector to wait for before getting the HTML
     * @param int $timeoutInSeconds Max time to wait for the selector
     * @return string The full HTML content of the page
     */
    public function getHtml(string $url, string $waitForSelector = 'body', int $timeoutInSeconds = 10): string
    {
        if (!$this->driver) {
            throw new RuntimeException('Browser is not initialized. Please call initialize() first');
        }

        $this->driver->get($url);

        // Wait for a specific element to be loaded to ensure JS has rendered
        $this->driver->wait($timeoutInSeconds)->until(
            WebDriverExpectedCondition::presenceOfElementLocated(
                WebDriverBy::cssSelector($waitForSelector)
            )
        );

        return $this->driver->getPageSource();
    }

    private function findChromeDriverPidOnWindows(): ?int
    {
        $command = "wmic process where \"name='chromedriver.exe'\" get processid /value";
        exec($command, $output);

        foreach ($output as $line) {
            if (stripos($line, 'ProcessId') === 0) {
                $parts = explode('=', $line);
                if (isset($parts[1]) && is_numeric(trim($parts[1]))) {
                    return (int)trim($parts[1]);
                }
            }
        }

        return null;
    }

    /**
     * Closes the browser session and stops the ChromeDriver process
     */
    public function close(): void
    {
        if ($this->driver) {
            $this->driver->quit();
            $this->driver = null;
        }

        if ($this->process !== null && is_resource($this->process)) {
            // Terminate the process and close the pipes
            proc_terminate($this->process);
            proc_close($this->process);

            // Kill the chromedriver process directly
            if (Constants::IsWindows()) {
                // For Windows
                exec("taskkill /F /T /PID " . $this->pid);
            } else {
                // For Linux/macOS
                exec("kill -9 " . $this->pid);
            }

            $this->process = null;
            $this->pid = null;
        }
    }

    /**
     * Destructor to ensure resources are cleaned up
     */
    public function __destruct()
    {
        $this->close();
    }
}
