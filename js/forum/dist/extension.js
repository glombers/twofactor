'use strict'

System.register('Reflar/twofactor/components/LogInFactorModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/components/Modal', 'flarum/Model', 'flarum/components/Switch', 'flarum/components/Button', 'flarum/models/User', 'Reflar/twofactor/components/GetVars'], function (_export, _context) {
  'use strict'

  var app, Alert, extend, Modal, Model, Switch, Button, User, GetVars, LogInFactorModal
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default
    }, function (_flarumModel) {
      Model = _flarumModel.default
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default
    }, function (_flarumModelsUser) {
      User = _flarumModelsUser.default
    }, function (_ReflarTwofactorComponentsGetVars) {
      GetVars = _ReflarTwofactorComponentsGetVars.default
    }],
    execute: function () {
      LogInFactorModal = (function (_Modal) {
        babelHelpers.inherits(LogInFactorModal, _Modal)

        function LogInFactorModal () {
          babelHelpers.classCallCheck(this, LogInFactorModal)
          return babelHelpers.possibleConstructorReturn(this, (LogInFactorModal.__proto__ || Object.getPrototypeOf(LogInFactorModal)).apply(this, arguments))
        }

        babelHelpers.createClass(LogInFactorModal, [{
          key: 'init',
          value: function init () {
            babelHelpers.get(LogInFactorModal.prototype.__proto__ || Object.getPrototypeOf(LogInFactorModal.prototype), 'init', this).call(this)
            this.identification = this.props.data.identification

            this.password = this.props.data.password

            this.remember = this.props.data.remember

            this.twoFactorCode = m.prop('')
          }
        }, {
          key: 'className',
          value: function className () {
            return 'TwoFactorModal Modal--small'
          }
        }, {
          key: 'title',
          value: function title () {
            return app.translator.trans('reflar-twofactor.forum.modal.login_title')
          }
        }, {
          key: 'content',
          value: function content (user) {
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
            )
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit (e) {
            e.preventDefault()

            if (this.loading) return

            this.loading = true

            app.request({
              url: app.forum.attribute('apiUrl') + '/Reflar/twofactor/login',
              method: 'POST',
              data: {
                'identification': this.identification,
                'password': this.password,
                'remember': this.remember,
                'twofactor': this.twoFactorCode() },
              errorHandler: this.onerror.bind(this)
            }).then(function () {
              return window.location.reload()
            }, this.loaded.bind(this))
          }
        }, {
          key: 'onerror',
          value: function onerror (error) {
            if (error.status === 404) {
              error.alert.props.children = app.translator.trans('reflar-twofactor.forum.incorrect_2fa')
              this.loading = false
            }

            babelHelpers.get(LogInFactorModal.prototype.__proto__ || Object.getPrototypeOf(LogInFactorModal.prototype), 'onerror', this).call(this, error)
          }
        }])
        return LogInFactorModal
      }(Modal))

      _export('default', LogInFactorModal)
    }
  }
})
'use strict'

