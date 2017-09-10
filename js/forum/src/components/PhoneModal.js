import app from 'flarum/app'
import {extend} from 'flarum/extend'
import Modal from 'flarum/components/Modal'
import Select from 'flarum/components/Select'
import Button from 'flarum/components/Button'
import TwoFactorModal from './TwoFactorModal'

export default class PhoneModal extends Modal {
  init () {
    super.init()

    this.twoFactorCode = m.prop('')
    this.carrier = m.prop('')
    this.phone = m.prop('')

    this.enabled = m.prop(app.session.user.twofa_enabled())

    $.getScript('https://cdn.rawgit.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js', function () {
      $('#phone').mask('(000) 000-0000')
    })
  }

  className () {
    return 'TwoFactorModal Modal--small'
  }

  title () {
    return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title')
  }

  content (user) {
    return (
      <div className='Modal-body'>
        <div className='Form-group'>
          <h2>{app.translator.trans('reflar-twofactor.forum.modal.2fa_heading')}</h2>
          {this.enabled() !== 3 ? Button.component({
            className: 'Button Button--primary',
            style: 'margin: 0 auto;',
            onclick: () => {
              app.modal.show(new TwoFactorModal(this.user))
            },
            children: app.translator.trans('reflar-twofactor.forum.modal.stTOTP')
          }) : ''}
          <div className='helpText'>
            {app.translator.trans('reflar-twofactor.forum.modal.help')}
          </div>
          {Select.component({
            options: app.forum.attribute('carriers'),
            value: this.carrier(),
            onchange: this.carrier
          })}
          <input type='text'
            id='phone'
            style='margin-right: 15px;'
            oninput={m.withAttr('value', this.phone)}
            className='FormControl' />
          {Button.component({
            className: 'Button Button--primary',
            onclick: () => {
              app.request({
                url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                method: 'POST',
                data: {
                  'phone': this.phone().replace(/[- )(]/g, ''),
                  'carrier': this.carrier()
                }
              })
            },
            children: app.translator.trans('reflar-twofactor.forum.modal.submitPhone')
          })}
          <Button className='Button Button--primary TwoFactor-button' loading={this.loading}
            type='submit'>
            {app.translator.trans('reflar-twofactor.forum.modal.button')}
          </Button>
        </div>
      </div>
    )
  }
}
