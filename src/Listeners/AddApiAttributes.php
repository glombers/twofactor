<?php

namespace Reflar\twofactor\Listeners;

use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\twofactor\Api\Controllers;

class AddApiAttributes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
    }

    /**
     * @param ConfigureApiRoutes $event
     */
    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        $event->get('/twofactor/getsecret', 'twofactor.getsecret', Controllers\GetSecretController::class);

        $event->post('/twofactor/login', 'twofactor.login', Controllers\LogInController::class);
        $event->post('/twofactor/verifycode', 'twofactor.verifycode', Controllers\VerifyCodeController::class);
    }
}