System.register('Reflar/twofactor/components/PhoneModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/utils/ItemList', 'flarum/helpers/listItems', 'flarum/components/Modal', 'flarum/components/Dropdown', 'flarum/components/Button', './TwoFactorModal', './RecoveryModal'], function (_export, _context) {
  'use strict'

  var app, Alert, extend, ItemList, listItems, Modal, Dropdown, Button, TwoFactorModal, RecoveryModal, PhoneModal
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default
    }, function (_flarumComponentsDropdown) {
      Dropdown = _flarumComponentsDropdown.default
    }, function (_flarumComponentsButton) {
        Button = _flarumComponentsButton.default
      }, function (_TwoFactorModal) {
        TwoFactorModal = _TwoFactorModal.default
      }, function (_RecoveryModal) {
          RecoveryModal = _RecoveryModal.default
        }],
    execute: function () {
      PhoneModal = (function (_Modal) {
        babelHelpers.inherits(PhoneModal, _Modal)

        function PhoneModal () {
          babelHelpers.classCallCheck(this, PhoneModal)
          return babelHelpers.possibleConstructorReturn(this, (PhoneModal.__proto__ || Object.getPrototypeOf(PhoneModal)).apply(this, arguments))
        }

        babelHelpers.createClass(PhoneModal, [{
          key: 'init',
          value: function init () {
            babelHelpers.get(PhoneModal.prototype.__proto__ || Object.getPrototypeOf(PhoneModal.prototype), 'init', this).call(this)

            this.twoFactorCode = m.prop('')
            this.carrier = m.prop('3 River Wireless')
            this.phone = m.prop('')

            this.enabled = m.prop(app.session.user.twofa_enabled())

            $.getScript('https://cdn.rawgit.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js', function () {
              $('#phone').mask('(000) 000-0000')
              $('#code').mask('AAA-AAA', { placeholder: '___-___' })
            })
          }
        }, {
          key: 'className',
          value: function className () {
            return 'TwoFactorModal Modal--small'
          }
        }, {
          key: 'title',
          value: function title () {
            return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title')
          }
        }, {
          key: 'carrierItems',
          value: function carrierItems () {
            var _this2 = this

            var items = new ItemList()

            items.add('sort', Dropdown.component({
                buttonClassName: 'Button FormControl',
                label: this.carrier(),
                children: app.forum.attribute('carriers').map(function (carrier) {
                  var active = _this2.carrier() === carrier

                  return Button.component({
                      children: carrier,
                      icon: active ? 'check' : true,
                      onclick: function onclick () {
                            _this2.carrier(carrier)
                          },
                      active: active
                    })
                })
              }))

            return items
          }
        }, {
          key: 'content',
          value: function content (user) {
              var _this3 = this

              return m(
                            'div',
                            { className: 'Modal-body' },
                            m(
                                'div',
                                { className: 'Form-group' },
                                m(
                                    'h2',
                                    null,
                                    app.translator.trans('reflar-twofactor.forum.modal.2fa_heading')
                                ),
                                this.enabled() !== 3 ? Button.component({
                                  className: 'Button Button--primary',
                                  style: 'margin: 0 auto;',
                                  onclick: function onclick () {
                                    app.modal.show(new TwoFactorModal(_this3.user))
                                  },
                                  children: app.translator.trans('reflar-twofactor.forum.modal.stTOTP')
                                }) : '',
                                m(
                                    'div',
                                    { className: 'helpText' },
                                    app.translator.trans('reflar-twofactor.forum.modal.helpText')
                                ),
                                this.enabled() !== 3 ? m(
                                    'div',
                                    null,
                                    m(
                                        'ul',
                                        { className: 'Carrier-dropdown' },
                                        listItems(this.carrierItems().toArray())
                                    ),
                                    m('input', {
                                      type: 'text',
                                      id: 'phone',
                                      style: 'margin-left: 10px;',
                                      oninput: m.withAttr('value', this.phone),
                                      className: 'FormControl'
                                    }),
                                    Button.component({
                                      className: 'Button Button--primary',
                                      onclick: function onclick () {
                                        app.request({
                                          url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                                          method: 'POST',
                                          data: {
                                            'step': 3,
                                            'phone': _this3.phone().replace(/[- )(]/g, ''),
                                            'carrier': _this3.carrier()
                                          }
                                        })
                                        _this3.enabled(3)
                                        m.redraw()
                                      },
                                      children: app.translator.trans('reflar-twofactor.forum.modal.submitPhone')
                                    }),
                                    m(
                                        Button,
                                      { className: 'Button Button--primary TwoFactor-button',
                                        loading: this.loading,
                                        type: 'submit' },
                                        app.translator.trans('reflar-twofactor.forum.modal.button')
                                    )
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
                                    Button.component({
                                      className: 'Button Button--primary',
                                      onclick: function onclick () {
                                        app.request({
                                          url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                                          method: 'POST',
                                          data: {
                                            'step': 4,
                                            'code': _this3.twoFactorCode()
                                          }
                                        }).then(function (response) {
                                          var data = response.data.id
                                          if (data === 'IncorrectCode') {
                                            _this3.alert = new Alert({
                                              type: 'error',
                                              children: app.translator.trans('reflar--twofactor.forum.incorrect_2fa')
                                            })
                                            m.redraw()
                                          } else {
                                            app.alerts.show(_this3.successAlert = new Alert({
                                              type: 'success',
                                              children: app.translator.trans('reflar-twofactor.forum.2fa_enabled')
                                            }))
                                            app.modal.show(new RecoveryModal({ data: data }))
                                          }
                                          _this3.loading = false
                                        })
                                      },
                                      children: app.translator.trans('reflar-twofactor.forum.modal.submitPhone')
                                    })
                                )
                            )
                        )
            }
        }])
        return PhoneModal
      }(Modal))

      _export('default', PhoneModal)
    }
  }
})
'use strict'

