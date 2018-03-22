<?php

namespace Reflar\twofactor;

use Illuminate\Contracts\Events\Dispatcher;
use Tobscure\JsonApi\ErrorHandler;

return function (Dispatcher $events, ErrorHandler $handler) {
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddApiAttributes::class);
    $events->subscribe(Listeners\AddCarrierRelationship::class);

    $handler->registerHandler(new Handler\IncorrectTwoFactorExceptionHandler);

};
