<?php

class Constants
{
    public const DRIVER_PATH = __DIR__ .'\..\bin\chromedriver-win64\chromedriver.exe';

    public const BROWSER_PATH = __DIR__ .'\..\bin\chrome-win64\chrome.exe';

    public const DRIVER_PORT = 9515;
    public const DRIVER_URL = 'http://localhost:' . self::DRIVER_PORT;

    public static function IsWindows(): bool
    {
        return strtoupper(substr(PHP_OS, 0, 3)) === 'WIN';
    }
}
