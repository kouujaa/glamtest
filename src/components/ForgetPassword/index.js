import React, { PureComponent } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { forgetPasswordSchema } from '../../utils/validations'
import { message } from 'antd'
import { Link } from "react-router-dom"
import './styles.scss'

export default class ForgetPasswordComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      button: true,
      buttonDisable: false,
      thankyou: false
    }
  }

  async handleEmail(values) {
    const data = {
      email: values.email
    }
    this.setState({
      email: values.email
    })
    const result = await this.props.ResetPasswordLink(data)
    if (result.value.status) {
      this.setState({ thankyou: true })
    } else {
      message.error('Invalid email id')
    }
  }

  render() {
    return (
      <div>
        {this.state.thankyou === false ?
          <div className="login">
            <div className="login_wrap">
              <div className="logo_wrap">
                <Link to="/home" ><img src="/images/Logo_Glamplug_White.svg" alt="" /></Link>
              </div>
              <i
                className="fa fa-close close_page"
                onClick={() => {
                  this.props.history.push('/')
                }}
              ></i>
              <div className="container">
                <div className="row center_wrapper">
                  <div className="col-md-12 pt-5 pb-5">
                    <div className="section__title">
                      <h2>Reset - Password</h2>
                      <p>Send password reset instructions</p>
                    </div>
                    <div className="login_form">
                      <Formik
                        initialValues={{
                          email: '',
                        }}
                        enableReinitialize
                        validationSchema={forgetPasswordSchema}
                        onSubmit={this.handleEmail.bind(this)}
                      >
                        {({
                          values,
                          handleChange,
                          handleBlur,
                          errors,
                          setFieldValue,
                          handleSubmit,
                          isSubmitting
                        }) => (
                            <Form>
                              <div className="profile_img_wrap">
                                <img
                                  src="/images/profile.png"
                                  className="profile_img"
                                  alt=""
                                />
                              </div>
                              <div className="form-group">
                                <label className="label_form"> Email* </label>
                                <Field
                                  name="email"
                                  type="email"
                                  className="form-control input"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email || ''}
                                  placeholder="example@example.com"
                                />
                                <ErrorMessage name="email" component="span" />
                              </div>
                              <div className="btn_wrap">
                                <button
                                  type="button"
                                  className="btn btn-lg btn_login"
                                  onClick={handleSubmit}
                                  disabled={this.state.buttonDisable}
                                >
                                  {this.state.button ? 'Send Reset Link' : 'Please Wait...'}
                                </button>
                              </div>
                              <div className="wrapper_back_login">
                                <Link to="/login">Back to Login</Link>
                              </div>
                            </Form>
                          )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="login">
            <div className="login_wrap">
              <div className="logo_wrap">
                <Link to="/home" ><img src="/images/Logo_Glamplug_White.svg" alt="" /></Link>
              </div>
              <i
                className="fa fa-close close_page"
                onClick={() => {
                  this.props.history.push('/')
                }}
              ></i>
              <div className="container">
                <div className="row center_wrapper thankyou_forget_password">
                  <div className="col-md-12">
                  <div className="section__title_wrapper">
                      <h2>Reset - Password</h2>
                      <p>Send password reset instructions</p>
                    </div>
                    <div className="section__title">
                      <h2>Instructions to reset your password have been sent to {this.state.email}</h2>
                      <div className="options_wrap">
                        <Link to="/home">Go home</Link>
                        <Link to="/login">Back to Login</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
