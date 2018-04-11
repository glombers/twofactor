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
    init() {
        super.init()

        this.twoFactorCode = m.prop('')


        this.phone = m.prop('')

        this.enabled = m.prop(app.session.user.twofa_enabled())

        $.getScript('https://cdn.rawgit.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js', function () {
            $('#phone').mask('(000) 000-0000')
            $('#code').mask('AAA-AAA', {placeholder: '   -   '})
        })

        this.country = {
            name: 'United States of America',
            mcode: '+1'
        }

        this.countries = [
            {name: "United States of America", mcode: "+1"},
            {name: "United Kingdom", mcode: "+44"},
            {name: "Algeria", mcode: "+213"},
            {name: "Andorra", mcode: "+376"},
            {name: "Angola", mcode: "+244"},
            {name: "Anguilla", mcode: "+1264"},
            {name: "Antigua & Barbuda", mcode: "+1268"},
            {name: "Argentina", mcode: "+54"},
            {name: "Armenia", mcode: "+374"},
            {name: "Aruba", mcode: "+297"},
            {name: "Australia", mcode: "+61"},
            {name: "Austria", mcode: "+43"},
            {name: "Azerbaijan", mcode: "+994"},
            {name: "Bahamas", mcode: "+1242"},
            {name: "Bahrain", mcode: "+973"},
            {name: "Bangladesh", mcode: "+880"},
            {name: "Barbados", mcode: "+1246"},
            {name: "Belarus", mcode: "+375"},
            {name: "Belgium", mcode: "+32"},
            {name: "Belize", mcode: "+501"},
            {name: "Benin", mcode: "+229"},
            {name: "Bermuda", mcode: "+1441"},
            {name: "Bhutan", mcode: "+975"},
            {name: "Bolivia", mcode: "+591"},
            {name: "Bosnia Herzegovina", mcode: "+387"},
            {name: "Botswana", mcode: "+267"},
            {name: "Brazil", mcode: "+55"},
            {name: "Brunei", mcode: "+673"},
            {name: "Bulgaria", mcode: "+359"},
            {name: "Burkina Faso", mcode: "+226"},
            {name: "Burundi", mcode: "+257"},
            {name: "Cambodia", mcode: "+855"},
            {name: "Cameroon", mcode: "+237"},
            {name: "Canada", mcode: "+1"},
            {name: "Cape Verde Islands", mcode: "+238"},
            {name: "Cayman Islands", mcode: "+1345"},
            {name: "Central African Republic", mcode: "+236"},
            {name: "Chile", mcode: "+56"},
            {name: "China", mcode: "+86"},
            {name: "Colombia", mcode: "+57"},
            {name: "Comoros", mcode: "+269"},
            {name: "Congo", mcode: "+242"},
            {name: "Cook Islands", mcode: "+682"},
            {name: "Costa Rica", mcode: "+506"},
            {name: "Croatia", mcode: "+385"},
            {name: "Cuba", mcode: "+53"},
            {name: "Cyprus - North", mcode: "+90"},
            {name: "Cyprus - South", mcode: "+357"},
            {name: "Czech Republic", mcode: "+420"},
            {name: "Denmark", mcode: "+45"},
            {name: "Djibouti", mcode: "+253"},
            {name: "Dominica", mcode: "+1809"},
            {name: "Dominican Republic", mcode: "+1809"},
            {name: "Ecuador", mcode: "+593"},
            {name: "Egypt", mcode: "+20"},
            {name: "El Salvador", mcode: "+503"},
            {name: "Equatorial Guinea", mcode: "+240"},
            {name: "Eritrea", mcode: "+291"},
            {name: "Estonia", mcode: "+372"},
            {name: "Ethiopia", mcode: "+251"},
            {name: "Falkland Islands", mcode: "+500"},
            {name: "Faroe Islands", mcode: "+298"},
            {name: "Fiji", mcode: "+679"},
            {name: "Finland", mcode: "+358"},
            {name: "France", mcode: "+33"},
            {name: "French Guiana", mcode: "+594"},
            {name: "French Polynesia", mcode: "+689"},
            {name: "Gabon", mcode: "+241"},
            {name: "Gambia", mcode: "+220"},
            {name: "Georgia", mcode: "+7880"},
            {name: "Germany", mcode: "+49"},
            {name: "Ghana", mcode: "+233"},
            {name: "Gibraltar", mcode: "+350"},
            {name: "Greece", mcode: "+30"},
            {name: "Greenland", mcode: "+299"},
            {name: "Grenada", mcode: "+1473"},
            {name: "Guadeloupe", mcode: "+590"},
            {name: "Guam", mcode: "+671"},
            {name: "Guatemala", mcode: "+502"},
            {name: "Guinea", mcode: "+224"},
            {name: "Guinea - Bissau", mcode: "+245"},
            {name: "Guyana", mcode: "+592"},
            {name: "Haiti", mcode: "+509"},
            {name: "Honduras", mcode: "+504"},
            {name: "Hong Kong", mcode: "+852"},
            {name: "Hungary", mcode: "+36"},
            {name: "Iceland", mcode: "+354"},
            {name: "India", mcode: "+91"},
            {name: "Indonesia", mcode: "+62"},
            {name: "Iraq", mcode: "+964"},
            {name: "Iran", mcode: "+98"},
            {name: "Ireland", mcode: "+353"},
            {name: "Israel", mcode: "+972"},
            {name: "Italy", mcode: "+39"},
            {name: "Jamaica", mcode: "+1876"},
            {name: "Japan", mcode: "+81"},
            {name: "Jordan", mcode: "+962"},
            {name: "Kazakhstan", mcode: "+7"},
            {name: "Kenya", mcode: "+254"},
            {name: "Kiribati", mcode: "+686"},
            {name: "Korea - North", mcode: "+850"},
            {name: "Korea - South", mcode: "+82"},
            {name: "Kuwait", mcode: "+965"},
            {name: "Kyrgyzstan", mcode: "+996"},
            {name: "Laos", mcode: "+856"},
            {name: "Latvia", mcode: "+371"},
            {name: "Lebanon", mcode: "+961"},
            {name: "Lesotho", mcode: "+266"},
            {name: "Liberia", mcode: "+231"},
            {name: "Libya", mcode: "+218"},
            {name: "Liechtenstein", mcode: "+417"},
            {name: "Lithuania", mcode: "+370"},
            {name: "Luxembourg", mcode: "+352"},
            {name: "Macao", mcode: "+853"},
            {name: "Macedonia", mcode: "+389"},
            {name: "Madagascar", mcode: "+261"},
            {name: "Malawi", mcode: "+265"},
            {name: "Malaysia", mcode: "+60"},
            {name: "Maldives", mcode: "+960"},
            {name: "Mali", mcode: "+223"},
            {name: "Malta", mcode: "+356"},
            {name: "Marshall Islands", mcode: "+692"},
            {name: "Martinique", mcode: "+596"},
            {name: "Mauritania", mcode: "+222"},
            {name: "Mayotte", mcode: "+269"},
            {name: "Mexico", mcode: "+52"},
            {name: "Micronesia", mcode: "+691"},
            {name: "Moldova", mcode: "+373"},
            {name: "Monaco", mcode: "+377"},
            {name: "Mongolia", mcode: "+976"},
            {name: "Montserrat", mcode: "+1664"},
            {name: "Morocco", mcode: "+212"},
            {name: "Mozambique", mcode: "+258"},
            {name: "Myanmar", mcode: "+95"},
            {name: "Namibia", mcode: "+264"},
            {name: "Nauru", mcode: "+674"},
            {name: "Nepal", mcode: "+977"},
            {name: "Netherlands", mcode: "+31"},
            {name: "New Caledonia", mcode: "+687"},
            {name: "New Zealand", mcode: "+64"},
            {name: "Nicaragua", mcode: "+505"},
            {name: "Niger", mcode: "+227"},
            {name: "Nigeria", mcode: "+234"},
            {name: "Niue", mcode: "+683"},
            {name: "Norfolk Islands", mcode: "+672"},
            {name: "Northern Marianas", mcode: "+670"},
            {name: "Norway", mcode: "+47"},
            {name: "Oman", mcode: "+968"},
            {name: "Pakistan", mcode: "+92"},
            {name: "Palau", mcode: "+680"},
            {name: "Panama", mcode: "+507"},
            {name: "Papua New Guinea", mcode: "+675"},
            {name: "Paraguay", mcode: "+595"},
            {name: "Peru", mcode: "+51"},
            {name: "Philippines", mcode: "+63"},
            {name: "Poland", mcode: "+48"},
            {name: "Portugal", mcode: "+351"},
            {name: "Puerto Rico", mcode: "+1787"},
            {name: "Qatar", mcode: "+974"},
            {name: "Reunion", mcode: "+262"},
            {name: "Romania", mcode: "+40"},
            {name: "Russia", mcode: "+7"},
            {name: "Rwanda", mcode: "+250"},
            {name: "San Marino", mcode: "+378"},
            {name: "Sao Tome & Principe", mcode: "+239"},
            {name: "Saudi Arabia", mcode: "+966"},
            {name: "Senegal", mcode: "+221"},
            {name: "Serbia", mcode: "+381"},
            {name: "Seychelles", mcode: "+248"},
            {name: "Sierra Leone", mcode: "+232"},
            {name: "Singapore", mcode: "+65"},
            {name: "Slovak Republic", mcode: "+421"},
            {name: "Slovenia", mcode: "+386"},
            {name: "Solomon Islands", mcode: "+677"},
            {name: "Somalia", mcode: "+252"},
            {name: "South Africa", mcode: "+27"},
            {name: "Spain", mcode: "+34"},
            {name: "Sri Lanka", mcode: "+94"},
            {name: "St. Helena", mcode: "+290"},
            {name: "St. Kitts", mcode: "+1869"},
            {name: "St. Lucia", mcode: "+1758"},
            {name: "Suriname", mcode: "+597"},
            {name: "Sudan", mcode: "+249"},
            {name: "Swaziland", mcode: "+268"},
            {name: "Sweden", mcode: "+46"},
            {name: "Switzerland", mcode: "+41"},
            {name: "Syria", mcode: "+963"},
            {name: "Taiwan", mcode: "+886"},
            {name: "Tajikistan", mcode: "+992"},
            {name: "Thailand", mcode: "+66"},
            {name: "Togo", mcode: "+228"},
            {name: "Tonga", mcode: "+676"},
            {name: "Trinidad & Tobago", mcode: "+1868"},
            {name: "Tunisia", mcode: "+216"},
            {name: "Turkey", mcode: "+90"},
            {name: "Turkmenistan", mcode: "+993"},
            {name: "Turks & Caicos Islands", mcode: "+1649"},
            {name: "Tuvalu", mcode: "+688"},
            {name: "Uganda", mcode: "+256"},
            {name: "Ukraine", mcode: "+380"},
            {name: "United Arab Emirates", mcode: "+971"},
            {name: "Uruguay", mcode: "+598"},
            {name: "Uzbekistan", mcode: "+998"},
            {name: "Vanuatu", mcode: "+678"},
            {name: "Vatican City", mcode: "+379"},
            {name: "Venezuela", mcode: "+58"},
            {name: "Vietnam", mcode: "+84"},
            {name: "Virgin Islands - British", mcode: "+1"},
            {name: "Virgin Islands - US", mcode: "+1"},
            {name: "Wallis & Futuna", mcode: "+681"},
            {name: "Yemen", mcode: "North)(+969"},
            {name: "Yemen", mcode: "South)(+967"},
            {name: "Zambia", mcode: "+260"},
            {name: "Zimbabwe", mcode: "+263"}
        ]
    }

    className() {
        return 'TwoFactorModal Modal--small'
    }

    title() {
        return app.translator.trans('reflar-twofactor.forum.modal.twofactor_title')
    }

    countryItems() {
        const items = new ItemList()

        items.add('sort',
            Dropdown.component({
                buttonClassName: 'Button FormControl',
                menuClassName: 'Country-Dropdown-actual',
                label: this.country.name,
                children: this.countries.map(country => {
                    const active = (this.country === country)

                    return Button.component({
                        children: country.name,
                        icon: active ? 'check' : true,
                        onclick: () => {
                            this.country = country
                        },
                        active: active
                    })
                })
            })
        )

        return items
    }

    content(user) {
        return (
            <div className='Modal-body'>
                <div className='Form'>
                    <div className='Form-group'>
                        <h2>{app.translator.trans('reflar-twofactor.forum.modal.2fa_heading')}</h2>
                        {this.enabled() !== 3 ? Button.component({
                            className: 'Button Button--primary Switch-button',
                            onclick: () => {
                                app.modal.close()
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
                            <ul className='Country-dropdown'>{listItems(this.countryItems().toArray())}</ul>
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
                                            'phone': this.country.mcode + this.phone().replace(/[- )(]/g, ''),
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
                            {Button.component({
                                className: 'Button Button--primary TwoFactor-button',
                                loading: this.loading,
                                onclick: () => {
                                    app.request({
                                        url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                                        method: 'POST',
                                        data: {
                                            'step': 1
                                        },
                                        errorHandler: this.onerror.bind(this)
                                    }).then(() => {
                                        app.modal.close()
                                        app.modal.show(new TwoFactorModal(this.user))
                                    })

                                    this.loading = false
                                },
                                children: app.translator.trans('reflar-twofactor.forum.modal.back')
                            })}
                            <input
                                type='text'
                                id='code'
                                style='text-transform: uppercase;'
                                oninput={m.withAttr('value', this.twoFactorCode)}
                                className='FormControl'
                            />
                            {Button.component({
                                className: 'Button Button--primary TwoFactor-button',
                                loading: this.loading,
                                onclick: () => {
                                    app.request({
                                        url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
                                        method: 'POST',
                                        data: {
                                            'step': 4,
                                            'code': this.twoFactorCode()
                                        },
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
                                },
                                children: app.translator.trans('reflar-twofactor.forum.modal.button')
                            })}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    onsubmit(e) {
        e.preventDefault()

        if (this.loading) return

        this.loading = true

        this.alert = null

        app.request({
            url: app.forum.attribute('apiUrl') + '/twofactor/verifycode',
            method: 'POST',
            data: {
                'step': 4,
                'code': this.twoFactorCode()
            },
            errorHandler: this.onerror.bind(this)
        }).then(response => {
            console.log(response)
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
