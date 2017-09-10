<?php
/**
 *  This file is part of reflar/gamification.
 *
 *  Copyright (c) ReFlar.
 *
 *  http://reflar.io
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 */

namespace Reflar\twofactor\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\twofactor\Carrier;

class AddCarrierRelationship
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'addAttributes']);
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
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['carriers'] = Carrier::orderBy('identifier', 'asc')->get()->pluck('identifier');
        }
    }
}
