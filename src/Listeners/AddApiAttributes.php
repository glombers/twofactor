<?php

namespace Reflar\twofactor\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\ConfigureApiRoutes;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\PrepareApiAttributes;
use Reflar\twofactor\Api\Controllers;

class AddApiAttributes
{
    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
        $events->listen(PrepareApiAttributes::class, [$this, 'addForumAttributes']);
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

    /**
     * @param PrepareApiAttributes $event
     */
    public function addForumAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(UserSerializer::class)) {
            if ($event->actor->id === $event->model->id) {
                $event->attributes['twofa-enabled'] = $event->model->twofa_enabled;
            }
        }
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['twillio_enabled'] = $this->settings->get('reflar.twofactor.twillio_enabled');
        }
    }
}
