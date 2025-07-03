<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

// Include the Composer autoloader
require __DIR__ . '/../vendor/autoload.php';

// Create a new Slim App instance
$app = AppFactory::create();

// Default root get route
$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write('Hello from Simple Proxy!');
    return $response;
});

$app->get('/users/{id}', function (Request $request, Response $response, array $args) {
    // A dummy array of users. In a real app, this would come from a database.
    $users = [
        1 => ['name' => 'Alice', 'email' => 'alice@example.com'],
        2 => ['name' => 'Bob', 'email' => 'bob@example.com'],
    ];

    $userId = (int)$args['id'];
    $user = $users[$userId] ?? null;

    if ($user) {
        $payload = json_encode($user);
        $response->getBody()->write($payload);
    } else {
        // Return a 404 Not Found status code.
        $response = $response->withStatus(404);
        $response->getBody()->write(json_encode(['error' => 'User not found']));
    }

    // Return the response with the correct JSON content type header.
    return $response->withHeader('Content-Type', 'application/json');
});

// Run the Slim application
$app->run();