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

use Flarum\Event\UserWillBeSaved;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\twofactor\TwoFactor;

class SaveTwoFactorToDatabase
{
    /**
     * @var TwoFactor
     */
    private $twoFactor;

    /**
     * @param TwoFactor $twoFactor
     */
    public function __construct(TwoFactor $twoFactor)
    {
        $this->twoFactor = $twoFactor;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(UserWillBeSaved::class, [$this, 'whenUserWillBeSaved']);
    }

    public function whenUserWillBeSaved(UserWillBeSaved $event)
    {
        $user = $event->user;

        if ($event->data['attributes']['enabled'] == 1) {
            $this->twoFactor->prepare2Factor($user);
        } elseif ($event->data['attributes']['enabled'] == 0) {
            $this->twoFactor->disable2Factor($user);
        }
    }
}
