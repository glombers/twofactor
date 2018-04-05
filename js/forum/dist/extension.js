'use strict';

System.register('Reflar/twofactor/components/LogInFactorModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/components/Modal', 'flarum/components/Button'], function (_export, _context) {
  "use strict";

  var app, Alert, extend, Modal, Button, LogInFactorModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      LogInFactorModal = function (_Modal) {
        babelHelpers.inherits(LogInFactorModal, _Modal);

        function LogInFactorModal() {
          babelHelpers.classCallCheck(this, LogInFactorModal);
          return babelHelpers.possibleConstructorReturn(this, (LogInFactorModal.__proto__ || Object.getPrototypeOf(LogInFactorModal)).apply(this, arguments));
        }

        babelHelpers.createClass(LogInFactorModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(LogInFactorModal.prototype.__proto__ || Object.getPrototypeOf(LogInFactorModal.prototype), 'init', this).call(this);
            this.identification = this.props.data.identification;

            this.password = this.props.data.password;

            this.remember = this.props.data.remember;

            this.twoFactorCode = m.prop('');
          }
        }, {
          key: 'className',
          value: function className() {
            return 'TwoFactorModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('reflar-twofactor.forum.modal.login_title');
          }
        }, {
          key: 'content',
          value: function content(user) {
            return m(
              'div',
              { className: 'Modal-body' },
              app.translator.trans('reflar-twofactor.forum.modal.2fa_help'),
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'div',
                    { className: 'TwoFactor-input' },
                    m('input', { type: 'text',
                      oninput: m.withAttr('value', this.twoFactorCode),
                      className: 'FormControl',
                      placeholder: app.translator.trans('reflar-twofactor.forum.modal.placeholder') })
                  ),
                  m(
                    Button,
                    { className: 'Button Button--primary TwoFactor-button', loading: this.loading, type: 'submit' },
                    app.translator.trans('reflar-twofactor.forum.modal.button')
                  )
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this2 = this;

            e.preventDefault();

            if (this.loading) return;

            this.loading = true;

            app.request({
              url: app.forum.attribute('apiUrl') + '/twofactor/login',
              method: 'POST',
              data: {
                'identification': this.identification,
                'password': this.password,
                'remember': this.remember,
                'twofactor': this.twoFactorCode()
              }
            }).then(function (response) {
              if (response === null) {
                _this2.alert = new Alert({
                  type: 'error',
                  children: app.translator.trans('reflar-twofactor.forum.incorrect_2fa')
                });
                _this2.loading = false;
                m.redraw();
              } else {
                window.location.reload();
              }
            });
          }
        }]);
        return LogInFactorModal;
      }(Modal);

      _export('default', LogInFactorModal);
    }
  };
});;
'use strict';