System.register('Reflar/twofactor/components/RecoveryModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/components/Modal', 'flarum/Model', 'flarum/components/Switch', 'flarum/components/Button', 'flarum/models/User', 'issyrocks12/twofactor/components/GetVars'], function (_export, _context) {
  'use strict'

  var app, Alert, extend, Modal, Model, Switch, Button, User, GetVars, RecoveryModal
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default
    }, function (_flarumModel) {
      Model = _flarumModel.default
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default
    }, function (_flarumModelsUser) {
        User = _flarumModelsUser.default
      }, function (_issyrocks12TwofactorComponentsGetVars) {
        GetVars = _issyrocks12TwofactorComponentsGetVars.default
      }],
    execute: function () {
      RecoveryModal = (function (_Modal) {
        babelHelpers.inherits(RecoveryModal, _Modal)

        function RecoveryModal () {
          babelHelpers.classCallCheck(this, RecoveryModal)
          return babelHelpers.possibleConstructorReturn(this, (RecoveryModal.__proto__ || Object.getPrototypeOf(RecoveryModal)).apply(this, arguments))
        }

        babelHelpers.createClass(RecoveryModal, [{
          key: 'init',
          value: function init () {
            babelHelpers.get(RecoveryModal.prototype.__proto__ || Object.getPrototypeOf(RecoveryModal.prototype), 'init', this).call(this)

            this.recoveries = this.props.data.split(',')

            console.log(this.recoveries)
          }
        }, {
          key: 'className',
          value: function className () {
            return 'TwoFactorModal Modal--small'
          }
        }, {
          key: 'title',
          value: function title () {
            return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title')
          }
        }, {
          key: 'content',
          value: function content (user) {
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
                                            )
                                        })
                                    ),
                                    m(
                                        Button,
                                        { className: 'Button Button--primary TwoFactor-button', loading: this.loading, type: 'submit' },
                                        app.translator.trans('reflar-twofactor.forum.modal.close')
                                    )
                                )
                            )
                        )
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit (e) {
              app.modal.close()
            }
        }])
        return RecoveryModal
      }(Modal))

      _export('default', RecoveryModal)
    }
  }
})
'use strict'

