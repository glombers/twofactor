<?php

namespace Reflar\twofactor\Exceptions;

use Exception;

class IncorrectTwoFactorException extends Exception
{
    public function __construct($message = null, $code = 418, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
