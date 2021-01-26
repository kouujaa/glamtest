import React, {PureComponent} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from "react-router-dom"
import { message, Upload } from 'antd'
import InputMask from 'react-input-mask'
import { adminSchema } from '../../../utils/validations'
import _ from 'lodash'
import './styles.scss'


export default class AdminSignupComponent extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            profile: {
                userName:'',
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                password: '',
              },
              files:[],
              pocketPhoto:[],
              visible:false,
              value:'',
              valueError:'',
        }
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.signupPhase === 'success') {
          if (prevProps.signupuserdata && prevProps.signupuserdata.status === true ) {
            this.props.history.push('/admin/home')
          }  
          if(prevProps.signupuserdata.message){
            message.error(_.get(prevProps,'signupuserdata.message',''))
          }
        }
        if(prevProps.location.state){
          this.setState({ tabIndex : prevProps.location.state.value })
        }
        this.props.userClearPhase()
      }
    handleAdmin = async values => {
        const data = {}
        data.role = 'ADMIN'
        data.profile = {
            firstName: _.get(values, 'firstName', ''),
            lastName: _.get(values, 'lastName', ''),
            email: _.get(values, 'email', ''),
            mobile: _.get(values, 'mobile', '')
          } 
          data.userName = _.get(values, 'userName', '')
          data.password = _.get(values, 'password', '')
          data.image = this.state.pocketPhoto
          
          // console.log(data,'data')
          await this.props.signupUser(data)
    }
    handleChangeFile = ({ file, fileList }) => {
        this.setState({ fileList : fileList })
    
        let files = [file.originFileObj]
    
        var MAX_UPLOAD_SIZE=3145728
        var _URL = window.URL || window.webkitURL
        this.setState({
          files : files
        })
        let self = this
        let pocket = []
        files.forEach(file => {
          if(_.get(file,'type','')){
            if (file.type.split('/')[0] === 'image') {
              if (file.size < MAX_UPLOAD_SIZE) {
                var img = new Image()
                let reader = new FileReader()
                reader.onloadend = () => {
                  img.src = _URL.createObjectURL(file)
                  img.onload = function () {
                    pocket.push({ name: file.name, imagePreviewUrl: reader.result })
                    self.setState({ visible : true, pocketPhoto: pocket, pocketPhotoError: '' })
                    self.forceUpdate()
                  }
                }
                reader.readAsDataURL(file)
              } else {
                message.error('Please insert a file less than 3 MB!')
              }
            } else {
              // toast("File Type Invalid")
            }
          }else {
            // toast("File Type Invalid")
          }
        })
      }
    
    dummyRequest({ file, onSuccess }){
        setTimeout(() => {
          onSuccess("ok")
        }, 0)
    }
    render(){
        return(
            <div className="admin_signup">
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
                            <h2>Admin Sign up</h2>
                            <p>Create Admin Account and Get Started</p>
                            </div>
                            <div className="tabs_signup">
                                <div className="login_form">
                                    <Formik
                                    initialValues={{
                                        firstName: '',
                                        lastName: '',
                                        userName: '',
                                        email: '',
                                        password: '',
                                        mobile:''
                                    }}
                                    enableReinitialize
                                    validationSchema={adminSchema}
                                    onSubmit={this.handleAdmin}
                                    >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        setFieldValue,
                                        handleSubmit,
                                        isSubmitting
                                    })  =>
                                    ( 
                                        <Form>
                                        <div className="profile_img_wrap">
                                            <img
                                            src={this.state.visible ? this.state.pocketPhoto[0].imagePreviewUrl : "/images/profile.png"}
                                            className="profile_img"
                                            alt=""
                                            />
                                            <Upload
                                            multiple={false}
                                            showUploadList={false}
                                            // beforeUpload={this.beforeUpload.bind(this)}
                                            customRequest={this.dummyRequest.bind(this)}
                                            onChange={this.handleChangeFile.bind(this)}
                                            ><i className="fas fa-camera" ></i>
                                            </Upload>
                                        </div>
                                        <ul>
                                            <li>
                                            <div className="form-group">
                                                <label className="label_form">
                                                {' '}
                                                First Name*{' '}
                                                </label>
                                                <Field
                                                name="firstName"
                                                type="text"
                                                className="form-control input"
                                                onChange={handleChange}
                                                value={values.firstName}
                                                placeholder="First Name here"
                                                />
                                                <ErrorMessage
                                                component="span"
                                                name="firstName"
                                                // className="invalid-feedback d-block"
                                                className="error_message"
                                                />
                                            </div>
                                            </li>
                                            <li>
                                            <div className="form-group">
                                                <label className="label_form">
                                                {' '}
                                                Last Name*{' '}
                                                </label>
                                                <Field
                                                name="lastName"
                                                type="text"
                                                onChange={handleChange}
                                                value={values.lastName || ''}
                                                className="form-control input"
                                                placeholder="Last Name here"
                                                />
                                                <ErrorMessage
                                                component="span"
                                                name="lastName"
                                                className="error_message"
                                                // className="invalid-feedback d-block"
                                                />
                                            </div>
                                            </li>
                                            <li>
                                            <div className="form-group">
                                                <label className="label_form">
                                                {' '}
                                                User Name*{' '}
                                                </label>
                                                <Field
                                                name="userName"
                                                type="text"
                                                onChange={handleChange}
                                                value={values.userName || ''}
                                                className="form-control input"
                                                placeholder="User Name here"
                                                />
                                                <ErrorMessage
                                                name="userName"
                                                component="span"
                                                className="error_message"
                                                />
                                            </div>
                                            </li>
                                            <li>
                                            <div className="form-group">
                                                <label className="label_form">
                                                {' '}
                                                Email Address*{' '}
                                                </label>
                                                <Field
                                                name="email"
                                                type="email"
                                                className="form-control input"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email || ''}
                                                placeholder="example@example.com"
                                                />
                                                <ErrorMessage
                                                name="email"
                                                component="span"
                                                className="error_message"
                                                />
                                            </div>
                                            </li>
                                            <li>
                                            <div className="form-group">
                                                <label className="label_form">
                                                {' '}
                                                Phone Number*{' '}
                                                </label>
                                                <InputMask 
                                                name="mobile"
                                                mask='(999) 999-9999'
                                                className="form-control input" 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.mobile || ''}
                                                placeholder="Phone Number here"
                                                maskChar={null}
                                                beforeMaskedValueChange={this.beforeMaskedValueChange}
                                                >
                                                </InputMask>
                                                {/*<p className="error_message">{this.state.valueError ? 'Required' : ''}</p>*/}
                                                <ErrorMessage
                                                name="mobile"
                                                component="span"
                                                className="error_message"
                                                />
                                            </div>
                                            </li>
                                            <li>
                                            <div className="form-group">
                                                <label className="label_form">
                                                {' '}
                                                Password*{' '}
                                                </label>
                                                <Field
                                                name="password"
                                                type="password"
                                                onChange={handleChange}
                                                value={values.password || ''}
                                                className="form-control input"
                                                placeholder="Password here"
                                                />
                                                <ErrorMessage
                                                name="password"
                                                component="span"
                                                className="error_message"
                                                />
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="btn_wrap">
                                            <button
                                            disabled={isSubmitting}
                                            onClick={handleSubmit}
                                            type="button"
                                            className="btn btn-lg btn_login"
                                            >
                                            Create Account
                                            </button>
                                        </div>
                                        <p className="footer_login">
                                            I have an account. <a href="/login">LOGIN</a>
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
            </div>
        )
    }
}