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

use Flarum\Api\Controller\AbstractCollectionController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Reflar\twofactor\Carrier;
use Reflar\twofactor\TwoFactor;

class VerifyCodeController extends AbstractCollectionController
{
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
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $data = $request->getParsedBody();
        $actor = $request->getAttribute('actor');

        $carrier = Carrier::orderBy('identifier', 'asc')->skip($data['carrier'])->take(1)->first();

        $actor->carrier = $carrier->email;

        $this->twoFactor->preparePhone2FA($actor, $data['phone']);
    }
}
