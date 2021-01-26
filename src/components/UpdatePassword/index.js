import React, { PureComponent } from 'react'
import { message } from 'antd'
import _ from 'lodash'
import './styles.scss'

export default class UpdatePasswordComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      newPassword: '',
      ConfirmPassword: '',
      newPasswordError: '',
      ConfirmPasswordError: '',
      MatchError: '',
      validationFunctionCall: false,
      button: true,
      buttonDisable: false,
      id: ''
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.validationFunctionCall) {
        this.validate()
      }
    })
  }

  validate = () => {
    var errorFlag = true
    if (!this.state.newPassword) {
      errorFlag = false
      this.setState({ newPasswordError: true })
    } else {
      this.setState({ newPasswordError: false })
    }
    if (!this.state.ConfirmPassword) {
      errorFlag = false
      this.setState({ ConfirmPasswordError: true })
    } else {
      this.setState({ ConfirmPasswordError: false })
    }
    if (this.state.newPassword && this.state.ConfirmPassword) {
      if (this.state.newPassword !== this.state.ConfirmPassword) {
        errorFlag = false
        this.setState({ MatchError: true })
      } else {
        this.setState({ MatchError: false })
      }
    } else {
      this.setState({ MatchError: false })
    }
    return errorFlag
  }

  componentDidMount(){
    this.setState({ id : this.props.match.params.id })
  }

  async handleSubmit() {
    this.setState({ validationFunctionCall: true })
    const errorFlag = this.validate()

    if (errorFlag) {
      this.setState({ button: false, buttonDisable: true })
      const data = {
        id : this.state.id,
        password: this.state.newPassword
      }
      const result = await this.props.UpdatePasswordByLink(data)
      if (result.value.status === true) {
        this.setState({
          newPassword: '',
          ConfirmPassword: '',
          validationFunctionCall: false,
          button: true,
          buttonDisable: false
        })
        message.success(_.get(result,'value.message','Password changed successfully.'))
        setTimeout(() => {
          this.props.history.push("/login")
        }, 2000)
      }
    }
  }

  render() {
    return (
      <div>
        <div className="profile_admin__wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="section__title">
                  <h2>Reset Your Password!</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                <div className="form__wrap">
                  <form>
                    <div className="form-group">
                      <label className="label_form"> New Password </label>
                      <input
                        type="password"
                        className="form-control input"
                        name="newPassword"
                        value={this.state.newPassword}
                        onChange={this.onChange.bind(this)}
                        required
                        placeholder="Your New Password here"
                      />
                      <p>{this.state.newPasswordError ? 'Required' : ''}</p>
                    </div>
                    <div className="form-group">
                      <label className="label_form"> Confirm Password </label>
                      <input
                        type="password"
                        className="form-control input"
                        name="ConfirmPassword"
                        value={this.state.ConfirmPassword}
                        onChange={this.onChange.bind(this)}
                        required
                        placeholder="Confirm Password"
                      />
                      <p>{this.state.ConfirmPasswordError ? 'Required' : ''}</p>
                      <p>{this.state.MatchError ? 'Password is not matched' : ''}</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-lg btn_contact"
                        onClick={this.handleSubmit.bind(this)}
                        disabled={this.state.buttonDisable}
                      >
                        {this.state.button ? 'Reset Password' : 'Please Wait...'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
