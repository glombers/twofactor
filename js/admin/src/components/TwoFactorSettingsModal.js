import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class TwoFactorSettingsModal extends SettingsModal {
    className() {
        return 'TwoFactorSettingsModal Modal--small';
    }

    title() {
        return app.translator.trans('reflar-twofactor.admin.settings.title');
    }

    config() {
        $.getScript('https://cdn.rawgit.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js', function () {
            $('#phone').mask('+0 (000) 000-0000')
        })
    }

    form() {
        return [
            <div className="Form-group">
                {Switch.component({
                    state: JSON.parse(this.setting('reflar.twofactor.twillio_enabled', 0)()),
                    onchange: this.setting('reflar.twofactor.twillio_enabled', 1),
                    children: app.translator.trans('reflar-twofactor.admin.settings.enable'),
                })}
            </div>,

            <div className="helpText">
                {app.translator.trans('reflar-twofactor.admin.settings.help')}
            </div>,

            <div className="Form-group">
                <label>{app.translator.trans('reflar-twofactor.admin.settings.sid')}</label>
                <input className="FormControl" bidi={this.setting('reflar.twofactor.twillio_sid')}/>
            </div>,

            <div className="Form-group">
                <label>{app.translator.trans('reflar-twofactor.admin.settings.token')}</label>
                <input className="FormControl" bidi={this.setting('reflar.twofactor.twillio_token')}/>
            </div>,

            <div className="Form-group">
                <label>{app.translator.trans('reflar-twofactor.admin.settings.number')}</label>
                <input id="phone" className="FormControl" placeholder="+1 (123) 456-7890" bidi={this.setting('reflar.twofactor.twillio_number')}/>
            </div>
        ];
    }
}