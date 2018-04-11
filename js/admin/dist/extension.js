'use strict';

System.register('Reflar/twofactor/components/TwoFactorSettingsModal', ['flarum/components/SettingsModal', 'flarum/components/Switch'], function (_export, _context) {
    "use strict";

    var SettingsModal, Switch, TwoFactorSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }],
        execute: function () {
            TwoFactorSettingsModal = function (_SettingsModal) {
                babelHelpers.inherits(TwoFactorSettingsModal, _SettingsModal);

                function TwoFactorSettingsModal() {
                    babelHelpers.classCallCheck(this, TwoFactorSettingsModal);
                    return babelHelpers.possibleConstructorReturn(this, (TwoFactorSettingsModal.__proto__ || Object.getPrototypeOf(TwoFactorSettingsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(TwoFactorSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'TwoFactorSettingsModal Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('reflar-twofactor.admin.settings.title');
                    }
                }, {
                    key: 'config',
                    value: function config() {
                        $.getScript('https://cdn.rawgit.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js', function () {
                            $('#phone').mask('+0 (000) 000-0000');
                        });
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m(
                            'div',
                            { className: 'Form-group' },
                            Switch.component({
                                state: JSON.parse(this.setting('reflar.twofactor.twillio_enabled', 0)()),
                                onchange: this.setting('reflar.twofactor.twillio_enabled', 1),
                                children: app.translator.trans('reflar-twofactor.admin.settings.enable')
                            })
                        ), m(
                            'div',
                            { className: 'helpText' },
                            app.translator.trans('reflar-twofactor.admin.settings.help')
                        ), m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                app.translator.trans('reflar-twofactor.admin.settings.sid')
                            ),
                            m('input', { className: 'FormControl', bidi: this.setting('reflar.twofactor.twillio_sid') })
                        ), m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                app.translator.trans('reflar-twofactor.admin.settings.token')
                            ),
                            m('input', { className: 'FormControl', bidi: this.setting('reflar.twofactor.twillio_token') })
                        ), m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                app.translator.trans('reflar-twofactor.admin.settings.number')
                            ),
                            m('input', { id: 'phone', className: 'FormControl', placeholder: '+1 (123) 456-7890', bidi: this.setting('reflar.twofactor.twillio_number') })
                        )];
                    }
                }]);
                return TwoFactorSettingsModal;
            }(SettingsModal);

            _export('default', TwoFactorSettingsModal);
        }
    };
});;
'use strict';

System.register('Reflar/twofactor/main', ['flarum/extend', 'flarum/app', './components/TwoFactorSettingsModal'], function (_export, _context) {
    "use strict";

    var extend, app, TwoFactorSettingsModal;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_componentsTwoFactorSettingsModal) {
            TwoFactorSettingsModal = _componentsTwoFactorSettingsModal.default;
        }],
        execute: function () {

            app.initializers.add('Reflar-Twofactor', function (app) {
                app.extensionSettings['reflar-twofactor'] = function () {
                    return app.modal.show(new TwoFactorSettingsModal());
                };
            });
        }
    };
});