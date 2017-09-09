<?php

namespace Reflar\twofactor\Listeners;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\ConfigureApiRoutes;
use Flarum\Event\PrepareApiAttributes;
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
        $events->listen(PrepareApiAttributes::class, [$this, 'addAttributes']);
        $events->listen(ConfigureLocales::class, [$this, 'configLocales']);
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
    public function addAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(UserSerializer::class)) {
            if ($event->actor->id === $event->model->id) {
                $event->attributes['twofa-enabled'] = $event->model->twofa_enabled;
            }
        }
    }

    public function configLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'], false)) {
                $event->locales->addTranslations($file->getBasename('.'.$file->getExtension()), $file->getPathname());
            }
        }
    }
}
