<?php
use PHPUnit\Framework\TestCase;
require __DIR__ . '/../src/Browser.php';

final class BrowserTest extends TestCase
{
    public function testInitialize(): void
    {
        // Arrange
        $driverPath = realpath(Constants::DRIVER_PATH);
        $browserPath = realpath(Constants::BROWSER_PATH);

        $browser = new Browser($driverPath, $browserPath);

        // Act
        try
        {
            $browser->initialize();
        }
        finally
        {
            $browser->close();
        }

        // Assert
        $this->assertTrue(true);
    }

    public function testGetHtml(): void
    {
        // Arrange
        $driverPath = realpath(Constants::DRIVER_PATH);
        $browserPath = realpath(Constants::BROWSER_PATH);

        $result = null;
        $url = "https://seznam.cz";
        $browser = new Browser($driverPath, $browserPath);

        // Act
        try
        {
            $browser->initialize();

            // TODO: check why times out on request to chromedriver
            $result = $browser->getHtml($url);
        }
        finally {
            $browser->close();
        }

        // Assert
        $this->assertNotNull($result);
    }
}