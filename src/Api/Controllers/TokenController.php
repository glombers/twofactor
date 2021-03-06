<?php

/*
 * This file is based on Flarum's Api/Controller/TokenController.php
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Reflar\twofactor\Api\Controllers;

use Flarum\Core\Exception\PermissionDeniedException;
use Flarum\Core\Repository\UserRepository;
use Flarum\Http\AccessToken;
use Flarum\Http\Controller\ControllerInterface;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;
use Illuminate\Contracts\Events\Dispatcher as EventDispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Reflar\twofactor\TwoFactor;
use Zend\Diactoros\Response\JsonResponse;

class TokenController implements ControllerInterface
{
    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * @var BusDispatcher
     */
    protected $bus;

    /**
     * @var EventDispatcher
     */
    protected $events;

    /**
     * @var TwoFactor
     */
    protected $twoFactor;

    /**
     * @param UserRepository  $users
     * @param BusDispatcher   $bus
     * @param EventDispatcher $events
     * @param TwoFactor       $twoFactor
     */
    public function __construct(UserRepository $users, BusDispatcher $bus, EventDispatcher $events, TwoFactor $twoFactor)
    {
        $this->users = $users;
        $this->bus = $bus;
        $this->events = $events;
        $this->twoFactor = $twoFactor;
    }

    /**
     * {@inheritdoc}
     */
    public function handle(ServerRequestInterface $request)
    {
        $body = $request->getParsedBody();

        $identification = array_get($body, 'identification');
        $password = array_get($body, 'password');
        $lifetime = array_get($body, 'lifetime', 3600);
        $twofactor = array_get($body, 'twofactor');
        $pageId = array_get($body, 'pageId');

        if (!$twofactor) {
            $twofactor = '0';
        }

        $user = $this->users->findByIdentification($identification);

        if (!$user || !$user->checkPassword($password)) {
            throw new PermissionDeniedException();
        }

        if (2 === $user->twofa_enabled) {
            if ($this->twoFactor->verifyTOTPCode($user, $twofactor)) {
                return $this->generateAccessCode($user, $lifetime);
            } else {
                return 'IncorrectCode';
            }
        } elseif (4 === $user->twofa_enabled) {
            if ($this->twoFactor->verifyPhoneCode($user, $twofactor)) {
                return $this->generateAccessCode($user, $lifetime);
            } else {
                if ($user->pageId !== $pageId) {
                    $user->pageId = $pageId;
                    $this->twoFactor->sendText($user);
                }
                return 'IncorrectCode';

            }
        } else {
            return $this->generateAccessCode($user, $lifetime);
        }
    }

    protected function generateAccessCode($user, $lifetime)
    {
        $token = AccessToken::generate($user->id, $lifetime);
        $token->save();

        return new JsonResponse([
            'token' => $token->id,
            'userId' => $user->id,
        ]);
    }
}