System.register('Reflar/twofactor/components/TwoFactorModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/components/Modal', 'flarum/components/Switch', 'flarum/components/Button', 'Reflar/twofactor/components/PhoneModal'], function (_export, _context) {
  'use strict'

  var app, Alert, extend, Modal, Switch, Button, PhoneModal, TwoFactorModal
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default
    }, function (_ReflarTwofactorComponentsPhoneModal) {
      PhoneModal = _ReflarTwofactorComponentsPhoneModal.default
    }],
    execute: function () {
      TwoFactorModal = (function (_Modal) {
        babelHelpers.inherits(TwoFactorModal, _Modal)

        function TwoFactorModal () {
          babelHelpers.classCallCheck(this, TwoFactorModal)
          return babelHelpers.possibleConstructorReturn(this, (TwoFactorModal.__proto__ || Object.getPrototypeOf(TwoFactorModal)).apply(this, arguments))
        }

        babelHelpers.createClass(TwoFactorModal, [{
          key: 'init',
          value: function init () {
            var _this2 = this

            babelHelpers.get(TwoFactorModal.prototype.__proto__ || Object.getPrototypeOf(TwoFactorModal.prototype), 'init', this).call(this)

            this.user = app.session.user

            this.enabled = m.prop(this.user.twofa_enabled())
            this.codes = m.prop('')
            this.secret = m.prop('')
            this.url = m.prop('')

            this.twoFactorCode = m.prop('')

            app.request({
              url: app.forum.attribute('apiUrl') + '/twofactor/getsecret',
              method: 'GET'
            }).then(function (response) {
              _this2.secret(response.data[0].attributes.data.google2fa_secret)
              _this2.url(response.data[1].id)
              m.redraw()
            })
          }
        }, {
          key: 'className',
          value: function className () {
            return 'TwoFactorModal Modal--small'
          }
        }, {
          key: 'title',
          value: function title () {
            return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title')
          }
        }, {
          key: 'content',
          value: function content (user) {
            var _this3 = this

            if (this.enabled() === 3) {
              app.modal.show(new PhoneModal())
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
                    onclick: function onclick () {
                      app.modal.show(new PhoneModal())
                    },
                    children: app.translator.trans('reflar-twofactor.forum.modal.stPhone')
                  }),
                  m(
                    'div',
                    { className: 'helpText' },
                    app.translator.trans('reflar-twofactor.forum.modal.helpQR')
                  ),
                  m(
                    'div',
                    { className: 'TwoFactor-img' },
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
                      oninput: m.withAttr('value', this.twoFactorCode),
                      className: 'FormControl',
                      placeholder: app.translator.trans('reflar-twofactor.forum.modal.placeholder') })
                  ),
                  m(
                    Button,
                    { className: 'Button Button--primary TwoFactor-button',
                      loading: this.loading,
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
                      onchange: function onchange (value) {
                        app.request({
                          url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                          method: 'POST',
                          data: {
                            'step': value
                          }
                        }).then(function (response) {
                          _this3.enabled(+value)
                          app.request({
                            url: app.forum.attribute('apiUrl') + '/twofactor/getsecret',
                            method: 'GET'
                          }).then(function (response) {
                            _this3.secret(response.data[0].attributes.data.google2fa_secret)
                            _this3.url(response.data[1].id)
                            m.redraw()
                          })
                        })
                      }
                    })
                  )
                ) : ''
              )
            )
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit (e) {
            e.preventDefault()

            if (this.loading) return

            this.loading = true

            app.request({
              url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
              method: 'POST',
              data: { 'twofactor': this.twoFactorCode() },
              errorHandler: this.onerror.bind(this)
            }).then(this.success.bind(this))
            this.loading = false
          }
        }, {
          key: 'success',
          value: function success (response) {
            app.alerts.show(this.successAlert = new Alert({
              type: 'success',
              children: app.translator.trans('reflar-twofactor.forum.2fa_enabled')
            }))
            app.modal.show(new RecoveryModal())
          }
        }, {
          key: 'onerror',
          value: function onerror (error) {
            if (error.status === 500) {
              error.alert.props.children = app.translator.trans('reflar-twofactor.forum.incorrect_2fa')
            }

            babelHelpers.get(TwoFactorModal.prototype.__proto__ || Object.getPrototypeOf(TwoFactorModal.prototype), 'onerror', this).call(this, error)
          }
        }])
        return TwoFactorModal
      }(Modal))

      _export('default', TwoFactorModal)
    }
  }
})
'use strict'

