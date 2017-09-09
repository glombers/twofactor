<?php

namespace Reflar\twofactor;

use Flarum\Settings\SettingsRepositoryInterface;
use PragmaRX\Google2FA\Google2FA;

class TwoFactor
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var Google2FA
     */
    protected $google2fa;

    /**
     * @param SettingsRepositoryInterface $settings
     * @param Google2FA                   $google2fa
     */
    public function __construct(SettingsRepositoryInterface $settings, Google2FA $google2fa)
    {
        $this->google2fa = $google2fa;
        $this->settings = $settings;
    }

    public function prepare2Factor($user)
    {
        $user->twofa_enabled = 2;
        $user->google2fa_secret = $this->google2fa->generateSecretKey(16);
        $user->recovery_codes = $this->generateRecoveryCodes();
        $user->save();

        return $user;
    }

    public function enable2Factor($user)
    {
        $user->twofa_enabled = 1;
        $user->save();
    }

    public function disable2Factor($user)
    {
        $user->google2fa_secret = '';
        $user->twofa_enabled = 0;
        $user->recovery_codes = null;
        $user->save();
    }

    public function getURL($user)
    {
        return $this->google2fa->getQRCodeGoogleUrl(
            urlencode($this->settings->get('forum_title')),
            $user->username,
            $user->google2fa_secret
        );
    }

    public function generateRecoveryCodes()
    {
        $randstr = '';
        $chars = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        ];
        for ($i = 0; $i < 3; ++$i) {
            for ($rand = 0; $rand < 7; ++$rand) {
                $random = rand(0, count($chars) - 1);
                if ($rand == 3) {
                    $randstr .= '-';
                } else {
                    $randstr .= $chars[$random];
                }
            }
            if ($i !== 2) {
                $randstr .= ',';
            }
        }

        return $randstr;
    }

    public function doRecovery($code, $user)
    {
        $code = strtoupper($code);
        $codes = explode(',', $user->recovery_codes);
        if (in_array($code, $codes)) {
            if (($key = array_search($code, $codes)) !== false) {
                unset($codes[$key]);
            }
            $user->recovery_codes = implode(',', $codes);
            $user->save();

            return true;
        } else {
            return false;
        }
    }

    public function verifyCode($user, $input)
    {
        return $this->google2fa->verifyKey($user->google2fa_secret, $input);
    }
}
