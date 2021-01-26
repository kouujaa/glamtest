import React, { PureComponent } from 'react'
import { message } from 'antd'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { loginSchema } from '../../utils/validations'
import _ from 'lodash'
import { Link } from "react-router-dom"
import './styles.scss'

export default class LoginComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loginPhase === 'success') {
      if (prevProps.user && prevProps.user.status === true) {
        if(_.get(prevProps.user, 'user.role[0]' ,'') === 'ADMIN'){
          this.props.history.push('/admin/home')
        } 
        if(_.get(prevProps.user, 'user.role[0]' ,'') === 'STYLIST'){
          this.props.history.push('/stylist/home')
        } 
        if(_.get(prevProps.user, 'user.role[0]' ,'') === 'USER'){
          this.props.history.push('/user/home')
        }
      } else {
        message.error(prevProps.user.message)
      }
    }
    this.props.userClearPhase()
  }

  handleUser = async values => {
    await this.props.loginUser(values)
  }

  handleEnter = async(values, event) => {
    var code = event.keyCode || event.charCode
    if (code === 13){
      this.handleUser(values)
    }
  }

  render() {
    return (
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
            <div className="row">
              <div className="col-md-12">
                <div className="section__title">
                  <h2>Login</h2>
                  <p>Welcome to the Glam Plug</p>
                </div>
                <div className="login_form">
                  <Formik
                    initialValues={{
                      email: '',
                      password: ''
                    }}
                    enableReinitialize
                    validationSchema={loginSchema}
                    onSubmit={this.handleUser}
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
                          <label className="label_form"> Email * </label>
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
                        <div className="form-group">
                          <label className="label_form"> Password * </label>
                          <Field
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password || ''}
                            className="form-control input"
                            placeholder="Password here"
                            onKeyPress={this.handleEnter.bind(this, values)}
                          />
                          <ErrorMessage name="password" component="span" />
                        </div>
                        <div className="btn_wrap">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-lg btn_login"
                          >
                            Login
                          </button>
                        </div>
                        <p className="footer_login">
                          <a href="/forget-password">Forgot password</a> | Not Registered Yet?{' '}
                          <a href="/signup">SIGN UP</a>
                        </p>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
