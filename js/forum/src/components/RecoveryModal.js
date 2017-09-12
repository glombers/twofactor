import app from 'flarum/app'
import Alert from 'flarum/components/Alert'
import { extend } from 'flarum/extend'
import Modal from 'flarum/components/Modal'
import Model from 'flarum/Model'
import Switch from 'flarum/components/Switch'
import Button from 'flarum/components/Button'
import User from 'flarum/models/User'

import GetVars from 'issyrocks12/twofactor/components/GetVars'

export default class RecoveryModal extends Modal {
  init () {
    super.init()

    this.recoveries = this.props.data.split(',')
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
        <div className='Form'>
          <div className='Form-group'>
            <div className='TwoFactor-codes'>
              <h3>{app.translator.trans('reflar-twofactor.forum.modal.recov_help1')}</h3>
              <h4>{app.translator.trans('reflar-twofactor.forum.modal.recov_help2')}</h4>
              {this.recoveries.map(recovery => {
                return (
                  <br />,
                    <h3>{recovery}</h3>
                )
              })}
            </div>
            <Button className='Button Button--primary TwoFactor-button' loading={this.loading} type='submit'>
              {app.translator.trans('reflar-twofactor.forum.modal.close')}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  onsubmit (e) {
    app.modal.close()
  }
}
