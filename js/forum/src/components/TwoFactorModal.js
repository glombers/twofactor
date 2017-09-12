import app from 'flarum/app'
import Alert from 'flarum/components/Alert'
import {extend} from 'flarum/extend'
import Modal from 'flarum/components/Modal'
import Switch from 'flarum/components/Switch'
import Button from 'flarum/components/Button'
import PhoneModal from './PhoneModal'
import RecoveryModal from './RecoveryModal'

export default class TwoFactorModal extends Modal {
  init () {
    super.init()

    this.user = app.session.user

    this.enabled = m.prop(this.user.twofa_enabled())
    this.codes = m.prop('')
    this.secret = m.prop('')
    this.url = m.prop('')

    this.twoFactorCode = m.prop('')

    $.getScript('https://cdn.rawgit.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js', function () {
      $('#passcode').mask('000000')
    })

    app.request({
      url: app.forum.attribute('apiUrl') + '/twofactor/getsecret',
      method: 'GET'
    }).then(response => {
      this.secret(response.data[0].attributes.data.google2fa_secret)
      this.url(response.data[1].id)
      m.redraw()
    })
  }

  className () {
    return 'TwoFactorModal Modal--small'
  }

  title () {
    return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title')
  }

  content (user) {
    if (this.enabled() === 3) {
      app.modal.show(new PhoneModal())
    }
    return (
      <div className='Modal-body'>
        <div className='Form'>
          {this.enabled() === 1 ? (
            <div className='Form-group'>
              <h2>{app.translator.trans('reflar-twofactor.forum.modal.2fa_heading')}</h2>
              {Button.component({
                className: 'Button Button--primary Switch-button',
                onclick: () => {
                  app.modal.show(new PhoneModal())
                },
                children: app.translator.trans('reflar-twofactor.forum.modal.stPhone')
              })}
              <div style='text-align: center' className='helpText Submit-Button'>
                {app.translator.trans('reflar-twofactor.forum.modal.helpQR')}
              </div>
              <div className='TwoFactor-img Submit-Button'>
                <img src={decodeURIComponent(this.url())} />
                <h3>{this.secret()}</h3>
              </div>
              <div className='TwoFactor-input'>
                <input type='text'
                  id='passcode'
                  oninput={m.withAttr('value', this.twoFactorCode)}
                  className='FormControl'
                  placeholder={app.translator.trans('reflar-twofactor.forum.modal.placeholder')} />
              </div>
              <Button className='Button Button--primary TwoFactor-button' loading={this.loading}
                type='submit'>
                {app.translator.trans('reflar-twofactor.forum.modal.button')}
              </Button>
            </div>
                    ) : ''}
          {this.enabled() !== 1 && this.enabled() !== 3 ? (
            <div className='Form-group'>
              <label>{app.translator.trans('reflar-twofactor.forum.modal.heading')}</label>
              <div>
                {Switch.component({
                  state: this.enabled(),
                  children: app.translator.trans('reflar-twofactor.forum.modal.switch'),
                  className: 'TwoFactor-switch',
                  onchange: (value) => {
                    app.request({
                      url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                      method: 'POST',
                      data: {
                        'step': value
                      }
                    }).then(response => {
                      this.enabled(+value)
                      app.request({
                        url: app.forum.attribute('apiUrl') + '/twofactor/getsecret',
                        method: 'GET'
                      }).then(response => {
                        this.secret(response.data[0].attributes.data.google2fa_secret)
                        this.url(response.data[1].id)
                        m.redraw()
                      })
                    })
                  }
                })}
              </div>
            </div>
                    ) : ''}
        </div>
      </div>
    )
  }

  onsubmit (e) {
    e.preventDefault()

    if (this.loading) return

    this.loading = true

    this.alert = null

    app.request({
      url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
      method: 'POST',
      data: {
        'step': 2,
        'code': this.twoFactorCode()
      },
      errorHandler: this.onerror.bind(this)
    }).then(response => {
      const data = response.data.id
      if (data === 'IncorrectCode') {
        this.alert = new Alert({
          type: 'error',
          children: app.translator.trans('reflar-twofactor.forum.incorrect_2fa')
        })
        m.redraw()
      } else {
        app.alerts.show(this.successAlert = new Alert({
          type: 'success',
          children: app.translator.trans('reflar-twofactor.forum.2fa_enabled')
        }))
        app.modal.show(new RecoveryModal({data}))
      }
    })

    this.loading = false
  }
}
