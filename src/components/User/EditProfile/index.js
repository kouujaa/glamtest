import React, { PureComponent } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Select, Spin, message, Upload } from 'antd'
import InputMask from 'react-input-mask'
import Cookies from 'js-cookie'
import _ from 'lodash'

import { EditUserSchema } from '../../../utils/validations'
import './styles.scss'

const { Option } = Select

export default class EditProfileComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      firstName: '',
      userName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
      hairType: [],
      preferredHairStyle: [],
      HairStyleData: '',
      HairTypeData: '',
      fullPageLoading: false,
      buttonDisable: false,
      button: true,
      files:[],
      pocketPhoto:[],
      visible:false,
      previousPhoto:[]
    }
  }

  async componentDidMount() {
    this.setState({ fullPageLoading: true })
    const userToken = Cookies.get('authToken')

    if (userToken) {
      const result = await this.props.getUser(userToken)
      if (result.value.status === true) {
        this.setState({
          id: _.get(result,'value.users._id',''),
          firstName: _.get(result,'value.users.profile.firstName',''),
          lastName: _.get(result,'value.users.profile.lastName',''),
          email: _.get(result,'value.users.profile.email',''),
          mobile: _.get(result,'value.users.profile.mobile',''),
          userName: _.get(result,'value.users.userName',''),
          hairstyleServices: _.get(result,'value.users.preferredHairStyle',''),
          hairType: _.get(result,'value.users.preferredHairType',''),
          pocketPhoto:[{ imagePreviewUrl : _.get(result,'value.users.image[0].Location','') } ],
          previousPhoto: _.get(result,'value.users.image',''),
          fullPageLoading: false
        })
      }
      this.props.getSignUpData()
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.signupdataPhase === 'success') {
      this.setState({
        HairStyleData: prevProps.signupdata.hairStylist,
        HairTypeData: prevProps.signupdata.hairTypes,
      })
    }
    this.props.userClearPhase()
  }

  handle_SelectChanged = (selectGroups, setFieldValue, value) => {
    setFieldValue(value, selectGroups)
  }

  async EditUser(values) {
    this.setState({ buttonDisable : true , button : false })
    const data = {}
    data._id = this.state.id
    data.role = 'USER'
    data.profile = {
      firstName: _.get(values, 'firstName', ''),
      lastName: _.get(values, 'lastName', ''),
      email: _.get(values, 'email', ''),
      mobile: _.get(values, 'mobile', '')
    }
    data.userName = _.get(values, 'userName', '')
    data.preferredHairStyle = _.get(values, 'preferredHairStyle', '')
    data.hairType = _.get(values, 'hairType', '')
    data.image = this.state.pocketPhoto
    data.previousPhoto = this.state.previousPhoto

    const result = await this.props.EditUser(data)

    if(result.value.status === true){
      this.setState({ buttonDisable : false , button : true })
      message.success('Updated Successfully')
      setTimeout(()=>{
        this.props.history.push('/user/home')
      },2000)
    }
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
      } else {
        // toast("File Type Invalid")
      }
    })
  }

  dummyRequest({ file, onSuccess }){
    setTimeout(() => {
      onSuccess("ok")
    }, 0)
  }

  render() {
    const { HairStyleData, HairTypeData, pocketPhoto } = this.state
    // let hairStyleOption = HairStyleData && HairStyleData.map((item, index) => {
    //   return (
    //     <Option key={index} value={item.title}>{item.title}</Option>
    //   )
    // }, this)

    // let hairTypeOption = HairTypeData && HairTypeData.map((item, index) => {
    //   return (
    //     <Option key={index} value={item.title}>{item.title}</Option>
    //   )
    // }, this)
    
    return (
      <div>
        <Spin spinning={this.state.fullPageLoading}>
          <Formik
            initialValues={{
              firstName: this.state.firstName,
              userName: this.state.userName,
              lastName: this.state.lastName,
              mobile: this.state.mobile,
              email: this.state.email,
              hairType: this.state.hairType,
              preferredHairStyle: this.state.hairstyleServices,
            }}
            enableReinitialize
            validationSchema={EditUserSchema}
            onSubmit={this.EditUser.bind(this)}
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
            }) =>
              (
                <div className="edit_profile_user">
                  <div className="edit_wrap">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="section__title">
                            <h2>Edit Profile</h2>
                            <p>Edit Your Profile and Get Restarted</p>
                          </div>
                          <div className="login_form">
                            <Form>
                            <div className="profile_img_wrap">
                              <img
                                src={_.get(pocketPhoto,'[0].imagePreviewUrl','/images/profile.png')}
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
                                      disabled
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
                                      disabled
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
                                      disabled
                                      className="form-control input" 
                                      value={values.mobile || ''}
                                      onChange={handleChange}
                                      placeholder="Phone Number here"
                                    />
                                    <ErrorMessage
                                      name="mobile"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                {/* <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Hair type*{' '}
                                    </label>

                                    <Select
                                      showSearch
                                      mode="multiple"
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="select_type"
                                      onChange={selected =>
                                        this.handle_SelectChanged(
                                          selected,
                                          setFieldValue,
                                          'hairType'
                                        )
                                      }
                                      value={values.hairType}
                                    >
                                      {hairTypeOption}
                                    </Select>
                                    <ErrorMessage
                                      name="hairType"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Preferred Hairstyles*{' '}
                                    </label>
                                    <Select
                                      showSearch
                                      mode="multiple"
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      onChange={selected =>
                                        this.handle_SelectChanged(
                                          selected,
                                          setFieldValue,
                                          'preferredHairStyle'
                                        )
                                      }
                                      value={values.preferredHairStyle}
                                      className="select_type"
                                    >
                                      {hairStyleOption}
                                    </Select>
                                    <ErrorMessage
                                      name="preferredHairStyle"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li> */}
                              </ul>
                              <div className="btn_wrap">
                                <button
                                  onClick={handleSubmit}
                                  disabled={this.state.buttonDisable}
                                  type="button"
                                  className="btn btn-lg btn_edit"
                                >
                                  {this.state.button ? 'Save' : 'Please wait...'}
                               </button>
                              </div>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </Formik>
        </Spin>
      </div>
    )
  }
}