System.register('Reflar/twofactor/components/PhoneModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/utils/ItemList', 'flarum/helpers/listItems', 'flarum/components/Modal', 'flarum/components/Dropdown', 'flarum/components/Button', './TwoFactorModal', './RecoveryModal'], function (_export, _context) {
    "use strict";

    var app, Alert, extend, ItemList, listItems, Modal, Dropdown, Button, TwoFactorModal, RecoveryModal, PhoneModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems.default;
        }, function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsDropdown) {
            Dropdown = _flarumComponentsDropdown.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_TwoFactorModal) {
            TwoFactorModal = _TwoFactorModal.default;
        }, function (_RecoveryModal) {
            RecoveryModal = _RecoveryModal.default;
        }],
        execute: function () {
            PhoneModal = function (_Modal) {
                babelHelpers.inherits(PhoneModal, _Modal);

                function PhoneModal() {
                    babelHelpers.classCallCheck(this, PhoneModal);
                    return babelHelpers.possibleConstructorReturn(this, (PhoneModal.__proto__ || Object.getPrototypeOf(PhoneModal)).apply(this, arguments));
                }

                babelHelpers.createClass(PhoneModal, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(PhoneModal.prototype.__proto__ || Object.getPrototypeOf(PhoneModal.prototype), 'init', this).call(this);

                        this.twoFactorCode = m.prop('');

                        this.phone = m.prop('');

                        this.enabled = m.prop(app.session.user.twofa_enabled());

                        $.getScript('https://cdn.rawgit.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js', function () {
                            $('#phone').mask('(000) 000-0000');
                            $('#code').mask('AAA-AAA', { placeholder: '___-___' });
                        });

                        this.country = {
                            name: 'United States of America',
                            mcode: '+1'
                        };

                        this.countries = [{ name: "United States of America", mcode: "+1" }, { name: "United Kingdom", mcode: "+44" }, { name: "Algeria", mcode: "+213" }, { name: "Andorra", mcode: "+376" }, { name: "Angola", mcode: "+244" }, { name: "Anguilla", mcode: "+1264" }, { name: "Antigua & Barbuda", mcode: "+1268" }, { name: "Argentina", mcode: "+54" }, { name: "Armenia", mcode: "+374" }, { name: "Aruba", mcode: "+297" }, { name: "Australia", mcode: "+61" }, { name: "Austria", mcode: "+43" }, { name: "Azerbaijan", mcode: "+994" }, { name: "Bahamas", mcode: "+1242" }, { name: "Bahrain", mcode: "+973" }, { name: "Bangladesh", mcode: "+880" }, { name: "Barbados", mcode: "+1246" }, { name: "Belarus", mcode: "+375" }, { name: "Belgium", mcode: "+32" }, { name: "Belize", mcode: "+501" }, { name: "Benin", mcode: "+229" }, { name: "Bermuda", mcode: "+1441" }, { name: "Bhutan", mcode: "+975" }, { name: "Bolivia", mcode: "+591" }, { name: "Bosnia Herzegovina", mcode: "+387" }, { name: "Botswana", mcode: "+267" }, { name: "Brazil", mcode: "+55" }, { name: "Brunei", mcode: "+673" }, { name: "Bulgaria", mcode: "+359" }, { name: "Burkina Faso", mcode: "+226" }, { name: "Burundi", mcode: "+257" }, { name: "Cambodia", mcode: "+855" }, { name: "Cameroon", mcode: "+237" }, { name: "Canada", mcode: "+1" }, { name: "Cape Verde Islands", mcode: "+238" }, { name: "Cayman Islands", mcode: "+1345" }, { name: "Central African Republic", mcode: "+236" }, { name: "Chile", mcode: "+56" }, { name: "China", mcode: "+86" }, { name: "Colombia", mcode: "+57" }, { name: "Comoros", mcode: "+269" }, { name: "Congo", mcode: "+242" }, { name: "Cook Islands", mcode: "+682" }, { name: "Costa Rica", mcode: "+506" }, { name: "Croatia", mcode: "+385" }, { name: "Cuba", mcode: "+53" }, { name: "Cyprus - North", mcode: "+90" }, { name: "Cyprus - South", mcode: "+357" }, { name: "Czech Republic", mcode: "+420" }, { name: "Denmark", mcode: "+45" }, { name: "Djibouti", mcode: "+253" }, { name: "Dominica", mcode: "+1809" }, { name: "Dominican Republic", mcode: "+1809" }, { name: "Ecuador", mcode: "+593" }, { name: "Egypt", mcode: "+20" }, { name: "El Salvador", mcode: "+503" }, { name: "Equatorial Guinea", mcode: "+240" }, { name: "Eritrea", mcode: "+291" }, { name: "Estonia", mcode: "+372" }, { name: "Ethiopia", mcode: "+251" }, { name: "Falkland Islands", mcode: "+500" }, { name: "Faroe Islands", mcode: "+298" }, { name: "Fiji", mcode: "+679" }, { name: "Finland", mcode: "+358" }, { name: "France", mcode: "+33" }, { name: "French Guiana", mcode: "+594" }, { name: "French Polynesia", mcode: "+689" }, { name: "Gabon", mcode: "+241" }, { name: "Gambia", mcode: "+220" }, { name: "Georgia", mcode: "+7880" }, { name: "Germany", mcode: "+49" }, { name: "Ghana", mcode: "+233" }, { name: "Gibraltar", mcode: "+350" }, { name: "Greece", mcode: "+30" }, { name: "Greenland", mcode: "+299" }, { name: "Grenada", mcode: "+1473" }, { name: "Guadeloupe", mcode: "+590" }, { name: "Guam", mcode: "+671" }, { name: "Guatemala", mcode: "+502" }, { name: "Guinea", mcode: "+224" }, { name: "Guinea - Bissau", mcode: "+245" }, { name: "Guyana", mcode: "+592" }, { name: "Haiti", mcode: "+509" }, { name: "Honduras", mcode: "+504" }, { name: "Hong Kong", mcode: "+852" }, { name: "Hungary", mcode: "+36" }, { name: "Iceland", mcode: "+354" }, { name: "India", mcode: "+91" }, { name: "Indonesia", mcode: "+62" }, { name: "Iraq", mcode: "+964" }, { name: "Iran", mcode: "+98" }, { name: "Ireland", mcode: "+353" }, { name: "Israel", mcode: "+972" }, { name: "Italy", mcode: "+39" }, { name: "Jamaica", mcode: "+1876" }, { name: "Japan", mcode: "+81" }, { name: "Jordan", mcode: "+962" }, { name: "Kazakhstan", mcode: "+7" }, { name: "Kenya", mcode: "+254" }, { name: "Kiribati", mcode: "+686" }, { name: "Korea - North", mcode: "+850" }, { name: "Korea - South", mcode: "+82" }, { name: "Kuwait", mcode: "+965" }, { name: "Kyrgyzstan", mcode: "+996" }, { name: "Laos", mcode: "+856" }, { name: "Latvia", mcode: "+371" }, { name: "Lebanon", mcode: "+961" }, { name: "Lesotho", mcode: "+266" }, { name: "Liberia", mcode: "+231" }, { name: "Libya", mcode: "+218" }, { name: "Liechtenstein", mcode: "+417" }, { name: "Lithuania", mcode: "+370" }, { name: "Luxembourg", mcode: "+352" }, { name: "Macao", mcode: "+853" }, { name: "Macedonia", mcode: "+389" }, { name: "Madagascar", mcode: "+261" }, { name: "Malawi", mcode: "+265" }, { name: "Malaysia", mcode: "+60" }, { name: "Maldives", mcode: "+960" }, { name: "Mali", mcode: "+223" }, { name: "Malta", mcode: "+356" }, { name: "Marshall Islands", mcode: "+692" }, { name: "Martinique", mcode: "+596" }, { name: "Mauritania", mcode: "+222" }, { name: "Mayotte", mcode: "+269" }, { name: "Mexico", mcode: "+52" }, { name: "Micronesia", mcode: "+691" }, { name: "Moldova", mcode: "+373" }, { name: "Monaco", mcode: "+377" }, { name: "Mongolia", mcode: "+976" }, { name: "Montserrat", mcode: "+1664" }, { name: "Morocco", mcode: "+212" }, { name: "Mozambique", mcode: "+258" }, { name: "Myanmar", mcode: "+95" }, { name: "Namibia", mcode: "+264" }, { name: "Nauru", mcode: "+674" }, { name: "Nepal", mcode: "+977" }, { name: "Netherlands", mcode: "+31" }, { name: "New Caledonia", mcode: "+687" }, { name: "New Zealand", mcode: "+64" }, { name: "Nicaragua", mcode: "+505" }, { name: "Niger", mcode: "+227" }, { name: "Nigeria", mcode: "+234" }, { name: "Niue", mcode: "+683" }, { name: "Norfolk Islands", mcode: "+672" }, { name: "Northern Marianas", mcode: "+670" }, { name: "Norway", mcode: "+47" }, { name: "Oman", mcode: "+968" }, { name: "Pakistan", mcode: "+92" }, { name: "Palau", mcode: "+680" }, { name: "Panama", mcode: "+507" }, { name: "Papua New Guinea", mcode: "+675" }, { name: "Paraguay", mcode: "+595" }, { name: "Peru", mcode: "+51" }, { name: "Philippines", mcode: "+63" }, { name: "Poland", mcode: "+48" }, { name: "Portugal", mcode: "+351" }, { name: "Puerto Rico", mcode: "+1787" }, { name: "Qatar", mcode: "+974" }, { name: "Reunion", mcode: "+262" }, { name: "Romania", mcode: "+40" }, { name: "Russia", mcode: "+7" }, { name: "Rwanda", mcode: "+250" }, { name: "San Marino", mcode: "+378" }, { name: "Sao Tome & Principe", mcode: "+239" }, { name: "Saudi Arabia", mcode: "+966" }, { name: "Senegal", mcode: "+221" }, { name: "Serbia", mcode: "+381" }, { name: "Seychelles", mcode: "+248" }, { name: "Sierra Leone", mcode: "+232" }, { name: "Singapore", mcode: "+65" }, { name: "Slovak Republic", mcode: "+421" }, { name: "Slovenia", mcode: "+386" }, { name: "Solomon Islands", mcode: "+677" }, { name: "Somalia", mcode: "+252" }, { name: "South Africa", mcode: "+27" }, { name: "Spain", mcode: "+34" }, { name: "Sri Lanka", mcode: "+94" }, { name: "St. Helena", mcode: "+290" }, { name: "St. Kitts", mcode: "+1869" }, { name: "St. Lucia", mcode: "+1758" }, { name: "Suriname", mcode: "+597" }, { name: "Sudan", mcode: "+249" }, { name: "Swaziland", mcode: "+268" }, { name: "Sweden", mcode: "+46" }, { name: "Switzerland", mcode: "+41" }, { name: "Syria", mcode: "+963" }, { name: "Taiwan", mcode: "+886" }, { name: "Tajikistan", mcode: "+992" }, { name: "Thailand", mcode: "+66" }, { name: "Togo", mcode: "+228" }, { name: "Tonga", mcode: "+676" }, { name: "Trinidad & Tobago", mcode: "+1868" }, { name: "Tunisia", mcode: "+216" }, { name: "Turkey", mcode: "+90" }, { name: "Turkmenistan", mcode: "+993" }, { name: "Turks & Caicos Islands", mcode: "+1649" }, { name: "Tuvalu", mcode: "+688" }, { name: "Uganda", mcode: "+256" }, { name: "Ukraine", mcode: "+380" }, { name: "United Arab Emirates", mcode: "+971" }, { name: "Uruguay", mcode: "+598" }, { name: "Uzbekistan", mcode: "+998" }, { name: "Vanuatu", mcode: "+678" }, { name: "Vatican City", mcode: "+379" }, { name: "Venezuela", mcode: "+58" }, { name: "Vietnam", mcode: "+84" }, { name: "Virgin Islands - British", mcode: "+1" }, { name: "Virgin Islands - US", mcode: "+1" }, { name: "Wallis & Futuna", mcode: "+681" }, { name: "Yemen", mcode: "North)(+969" }, { name: "Yemen", mcode: "South)(+967" }, { name: "Zambia", mcode: "+260" }, { name: "Zimbabwe", mcode: "+263" }];
                    }
                }, {
                    key: 'className',
                    value: function className() {
                        return 'TwoFactorModal Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title');
                    }
                }, {
                    key: 'countryItems',
                    value: function countryItems() {
                        var _this2 = this;

                        var items = new ItemList();

                        items.add('sort', Dropdown.component({
                            buttonClassName: 'Button FormControl',
                            menuClassName: 'Country-Dropdown-actual',
                            label: this.country.name,
                            children: this.countries.map(function (country) {
                                var active = _this2.country === country;

                                return Button.component({
                                    children: country.name,
                                    icon: active ? 'check' : true,
                                    onclick: function onclick() {
                                        _this2.country = country;
                                    },
                                    active: active
                                });
                            })
                        }));

                        return items;
                    }
                }, {
                    key: 'content',
                    value: function content(user) {
                        var _this3 = this;

                        return m(
                            'div',
                            { className: 'Modal-body' },
                            m(
                                'div',
                                { className: 'Form' },
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'h2',
                                        null,
                                        app.translator.trans('reflar-twofactor.forum.modal.2fa_heading')
                                    ),
                                    this.enabled() !== 3 ? Button.component({
                                        className: 'Button Button--primary Switch-button',
                                        onclick: function onclick() {
                                            app.modal.close();
                                            app.modal.show(new TwoFactorModal(_this3.user));
                                        },
                                        children: app.translator.trans('reflar-twofactor.forum.modal.stTOTP')
                                    }) : '',
                                    m(
                                        'div',
                                        { style: 'text-align: center', className: 'helpText Submit-Button' },
                                        app.translator.trans('reflar-twofactor.forum.modal.helpPhone')
                                    )
                                ),
                                this.enabled() !== 3 ? m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'ul',
                                        { className: 'Country-dropdown' },
                                        listItems(this.countryItems().toArray())
                                    ),
                                    m('input', {
                                        type: 'text',
                                        id: 'phone',
                                        oninput: m.withAttr('value', this.phone),
                                        className: 'FormControl Phone-Input'
                                    }),
                                    Button.component({
                                        className: 'Button Button--primary',
                                        onclick: function onclick() {
                                            app.request({
                                                url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                                                method: 'POST',
                                                data: {
                                                    'step': 3,
                                                    'phone': _this3.country.mcode + _this3.phone().replace(/[- )(]/g, '')
                                                }
                                            });
                                            _this3.enabled(3);
                                            m.redraw();
                                        },
                                        children: app.translator.trans('reflar-twofactor.forum.modal.submitPhone')
                                    })
                                ) : m(
                                    'div',
                                    null,
                                    m('input', {
                                        type: 'text',
                                        id: 'code',
                                        style: 'text-transform: uppercase;',
                                        oninput: m.withAttr('value', this.twoFactorCode),
                                        className: 'FormControl'
                                    }),
                                    m(
                                        Button,
                                        { className: 'Button Button--primary TwoFactor-button', loading: this.loading,
                                            type: 'submit' },
                                        app.translator.trans('reflar-twofactor.forum.modal.button')
                                    )
                                )
                            )
                        );
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this4 = this;

                        e.preventDefault();

                        if (this.loading) return;

                        this.loading = true;

                        this.alert = null;

                        app.request({
                            url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                            method: 'POST',
                            data: {
                                'step': 4,
                                'code': this.twoFactorCode()
                            },
                            errorHandler: this.onerror.bind(this)
                        }).then(function (response) {
                            var data = response.data.id;
                            if (data === 'IncorrectCode') {
                                _this4.alert = new Alert({
                                    type: 'error',
                                    children: app.translator.trans('reflar-twofactor.forum.incorrect_2fa')
                                });
                                m.redraw();
                            } else {
                                app.alerts.show(_this4.successAlert = new Alert({
                                    type: 'success',
                                    children: app.translator.trans('reflar-twofactor.forum.2fa_enabled')
                                }));
                                app.modal.show(new RecoveryModal({ data: data }));
                            }
                        });

                        this.loading = false;
                    }
                }]);
                return PhoneModal;
            }(Modal);

            _export('default', PhoneModal);
        }
    };
});;
'use strict';