System.register('Reflar/twofactor/main', ['flarum/extend', 'flarum/app', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/utils/extractText', 'flarum/components/ForgotPasswordModal', 'flarum/components/LogInButtons', 'Reflar/twofactor/components/LogInFactorModal', 'flarum/components/LogInModal', 'flarum/Model', 'flarum/components/SettingsPage', 'flarum/components/SignUpModal', 'Reflar/twofactor/components/TwoFactorModal', 'flarum/models/User'], function (_export, _context) {
  'use strict'

  var extend, app, Alert, Button, extractText, ForgotPasswordModal, LogInButtons, LogInFactorModal, LogInModal, Model, SettingsPage, SignUpModal, TwoFactorModal, User
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend
    }, function (_flarumApp) {
      app = _flarumApp.default
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default
    }, function (_flarumComponentsForgotPasswordModal) {
      ForgotPasswordModal = _flarumComponentsForgotPasswordModal.default
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default
    }, function (_ReflarTwofactorComponentsLogInFactorModal) {
      LogInFactorModal = _ReflarTwofactorComponentsLogInFactorModal.default
    }, function (_flarumComponentsLogInModal) {
      LogInModal = _flarumComponentsLogInModal.default
    }, function (_flarumModel) {
      Model = _flarumModel.default
    }, function (_flarumComponentsSettingsPage) {
      SettingsPage = _flarumComponentsSettingsPage.default
    }, function (_flarumComponentsSignUpModal) {
      SignUpModal = _flarumComponentsSignUpModal.default
    }, function (_ReflarTwofactorComponentsTwoFactorModal) {
      TwoFactorModal = _ReflarTwofactorComponentsTwoFactorModal.default
    }, function (_flarumModelsUser) {
      User = _flarumModelsUser.default
    }],
    execute: function () {
      app.initializers.add('reflar-twofactor', function () {
        User.prototype.twofa_enabled = Model.attribute('twofa-enabled')

        LogInModal.prototype.init = function () {
          this.identification = m.prop(this.props.identification || '')

          this.password = m.prop(this.props.password || '')

          this.remember = m.prop(this.props.remember && true)
        }
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
                m('input', { className: 'FormControl',
                  name: 'identification',
                  type: 'text',
                  placeholder: extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder')),
                  bidi: this.identification,
                  disabled: this.loading })
              ),
              m(
                'div',
                { className: 'Form-group' },
                m('input', { className: 'FormControl',
                  name: 'password',
                  type: 'password',
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
          )]
        }
        LogInModal.prototype.forgotPassword = function () {
          var email = this.identification()
          var props = email.indexOf('@') !== -1 ? { email: email } : undefined

          app.modal.show(new ForgotPasswordModal(props))
        }

        LogInModal.prototype.signUp = function () {
          var props = { password: this.password() }
          var identification = this.identification()
          props[identification.indexOf('@') !== -1 ? 'email' : 'username'] = identification

          app.modal.show(new SignUpModal(props))
        }

        LogInModal.prototype.onready = function () {
          this.$('[name=' + (this.identification() ? 'password' : 'identification') + ']').select()
        }

        LogInModal.prototype.onsubmit = function (e) {
          e.preventDefault()

          this.loading = true

          var identification = this.identification()
          var password = this.password()
          var remember = this.remember()

          app.request({
            url: app.forum.attribute('apiUrl') + '/twofactor/login',
            method: 'POST',
            data: { identification: identification, password: password, remember: remember },
            errorHandler: this.failure.bind(this)
          }).then(function () {
            return window.location.reload()
          }, this.loaded.bind(this))
        }
        LogInModal.prototype.failure = function (response, identification, password, remember) {
          if (response.status === 401) {
            app.alerts.show(this.successAlert = new Alert({
              type: 'error',
              children: app.translator.trans('core.forum.log_in.invalid_login_message')
            }))
            this.loading = false
          }
          if (response.status === 405) {
            var data = {
              identification: this.identification(),
              password: this.password(),
              remember: this.remember()
            }
            app.modal.show(new LogInFactorModal({ data: data }))
          }
        }

        extend(SettingsPage.prototype, 'accountItems', function (items) {
          items.add('2 Factor', Button.component({
            className: 'Button',
            onclick: function onclick () {
              app.modal.show(new TwoFactorModal())
            }
          }, [app.translator.trans('reflar-twofactor.forum.accountlabel')]), 1)
        })
      })
    }
  }
})
