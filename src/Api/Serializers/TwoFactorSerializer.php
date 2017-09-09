<?php

namespace Reflar\twofactor\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class TwoFactorSerializer extends AbstractSerializer
{
    /**
     * @var string
     */
    protected $type = 'user';

    /**
     * @param $group
     *
     * @return array
     */
    protected function getDefaultAttributes($user)
    {
        return [
            'secret' => $user->google2fa_secret,
            'codes' => $user->recovery_codes,
            'url' => $user->url,
        ];
    }
}