System.register('Reflar/twofactor/components/RecoveryModal', ['flarum/app', 'flarum/extend', 'flarum/components/Modal', 'flarum/components/Button'], function (_export, _context) {
  "use strict";

  var app, extend, Modal, Button, RecoveryModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      RecoveryModal = function (_Modal) {
        babelHelpers.inherits(RecoveryModal, _Modal);

        function RecoveryModal() {
          babelHelpers.classCallCheck(this, RecoveryModal);
          return babelHelpers.possibleConstructorReturn(this, (RecoveryModal.__proto__ || Object.getPrototypeOf(RecoveryModal)).apply(this, arguments));
        }

        babelHelpers.createClass(RecoveryModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(RecoveryModal.prototype.__proto__ || Object.getPrototypeOf(RecoveryModal.prototype), 'init', this).call(this);

            this.recoveries = this.props.data.split(',');
          }
        }, {
          key: 'className',
          value: function className() {
            return 'TwoFactorModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title');
          }
        }, {
          key: 'content',
          value: function content(user) {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'div',
                    { className: 'TwoFactor-codes' },
                    m(
                      'h3',
                      null,
                      app.translator.trans('reflar-twofactor.forum.modal.recov_help1')
                    ),
                    m(
                      'h4',
                      null,
                      app.translator.trans('reflar-twofactor.forum.modal.recov_help2')
                    ),
                    this.recoveries.map(function (recovery) {
                      return m('br', null), m(
                        'h3',
                        null,
                        recovery
                      );
                    })
                  ),
                  m(
                    Button,
                    { className: 'Button Button--primary TwoFactor-button', loading: this.loading, type: 'submit' },
                    app.translator.trans('reflar-twofactor.forum.modal.close')
                  )
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            app.modal.close();
          }
        }]);
        return RecoveryModal;
      }(Modal);

      _export('default', RecoveryModal);
    }
  };
});;
'use strict';

