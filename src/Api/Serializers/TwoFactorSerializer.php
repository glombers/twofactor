<?php

namespace Reflar\twofactor\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class TwoFactorSerializer extends AbstractSerializer
{
    /**
     * @var string
     */
    protected $type = 'TwoFactor';

    /**
     * @param $group
     *
     * @return array
     */
    protected function getDefaultAttributes($twoFactor)
    {
        return [
            'data' => $twoFactor,
        ];
    }
}
