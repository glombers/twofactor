import app from 'flarum/app'
import Alert from 'flarum/components/Alert'
import {extend} from 'flarum/extend'
import ItemList from 'flarum/utils/ItemList'
import listItems from 'flarum/helpers/listItems'
import Modal from 'flarum/components/Modal'
import Dropdown from 'flarum/components/Dropdown'
import Button from 'flarum/components/Button'
import TwoFactorModal from './TwoFactorModal'
import RecoveryModal from './RecoveryModal'

export default class PhoneModal extends Modal {
  init () {
    super.init()

    this.twoFactorCode = m.prop('')
    this.carrier = m.prop('3 River Wireless')
    this.phone = m.prop('')

    this.enabled = m.prop(app.session.user.twofa_enabled())

    $.getScript('https://cdn.rawgit.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js', function () {
      $('#phone').mask('(000) 000-0000')
      $('#code').mask('AAA-AAA', {placeholder: '___-___'})
    })
  }

  className () {
    return 'TwoFactorModal Modal--small'
  }

  title () {
    return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title')
  }

  carrierItems () {
    const items = new ItemList()

    items.add('sort',
            Dropdown.component({
              buttonClassName: 'Button FormControl',
              menuClassName: 'Carrier-Dropdown-actual',
              label: this.carrier(),
              children: app.forum.attribute('carriers').map(carrier => {
                const active = (this.carrier() === carrier)

                return Button.component({
                  children: carrier,
                  icon: active ? 'check' : true,
                  onclick: () => {
                    this.carrier(carrier)
                  },
                  active: active
                })
              })
            })
        )

    return items
  }

  content (user) {
    return (
      <div className='Modal-body'>
        <div className='Form'>
          <div className='Form-group'>
            <h2>{app.translator.trans('reflar-twofactor.forum.modal.2fa_heading')}</h2>
            {this.enabled() !== 3 ? Button.component({
              className: 'Button Button--primary Switch-button',
              onclick: () => {
                app.modal.show(new TwoFactorModal(this.user))
              },
              children: app.translator.trans('reflar-twofactor.forum.modal.stTOTP')
            }) : ''}
            <div style='text-align: center' className='helpText Submit-Button'>
              {app.translator.trans('reflar-twofactor.forum.modal.helpPhone')}
            </div>
          </div>
          {this.enabled() !== 3 ? (
            <div className='Form-group'>
              <ul className='Carrier-dropdown'>{listItems(this.carrierItems().toArray())}</ul>
              <input
                type='text'
                id='phone'
                oninput={m.withAttr('value', this.phone)}
                className='FormControl Phone-Input'
                            />
              {Button.component({
                className: 'Button Button--primary',
                onclick: () => {
                  app.request({
                    url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                    method: 'POST',
                    data: {
                        'step': 3,
                        'phone': this.phone().replace(/[- )(]/g, ''),
                        'carrier': this.carrier()
                      }
                  })
                  this.enabled(3)
                  m.redraw()
                },
                children: app.translator.trans('reflar-twofactor.forum.modal.submitPhone')
              })}
            </div>
                    ) : (
                      <div>
                        <input
                          type='text'
                          id='code'
                          style='text-transform: uppercase;'
                          oninput={m.withAttr('value', this.twoFactorCode)}
                          className='FormControl'
                            />
                        <Button className='Button Button--primary TwoFactor-button' loading={this.loading}
                          type='submit'>
                          {app.translator.trans('reflar-twofactor.forum.modal.button')}
                        </Button>
                      </div>
                    )}
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
