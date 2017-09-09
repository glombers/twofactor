<?php

use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema, ConnectionInterface $db) {
        $schema->create('carriers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('identifier');
            $table->string('email');
        });

        /*
        *  Identifier is the carrier name
        *  email is the email that the texts go through
        **/

        $db->table('carriers')->insert([
            ['identifier' => '3 River Wireless', 'email' => 'sms.3rivers.net'],
            ['identifier' => 'ACS Wireless', 'email' => 'paging.acswireless.com'],
            ['identifier' => 'Alltel', 'email' => 'message.alltel.com'],
            ['identifier' => 'AT&T', 'email' => 'txt.att.net'],
            ['identifier' => 'Bell Canada', 'email' => 'txt.bellmobility.ca'],
            ['identifier' => 'Bell Canada', 'email' => 'bellmobility.ca'],
            ['identifier' => 'Bell Mobility (Canada)', 'email' => 'txt.bell.ca'],
            ['identifier' => 'Bell Mobility', 'email' => 'txt.bellmobility.ca'],
            ['identifier' => 'Blue Sky Frog', 'email' => 'blueskyfrog.com'],
            ['identifier' => 'Bluegrass Cellular', 'email' => 'sms.bluecell.com'],
            ['identifier' => 'Boost Mobile', 'email' => 'myboostmobile.com'],
            ['identifier' => 'BPL Mobile', 'email' => 'bplmobile.com'],
            ['identifier' => 'Carolina West Wireless', 'email' => 'cwwsms.com'],
            ['identifier' => 'Cellular One', 'email' => 'mobile.celloneusa.com'],
            ['identifier' => 'Cellular South', 'email' => 'csouth1.com'],
            ['identifier' => 'Centennial Wireless', 'email' => 'cwemail.com'],
            ['identifier' => 'CenturyTel', 'email' => 'messaging.centurytel.net'],
            ['identifier' => 'Cingular (Now AT&T)', 'email' => 'txt.att.net'],
            ['identifier' => 'Clearnet', 'email' => 'msg.clearnet.com'],
            ['identifier' => 'Comcast', 'email' => 'comcastpcs.textmsg.com'],
            ['identifier' => 'Corr Wireless Communications', 'email' => 'corrwireless.net'],
            ['identifier' => 'Dobson', 'email' => 'mobile.dobson.net'],
            ['identifier' => 'Edge Wireless', 'email' => 'sms.edgewireless.com'],
            ['identifier' => 'Fido', 'email' => 'fido.ca'],
            ['identifier' => 'Golden Telecom', 'email' => 'sms.goldentele.com'],
            ['identifier' => 'Helio', 'email' => 'messaging.sprintpcs.com'],
            ['identifier' => 'Houston Cellular', 'email' => 'text.houstoncellular.net'],
            ['identifier' => 'Idea Cellular', 'email' => 'ideacellular.net'],
            ['identifier' => 'Illinois Valley Cellular', 'email' => 'ivctext.com'],
            ['identifier' => 'Inland Cellular Telephone', 'email' => 'inlandlink.com'],
            ['identifier' => 'MCI', 'email' => 'pagemci.com'],
            ['identifier' => 'Metrocall', 'email' => 'page.metrocall.com'],
            ['identifier' => 'Metrocall 2-way', 'email' => 'my2way.com'],
            ['identifier' => 'Metro PCS', 'email' => 'mymetropcs.com'],
            ['identifier' => 'Microcell', 'email' => 'fido.ca'],
            ['identifier' => 'Midwest Wireless', 'email' => 'clearlydigital.com'],
            ['identifier' => 'Mobilcomm', 'email' => 'mobilecomm.net'],
            ['identifier' => 'MTS', 'email' => 'text.mtsmobility.com'],
            ['identifier' => 'Nextel', 'email' => 'messaging.nextel.com'],
            ['identifier' => 'OnlineBeep', 'email' => 'onlinebeep.net'],
            ['identifier' => 'PCS One', 'email' => 'pcsone.net'],
            ['identifier' => "President's Choice", 'email' => 'txt.bell.ca'],
            ['identifier' => 'Public Service Cellular', 'email' => 'sms.pscel.com'],
            ['identifier' => 'Qwest', 'email' => 'qwestmp.com'],
            ['identifier' => 'Rogers AT&T Wireless', 'email' => 'pcs.rogers.com'],
            ['identifier' => 'Rogers Canada', 'email' => 'pcs.rogers.com'],
            ['identifier' => 'Satellink', 'email' => 'satellink.net'],
            ['identifier' => 'Southwestern Bell', 'email' => 'email.swbw.com'],
            ['identifier' => 'Sprint', 'email' => 'messaging.sprintpcs.com'],
            ['identifier' => 'Sumcom', 'email' => 'tms.suncom.com'],
            ['identifier' => 'Surewest Communicaitons', 'email' => 'mobile.surewest.com'],
            ['identifier' => 'T-Mobile', 'email' => 'tmomail.net'],
            ['identifier' => 'Telus', 'email' => 'msg.telus.com'],
            ['identifier' => 'Tracfone', 'email' => 'txt.att.net'],
            ['identifier' => 'Triton', 'email' => 'tms.suncom.com'],
            ['identifier' => 'Unicel', 'email' => 'utext.com'],
            ['identifier' => 'US Cellular', 'email' => 'email.uscc.net'],
            ['identifier' => 'Solo Mobile', 'email' => 'txt.bell.ca'],
            ['identifier' => 'Sprint', 'email' => 'messaging.sprintpcs.com'],
            ['identifier' => 'Sumcom', 'email' => 'tms.suncom.com'],
            ['identifier' => 'Surewest Communicaitons', 'email' => 'mobile.surewest.com'],
            ['identifier' => 'T-Mobile', 'email' => 'tmomail.net'],
            ['identifier' => 'Telus', 'email' => 'msg.telus.com'],
            ['identifier' => 'Triton', 'email' => 'tms.suncom.com'],
            ['identifier' => 'Unicel', 'email' => 'utext.com'],
            ['identifier' => 'US Cellular', 'email' => 'email.uscc.net'],
            ['identifier' => 'US West', 'email' => 'uswestdatamail.com'],
            ['identifier' => 'Verizon', 'email' => 'vtext.com'],
            ['identifier' => 'Virgin Mobile', 'email' => 'vmobl.com'],
            ['identifier' => 'Virgin Mobile Canada', 'email' => 'vmobile.ca'],
            ['identifier' => 'West Central Wireless', 'email' => 'sms.wcc.net'],
            ['identifier' => 'Western Wireless', 'email' => 'cellularonewest.com'],
            ['identifier' => 'Chennai RPG Cellular', 'email' => 'rpgmail.net'],
            ['identifier' => 'Chennai Skycell / Airtel', 'email' => 'airtelchennai.com'],
            ['identifier' => 'Comviq', 'email' => 'sms.comviq.se'],
            ['identifier' => 'Delhi Aritel', 'email' => 'airtelmail.com'],
            ['identifier' => 'Delhi Hutch', 'email' => 'delhi.hutch.co.in'],
            ['identifier' => 'DT T-Mobile', 'email' => 't-mobile-sms.de'],
            ['identifier' => 'Dutchtone / Orange-NL', 'email' => 'sms.orange.nl'],
            ['identifier' => 'EMT', 'email' => 'sms.emt.ee'],
            ['identifier' => 'Escotel', 'email' => 'escotelmobile.com'],
            ['identifier' => 'German T-Mobile', 'email' => 't-mobile-sms.de'],
            ['identifier' => 'Goa BPLMobil', 'email' => 'bplmobile.com'],
            ['identifier' => 'Golden Telecom', 'email' => 'sms.goldentele.com'],
            ['identifier' => 'Gujarat Celforce', 'email' => 'celforce.com'],
            ['identifier' => 'JSM Tele-Page', 'email' => 'jsmtel.com'],
            ['identifier' => 'Kerala Escotel', 'email' => 'escotelmobile.com'],
            ['identifier' => 'Kolkata Airtel', 'email' => 'airtelkol.com'],
            ['identifier' => 'Kyivstar', 'email' => 'smsmail.lmt.lv'],
            ['identifier' => 'Lauttamus Communication', 'email' => 'e-page.net'],
            ['identifier' => 'LMT', 'email' => 'smsmail.lmt.lv'],
            ['identifier' => 'Maharashtra BPL Mobile', 'email' => 'bplmobile.com'],
            ['identifier' => 'Maharashtra Idea Cellular', 'email' => 'ideacellular.net'],
            ['identifier' => 'Manitoba Telecom Systems', 'email' => 'text.mtsmobility.com'],
            ['identifier' => 'Meteor', 'email' => 'mymeteor.ie'],
            ['identifier' => 'MiWorld', 'email' => 'm1.com.sg'],
            ['identifier' => 'Mobileone', 'email' => 'm1.com.sg'],
            ['identifier' => 'Mobilfone', 'email' => 'page.mobilfone.com'],
            ['identifier' => 'Mobility Bermuda', 'email' => 'ml.bm'],
            ['identifier' => 'Mobistar Belgium', 'email' => 'mobistar.be'],
            ['identifier' => 'Mobitel Tanzania', 'email' => 'sms.co.tz'],
            ['identifier' => 'Mobtel Srbija', 'email' => 'mobtel.co.yu'],
            ['identifier' => 'Movistar', 'email' => 'correo.movistar.net'],
            ['identifier' => 'Mumbai BPL Mobile', 'email' => 'bplmobile.com'],
            ['identifier' => 'Netcom', 'email' => 'sms.netcom.no'],
            ['identifier' => 'Ntelos', 'email' => 'pcs.ntelos.com'],
            ['identifier' => 'O2', 'email' => 'o2.co.uk'],
            ['identifier' => 'O2', 'email' => 'o2imail.co.uk'],
            ['identifier' => 'O2 (M-mail)', 'email' => 'mmail.co.uk'],
            ['identifier' => 'One Connect Austria', 'email' => 'onemail.at'],
            ['identifier' => 'OnlineBeep', 'email' => 'onlinebeep.net'],
            ['identifier' => 'Optus Mobile', 'email' => 'optusmobile.com.au'],
            ['identifier' => 'Orange', 'email' => 'orange.net'],
            ['identifier' => 'Orange Mumbai', 'email' => 'orangemail.co.in'],
            ['identifier' => 'Orange NL / Dutchtone', 'email' => 'sms.orange.nl'],
            ['identifier' => 'Oskar', 'email' => 'mujoskar.cz'],
            ['identifier' => 'P&T Luxembourg', 'email' => 'sms.luxgsm.lu'],
            ['identifier' => 'Pondicherry BPL Mobile', 'email' => 'bplmobile.com'],
            ['identifier' => 'Primtel', 'email' => 'sms.primtel.ru'],
            ['identifier' => 'Safaricom', 'email' => 'safaricomsms.com'],
            ['identifier' => 'Satelindo GSM', 'email' => 'satelindogsm.com'],
            ['identifier' => 'SCS-900', 'email' => 'scs-900.ru'],
            ['identifier' => 'SFR France', 'email' => 'sfr.fr'],
            ['identifier' => 'Simple Freedom', 'email' => 'text.simplefreedom.net'],
            ['identifier' => 'Smart Telecom', 'email' => 'mysmart.mymobile.ph'],
            ['identifier' => 'Southern LINC', 'email' => 'page.southernlinc.com'],
            ['identifier' => 'Sunrise Mobile', 'email' => 'mysunrise.ch'],
            ['identifier' => 'Sunrise Mobile', 'email' => 'swmsg.com'],
            ['identifier' => 'Surewest Communications', 'email' => 'freesurf.ch'],
            ['identifier' => 'Swisscom', 'email' => 'bluewin.ch'],
            ['identifier' => 'T-Mobile Austria', 'email' => 'sms.t-mobile.at'],
            ['identifier' => 'T-Mobile Germany', 'email' => 't-d1-sms.de'],
            ['identifier' => 'T-Mobile UK', 'email' => 't-mobile.uk.net'],
            ['identifier' => 'Tamil Nadu BPL Mobile', 'email' => 'bplmobile.com'],
            ['identifier' => 'Tele2 Latvia', 'email' => 'sms.tele2.lv'],
            ['identifier' => 'Telefonica Movistar', 'email' => 'movistar.net'],
            ['identifier' => 'Telenor', 'email' => 'mobilpost.no'],
            ['identifier' => 'Teletouch', 'email' => 'pageme.teletouch.com'],
            ['identifier' => 'Telia Denmark', 'email' => 'gsm1800.telia.dk'],
            ['identifier' => 'TIM', 'email' => 'timnet.com'],
            ['identifier' => 'TSR Wireless', 'email' => 'alphame.com'],
            ['identifier' => 'UMC', 'email' => 'sms.umc.com.ua'],
            ['identifier' => 'Uraltel', 'email' => 'sms.uraltel.ru'],
            ['identifier' => 'Uttar Pradesh Escotel', 'email' => 'escotelmobile.com'],
            ['identifier' => 'Vessotel', 'email' => 'pager.irkutsk.ru'],
            ['identifier' => 'Vodafone Italy', 'email' => 'sms.vodafone.it'],
            ['identifier' => 'Vodafone Japan', 'email' => 'c.vodafone.ne.jp'],
            ['identifier' => 'Vodafone Japan', 'email' => 'h.vodafone.ne.jp'],
            ['identifier' => 'Vodafone Japan', 'email' => 't.vodafone.ne.jp'],
            ['identifier' => 'Vodafone UK', 'email' => 'vodafone.net'],
            ['identifier' => 'Wyndtell', 'email' => 'wyndtell.com'],
        ]);
    },
];