System.register('Reflar/twofactor/components/TwoFactorModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/components/Modal', 'flarum/components/Switch', 'flarum/components/Button', './PhoneModal', './RecoveryModal'], function (_export, _context) {
    "use strict";

    var app, Alert, extend, Modal, Switch, Button, PhoneModal, RecoveryModal, TwoFactorModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_PhoneModal) {
            PhoneModal = _PhoneModal.default;
        }, function (_RecoveryModal) {
            RecoveryModal = _RecoveryModal.default;
        }],
        execute: function () {
            TwoFactorModal = function (_Modal) {
                babelHelpers.inherits(TwoFactorModal, _Modal);

                function TwoFactorModal() {
                    babelHelpers.classCallCheck(this, TwoFactorModal);
                    return babelHelpers.possibleConstructorReturn(this, (TwoFactorModal.__proto__ || Object.getPrototypeOf(TwoFactorModal)).apply(this, arguments));
                }

                babelHelpers.createClass(TwoFactorModal, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        babelHelpers.get(TwoFactorModal.prototype.__proto__ || Object.getPrototypeOf(TwoFactorModal.prototype), 'init', this).call(this);

                        this.user = app.session.user;

                        this.enabled = m.prop(this.user.twofa_enabled());
                        this.codes = m.prop('');
                        this.secret = m.prop('');
                        this.url = m.prop('');

                        this.twoFactorCode = m.prop('');

                        $.getScript('https://cdn.rawgit.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js', function () {
                            $('#passcode').mask('000000');
                        });

                        app.request({
                            url: app.forum.attribute('apiUrl') + '/twofactor/getsecret',
                            method: 'GET'
                        }).then(function (response) {
                            _this2.secret(response.data[0].attributes.data.google2fa_secret);
                            _this2.url(response.data[1].id);
                            m.redraw();
                        });
                    }
                }, {
                    key: 'className',
                    value: function className() {
                        return 'TwoFactorModal Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title');
                    }
                }, {
                    key: 'content',
                    value: function content(user) {
                        var _this3 = this;

                        if (this.enabled() === 3) {
                            app.modal.show(new PhoneModal());
                        }
                        return m(
                            'div',
                            { className: 'Modal-body' },
                            m(
                                'div',
                                { className: 'Form' },
                                this.enabled() === 1 ? m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'h2',
                                        null,
                                        app.translator.trans('reflar-twofactor.forum.modal.2fa_heading')
                                    ),
                                    Button.component({
                                        className: 'Button Button--primary Switch-button',
                                        onclick: function onclick() {
                                            app.modal.close();
                                            app.modal.show(new PhoneModal());
                                        },
                                        children: app.translator.trans('reflar-twofactor.forum.modal.stPhone')
                                    }),
                                    m(
                                        'div',
                                        { style: 'text-align: center', className: 'helpText Submit-Button' },
                                        app.translator.trans('reflar-twofactor.forum.modal.helpQR')
                                    ),
                                    m(
                                        'div',
                                        { className: 'TwoFactor-img Submit-Button' },
                                        m('img', { src: decodeURIComponent(this.url()) }),
                                        m(
                                            'h3',
                                            null,
                                            this.secret()
                                        )
                                    ),
                                    m(
                                        'div',
                                        { className: 'TwoFactor-input' },
                                        m('input', { type: 'text',
                                            id: 'passcode',
                                            oninput: m.withAttr('value', this.twoFactorCode),
                                            className: 'FormControl',
                                            placeholder: app.translator.trans('reflar-twofactor.forum.modal.placeholder') })
                                    ),
                                    m(
                                        Button,
                                        { className: 'Button Button--primary TwoFactor-button', loading: this.loading,
                                            type: 'submit' },
                                        app.translator.trans('reflar-twofactor.forum.modal.button')
                                    )
                                ) : '',
                                this.enabled() !== 1 && this.enabled() !== 3 ? m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'label',
                                        null,
                                        app.translator.trans('reflar-twofactor.forum.modal.heading')
                                    ),
                                    m(
                                        'div',
                                        null,
                                        Switch.component({
                                            state: this.enabled(),
                                            children: app.translator.trans('reflar-twofactor.forum.modal.switch'),
                                            className: 'TwoFactor-switch',
                                            onchange: function onchange(value) {
                                                app.request({
                                                    url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                                                    method: 'POST',
                                                    data: {
                                                        'step': value
                                                    }
                                                }).then(function (response) {
                                                    _this3.enabled(+value);
                                                    app.request({
                                                        url: app.forum.attribute('apiUrl') + '/twofactor/getsecret',
                                                        method: 'GET'
                                                    }).then(function (response) {
                                                        _this3.secret(response.data[0].attributes.data.google2fa_secret);
                                                        _this3.url(response.data[1].id);
                                                        m.redraw();
                                                    });
                                                });
                                            }
                                        })
                                    )
                                ) : ''
                            )
                        );
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this4 = this;

                        e.preventDefault();

                        if (this.loading) return;

                        this.loading = true;

                        this.alert = null;

                        app.request({
                            url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                            method: 'POST',
                            data: {
                                'step': 2,
                                'code': this.twoFactorCode()
                            }
                        }).then(function (response) {
                            var data = response.data.id;
                            if (data === 'IncorrectCode') {
                                _this4.alert = new Alert({
                                    type: 'error',
                                    children: app.translator.trans('reflar-twofactor.forum.incorrect_2fa')
                                });
                                m.redraw();
                            } else {
                                app.alerts.show(_this4.successAlert = new Alert({
                                    type: 'success',
                                    children: app.translator.trans('reflar-twofactor.forum.2fa_enabled')
                                }));
                                app.modal.show(new RecoveryModal({ data: data }));
                            }
                        });

                        this.loading = false;
                    }
                }]);
                return TwoFactorModal;
            }(Modal);

            _export('default', TwoFactorModal);
        }
    };
});;
'use strict';

