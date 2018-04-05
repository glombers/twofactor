<?php

/*
 * This file is based on Flarum's Forum/Controller/LogInController.php
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Reflar\twofactor\Api\Controllers;

use Flarum\Api\Client;
use Flarum\Core\Repository\UserRepository;
use Flarum\Event\UserLoggedIn;
use Flarum\Http\AccessToken;
use Flarum\Http\Controller\ControllerInterface;
use Flarum\Http\Rememberer;
use Flarum\Http\SessionAuthenticator;
use Psr\Http\Message\ServerRequestInterface as Request;
use Zend\Diactoros\Response\EmptyResponse;
use Zend\Diactoros\Response\JsonResponse;

class LogInController implements ControllerInterface
{
    /**
     * @var \Flarum\Core\Repository\UserRepository
     */
    protected $users;

    /**
     * @var Client
     */
    protected $apiClient;

    /**
     * @var SessionAuthenticator
     */
    protected $authenticator;

    /**
     * @var Rememberer
     */
    protected $rememberer;

    /**
     * @param \Flarum\Core\Repository\UserRepository $users
     * @param Client                                 $apiClient
     * @param SessionAuthenticator                   $authenticator
     * @param Rememberer                             $rememberer
     */
    public function __construct(UserRepository $users, Client $apiClient, SessionAuthenticator $authenticator, Rememberer $rememberer)
    {
        $this->users = $users;
        $this->apiClient = $apiClient;
        $this->authenticator = $authenticator;
        $this->rememberer = $rememberer;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse|EmptyResponse
     */
    public function handle(Request $request)
    {
        $actor = $request->getAttribute('actor');
        $body = $request->getParsedBody();
        $params = array_only($body, ['identification', 'password', 'twofactor']);

        $response = $this->apiClient->send(TokenController::class, $actor, [], $params);

        if ('IncorrectCode' !== $response) {
            if (200 === $response->getStatusCode()) {
                $data = json_decode($response->getBody());

                $session = $request->getAttribute('session');
                $this->authenticator->logIn($session, $data->userId);

                $token = AccessToken::find($data->token);

                event(new UserLoggedIn($this->users->findOrFail($data->userId), $token));

                $response = $this->rememberer->remember($response, $token, !array_get($body, 'remember'));
            }
        }

        return $response;
    }
}
