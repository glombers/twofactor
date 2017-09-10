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

namespace Reflar\twofactor;

use Flarum\Database\AbstractModel;

class Carrier extends AbstractModel
{
    /**
     * {@inheritdoc}
     */
    protected $table = 'carriers';
}