System.register('Reflar/twofactor/main', ['flarum/extend', 'flarum/app', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/utils/extractText', 'flarum/components/ForgotPasswordModal', 'flarum/components/LogInButtons', './components/LogInFactorModal', 'flarum/components/LogInModal', 'flarum/Model', 'flarum/components/SettingsPage', 'flarum/components/SignUpModal', './components/TwoFactorModal', 'flarum/models/User'], function (_export, _context) {
    "use strict";

    var extend, app, Alert, Button, extractText, ForgotPasswordModal, LogInButtons, LogInFactorModal, LogInModal, Model, SettingsPage, SignUpModal, TwoFactorModal, User;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumUtilsExtractText) {
            extractText = _flarumUtilsExtractText.default;
        }, function (_flarumComponentsForgotPasswordModal) {
            ForgotPasswordModal = _flarumComponentsForgotPasswordModal.default;
        }, function (_flarumComponentsLogInButtons) {
            LogInButtons = _flarumComponentsLogInButtons.default;
        }, function (_componentsLogInFactorModal) {
            LogInFactorModal = _componentsLogInFactorModal.default;
        }, function (_flarumComponentsLogInModal) {
            LogInModal = _flarumComponentsLogInModal.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumComponentsSettingsPage) {
            SettingsPage = _flarumComponentsSettingsPage.default;
        }, function (_flarumComponentsSignUpModal) {
            SignUpModal = _flarumComponentsSignUpModal.default;
        }, function (_componentsTwoFactorModal) {
            TwoFactorModal = _componentsTwoFactorModal.default;
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser.default;
        }],
        execute: function () {

            app.initializers.add('reflar-twofactor', function () {
                User.prototype.twofa_enabled = Model.attribute('twofa-enabled');

                LogInModal.prototype.init = function () {
                    this.identification = m.prop(this.props.identification || '');

                    this.password = m.prop(this.props.password || '');

                    this.remember = m.prop(this.props.remember && true);
                };
                LogInModal.prototype.content = function () {
                    return [m(
                        'div',
                        { className: 'Modal-body' },
                        m(LogInButtons, null),
                        m(
                            'div',
                            { className: 'Form Form--centered' },
                            m(
                                'div',
                                { className: 'Form-group' },
                                m('input', { className: 'FormControl', name: 'identification', type: 'text',
                                    placeholder: extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder')),
                                    bidi: this.identification,
                                    disabled: this.loading })
                            ),
                            m(
                                'div',
                                { className: 'Form-group' },
                                m('input', { className: 'FormControl', name: 'password', type: 'password',
                                    placeholder: extractText(app.translator.trans('core.forum.log_in.password_placeholder')),
                                    bidi: this.password,
                                    disabled: this.loading })
                            ),
                            m(
                                'label',
                                { className: 'checkbox' },
                                m('input', { name: 'remember', type: 'checkbox', bidi: this.remember, disabled: this.loading }),
                                app.translator.trans('reflar-twofactor.forum.remember_me_label')
                            ),
                            m(
                                'div',
                                { className: 'Form-group' },
                                Button.component({
                                    className: 'Button Button--primary Button--block',
                                    type: 'submit',
                                    loading: this.loading,
                                    children: app.translator.trans('core.forum.log_in.submit_button')
                                })
                            )
                        )
                    ), m(
                        'div',
                        { className: 'Modal-footer' },
                        m(
                            'p',
                            { className: 'LogInModal-forgotPassword' },
                            m(
                                'a',
                                { onclick: this.forgotPassword.bind(this) },
                                app.translator.trans('core.forum.log_in.forgot_password_link')
                            )
                        ),
                        app.forum.attribute('allowSignUp') ? m(
                            'p',
                            { className: 'LogInModal-signUp' },
                            app.translator.trans('core.forum.log_in.sign_up_text', {
                                a: m('a', { onclick: this.signUp.bind(this) })
                            })
                        ) : ''
                    )];
                };
                LogInModal.prototype.forgotPassword = function () {
                    var email = this.identification();
                    var props = email.indexOf('@') !== -1 ? { email: email } : undefined;

                    app.modal.show(new ForgotPasswordModal(props));
                };

                LogInModal.prototype.signUp = function () {
                    var props = { password: this.password() };
                    var identification = this.identification();
                    props[identification.indexOf('@') !== -1 ? 'email' : 'username'] = identification;

                    app.modal.show(new SignUpModal(props));
                };

                LogInModal.prototype.onready = function () {
                    this.$('[name=' + (this.identification() ? 'password' : 'identification') + ']').select();
                };

                LogInModal.prototype.onsubmit = function (e) {
                    var _this = this;

                    e.preventDefault();

                    this.loading = true;

                    var identification = this.identification();
                    var password = this.password();
                    var remember = this.remember();

                    app.request({
                        url: app.forum.attribute('apiUrl') + '/twofactor/login',
                        method: 'POST',
                        errorHandler: this.failure.bind(this),
                        data: { identification: identification, password: password, remember: remember }
                    }).then(function (response, identification, password, remember) {
                        if (response === null) {
                            var data = {
                                identification: _this.identification(),
                                password: _this.password(),
                                remember: _this.remember()
                            };
                            app.modal.show(new LogInFactorModal({ data: data }));
                        } else {
                            window.location.reload();
                        }
                    });
                };

                LogInModal.prototype.failure = function (response, identification, password, remember) {
                    if (response.status == 401) {
                        app.alerts.show(this.successAlert = new Alert({
                            type: 'error',
                            children: app.translator.trans('core.forum.log_in.invalid_login_message')
                        }));
                        this.loading = false;
                        m.redraw();
                    }
                };

                extend(SettingsPage.prototype, 'accountItems', function (items) {
                    items.add('2 Factor', Button.component({
                        className: 'Button',
                        onclick: function onclick() {
                            app.modal.show(new TwoFactorModal());
                        }
                    }, [app.translator.trans('reflar-twofactor.forum.accountlabel')]), 1);
                });
            });
        }
    };
});