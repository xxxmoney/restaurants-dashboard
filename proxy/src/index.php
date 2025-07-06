<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require __DIR__ . '/Constants.php';
require __DIR__ . '/Browser.php';
require __DIR__ . '/../vendor/autoload.php';

// Create a new Slim App instance
$app = new \Slim\App;

// Default root get route
$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write('Hello from Simple Proxy!');
    return $response;
});

// Scraper endpoint
$app->get('/html', function (Request $request, Response $response, array $args) {
    $url = (string)$args['url'];

    if ($url)
    {
        $browser = new Browser(realpath(Constants::DRIVER_PATH), realpath(Constants::BROWSER_PATH));
        $browser->initialize();

        $html = $browser->getHtml($url);

        $browser->close();

        $result = [
            'url' => $url,
            'html' => $html
        ];
        return $response->withJson($result);
    } else
    {
        return $response->withJson(['error' => 'Url not specified'], 400);
    }
});


// Run the Slim application
$app->run();