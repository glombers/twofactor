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

namespace Reflar\twofactor\Api\Controllers;

use Flarum\Api\Controller\AbstractResourceController;
use Psr\Http\Message\ServerRequestInterface;
use Reflar\twofactor\Carrier;
use Reflar\twofactor\TwoFactor;
use Tobscure\JsonApi\Document;

class VerifyCodeController extends AbstractResourceController
{
    public $serializer = 'Reflar\twofactor\Api\Serializers\TwoFactorSerializer';

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
     * @param ServerRequestInterface $request
     * @param Document               $document
     *
     * @return mixed
     */
    public function data(ServerRequestInterface $request, Document $document)
    {
        $data = $request->getParsedBody();
        $actor = $request->getAttribute('actor');

        $return = '';

        switch ($data['step']) {
            case 0:
                $actor->twofa_enabled = 0;
                $actor->save();
                break;
            case 1:
                $actor->twofa_enabled = 1;
                $return = $this->twoFactor->prepareTOTP2Factor($actor);
                $actor->save();
                break;
            case 2:
                if ($this->twoFactor->verifyTOTPCode($actor, $data['code'])) {
                    $return = $this->twoFactor->enableTOTP2Factor($actor);
                } else {
                    $return = 'IncorrectCode';
                }
                break;
            case 3:
                $carrier = Carrier::where('identifier', $data['carrier'])->firstOrFail();
                $actor->carrier = $carrier->email;

                $this->twoFactor->preparePhone2Factor($actor, $data['phone']);
                break;
            case 4:
                if ($this->twoFactor->verifyPhoneCode($actor, strtoupper($data['code']))) {
                    $return = $this->twoFactor->enablePhone2Factor($actor);
                } else {
                    $return = 'IncorrectCode';
                }
                break;
        }

        return $return;
    }
}
