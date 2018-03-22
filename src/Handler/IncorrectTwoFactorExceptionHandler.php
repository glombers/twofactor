<?php

namespace Reflar\twofactor\Handler;

use Exception;
use Reflar\twofactor\Exceptions\IncorrectTwoFactorException;
use Tobscure\JsonApi\Exception\Handler\ExceptionHandlerInterface;
use Tobscure\JsonApi\Exception\Handler\ResponseBag;

class IncorrectTwoFactorExceptionHandler implements ExceptionHandlerInterface
{
    /**
     * {@inheritdoc}
     */
    public function manages(Exception $e)
    {
        return $e instanceof IncorrectTwoFactorException;
    }
    /**
     * {@inheritdoc}
     */
    public function handle(Exception $e)
    {
        $status = 418;
        $error = [
            'status' => (string) $status,
            'code' => 'incorrect_twofactor'
        ];
        return new ResponseBag($status, [$error]);
    }
}