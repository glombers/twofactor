<?php

namespace Reflar\twofactor\Exceptions;

use Exception;

class IncorrectTwoFactorException extends Exception
{
    public function __construct($message = 'invalid twofactor code', $code = 406, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
