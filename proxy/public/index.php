<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Include the Composer autoloader
require __DIR__ . '/../vendor/autoload.php';

// Create a new Slim App instance
$app = new \Slim\App;

// Default root get route
$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write('Hello from Simple Proxy!');
    return $response;
});

$app->get('/users/{id}', function (Request $request, Response $response, array $args) {
    $users = [
        1 => ['name' => 'Alice', 'email' => 'alice@example.com'],
        2 => ['name' => 'Bob', 'email' => 'bob@example.com'],
    ];

    $userId = (int)$args['id'];
    $user = $users[$userId] ?? null;

    if ($user) {
        // Use the withJson helper to return data and set the correct header
        return $response->withJson($user);
    } else {
        // Return the error with a 404 status code.
        return $response->withJson(['error' => 'User not found'], 404);
    }
});

// Run the Slim application
$app->run();