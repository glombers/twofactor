<?php

namespace Reflar\twofactor;

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Contracts\Mail\Mailer;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\Translation\TranslatorInterface;
use Twilio\Rest\Client as Client;

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
     * @var Hasher
     */
    protected $hasher;

    /**
     * @var MAiler
     */
    protected $mailer;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * TwoFactor constructor.
     *
     * @param SettingsRepositoryInterface $settings
     * @param Google2FA                   $google2fa
     * @param Hasher                      $hasher
     * @param Mailer                      $mailer
     * @param TranslatorInterface         $translator
     */
    public function __construct(
        SettingsRepositoryInterface $settings,
        Google2FA $google2fa,
        Hasher $hasher,
        Mailer $mailer,
        TranslatorInterface $translator
    ) {
        $this->google2fa = $google2fa;
        $this->settings = $settings;
        $this->hasher = $hasher;
        $this->mailer = $mailer;
        $this->translator = $translator;
    }

    public function prepareTOTP2Factor($user)
    {
        $user->google2fa_secret = $this->google2fa->generateSecretKey(16);
        $user->save();

        return $user;
    }

    public function enableTOTP2Factor($user)
    {
        $user->twofa_enabled = 2;
        $recoveryCodes = $this->generateRecoveryCodes();

        $codes = explode(',', $recoveryCodes);

        foreach ($codes as &$code) {
            $code = $this->hasher->make($code);
        }

        $user->recovery_codes = implode(',', $codes);

        $user->save();

        return $recoveryCodes;
    }

    public function disable2Factor($user)
    {
        $user->google2fa_secret = '';
        $user->twofa_enabled = 0;
        $user->recovery_codes = '';
        $user->phone = '';
        $user->carrier = '';
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

    public function generateRandom6String()
    {
        $randst = '';
        $chars = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
        ];
        for ($rand = 0; $rand < 7; ++$rand) {
            $random = rand(0, count($chars) - 1);
            if (3 == $rand) {
                $randst .= '-';
            } else {
                $randst .= $chars[$random];
            }
        }

        return $randst;
    }

    public function generateRecoveryCodes()
    {
        $randstr = '';
        for ($i = 0; $i < 3; ++$i) {
            $randstr .= $this->generateRandom6String();
            if (2 !== $i) {
                $randstr .= ',';
            }
        }

        return $randstr;
    }

    public function preparePhone2Factor($user, $phone)
    {
        $user->phone = $phone;
        $user->twofa_enabled = 3;

        $this->sendText($user);

        $user->save();
    }

    public function enablePhone2Factor($user)
    {
        $user->twofa_enabled = 4;
        $recoveryCodes = $this->generateRecoveryCodes();

        $codes = explode(',', $recoveryCodes);

        foreach ($codes as &$code) {
            $code = $this->hasher->make($code);
        }

        $user->recovery_codes = implode(',', $codes);

        $user->save();

        return $recoveryCodes;
    }

    public function doRecovery($code, $user)
    {
        $code = strtoupper($code);
        $codes = explode(',', $user->recovery_codes);

        $return = false;
        for ($i = 0; $i < count($codes); ++$i) {
            if ($this->hasher->check($code, $codes[$i])) {
                unset($codes[$i]);
                $return = true;
                break;
            }
        }
        $user->recovery_codes = implode(',', $codes);
        $user->save();

        return $return;
    }

    public function verifyTOTPCode($user, $input)
    {
        if ($this->google2fa->verifyKey($user->google2fa_secret, $input)) {
            $return = true;
        } else {
            $return = $this->doRecovery($input, $user);
        }

        return $return;
    }

    public function verifyPhoneCode($user, $input)
    {
        if ($this->hasher->check($input, $user->text_code)) {
            $return = true;
        } else {
            $return = $this->doRecovery($input, $user);
        }

        return $return;
    }

    public function sendText($user)
    {
        $sid = $this->settings->get('reflar.twofactor.twillio_sid');
        $token = $this->settings->get('reflar.twofactor.twillio_token');
        $client = new Client($sid, $token);

        $randst = $this->generateRandom6String();
        $user->text_code = $this->hasher->make($randst);

        $client->messages->create($user->phone, array(
            'from' => $this->settings->get('reflar.twofactor.twillio_number'),
            'body' => $this->translator->trans('reflar-twofactor.forum.text', [
                    '{forum}' => $this->settings->get('forum_title'),
                    '{code}' => $randst,
                ]),
        ));
    }

    public function notifyEnabled($user)
    {
    }
}
