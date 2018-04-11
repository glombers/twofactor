import {extend} from 'flarum/extend'
import app from 'flarum/app'
import Alert from 'flarum/components/Alert'
import Button from 'flarum/components/Button'
import extractText from 'flarum/utils/extractText'
import ForgotPasswordModal from 'flarum/components/ForgotPasswordModal'
import LogInButtons from 'flarum/components/LogInButtons'
import LogInFactorModal from './components/LogInFactorModal'
import LogInModal from 'flarum/components/LogInModal'
import Model from 'flarum/Model'
import SettingsPage from 'flarum/components/SettingsPage'
import SignUpModal from 'flarum/components/SignUpModal'
import TwoFactorModal from './components/TwoFactorModal'
import User from 'flarum/models/User'

app.initializers.add('reflar-twofactor', () => {
    User.prototype.twofa_enabled = Model.attribute('twofa-enabled')


    LogInModal.prototype.init = function () {
        this.identification = m.prop(this.props.identification || '')

        this.password = m.prop(this.props.password || '')

        this.remember = m.prop(this.props.remember && true)

        this.pageId = this.makeid()
    }

    LogInModal.prototype.makeid = function () {
        var text = "";
        var possible = "0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }


    LogInModal.prototype.content = function () {
        return [
            <div className='Modal-body'>
                <LogInButtons/>

                <div className='Form Form--centered'>
                    <div className='Form-group'>
                        <input className='FormControl' name='identification' type='text'
                               placeholder={extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder'))}
                               bidi={this.identification}
                               disabled={this.loading}/>
                    </div>

                    <div className='Form-group'>
                        <input className='FormControl' name='password' type='password'
                               placeholder={extractText(app.translator.trans('core.forum.log_in.password_placeholder'))}
                               bidi={this.password}
                               disabled={this.loading}/>
                    </div>

                    <label className='checkbox'>
                        <input name='remember' type='checkbox' bidi={this.remember} disabled={this.loading}/>
                        {app.translator.trans('core.forum.log_in.remember_me_label')}
                    </label>

                    <div className='Form-group'>
                        {Button.component({
                            className: 'Button Button--primary Button--block',
                            type: 'submit',
                            loading: this.loading,
                            children: app.translator.trans('core.forum.log_in.submit_button')
                        })}
                    </div>
                </div>
            </div>,
            <div className='Modal-footer'>
                <p className='LogInModal-forgotPassword'>
                    <a onclick={this.forgotPassword.bind(this)}>{app.translator.trans('core.forum.log_in.forgot_password_link')}</a>
                </p>

                {app.forum.attribute('allowSignUp') ? (
                    <p className='LogInModal-signUp'>
                        {app.translator.trans('core.forum.log_in.sign_up_text', {
                            a: <a onclick={this.signUp.bind(this)}/>
                        })}
                    </p>
                ) : ''}
            </div>
        ]
    }


    LogInModal.prototype.onsubmit = function (e) {
        e.preventDefault()

        this.loading = true

        const identification = this.identification()
        const password = this.password()
        const remember = this.remember()
        const pageId = this.pageId

        app.request({
            url: app.forum.attribute('apiUrl') + '/twofactor/login',
            method: 'POST',
            errorHandler: this.failure.bind(this),
            data: {identification, password, remember, pageId}
        }).then((response, identification, password, remember, pageId) => {
                if (response === null) {
                    var data = {
                        identification: this.identification(),
                        password: this.password(),
                        remember: this.remember(),
                        pageId: this.pageId
                    }
                    app.modal.show(new LogInFactorModal({data}))
                } else {
                    window.location.reload()
                }
            }
        )
    }

    LogInModal.prototype.failure = function (response, identification, password, remember) {
        if (response.status == 401) {
            app.alerts.show(this.successAlert = new Alert({
                type: 'error',
                children: app.translator.trans('core.forum.log_in.invalid_login_message')
            }));
            this.loading = false
            m.redraw()
        }
    }




    extend(SettingsPage.prototype, 'accountItems', (items) => {
            items.add('2 Factor',
                Button.component({
                        className: 'Button',
                        onclick: () => {
                            app.modal.show(new TwoFactorModal())
                        }
                    },
                    [app.translator.trans('reflar-twofactor.forum.accountlabel')])
                , 1)
        }
    )
})
