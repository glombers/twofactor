<?php

namespace Reflar\twofactor;

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddApiAttributes::class);
    $events->subscribe(Listeners\AddCarrierRelationship::class);
};
