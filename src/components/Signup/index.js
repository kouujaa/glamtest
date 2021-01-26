import React, { PureComponent } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Select, message, Upload } from 'antd'
import 'react-tabs/style/react-tabs.css'
import InputMask from 'react-input-mask'
import { Link } from "react-router-dom"
import _ from 'lodash'

import { userSchema, stylistSchema } from '../../utils/validations'
import './styles.scss'

const { Option } = Select

export default class SignupComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      profile: {
        userName:'',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        salonName: '',
        salonAddress: '',
        FreeLancer:'',
        instagramName: '',
        facebookName: '',
        website: '',
        HairStyleData: '',
        HairTypeData: '',
        LashTechData: '',
        MakeupArtistData: '',
        NailTechData: '',
        priceData:'',
        startTime:'',
        endTime:'',
        hairstyleServices: [],
        makeupArtist: [],
        nailTech: [],
        hairType:[],
        lashTech:[],
        pricePoints:[],
        preferredHairStyle:[],
        Hours : ['1','2','3','4','5','6','7','8','9','10','11','12'],
        hairServicesShow: false,
        hairStylistShow: false,
        hairTypeShow: false,
        makeupArtistShow: false,
        lashTechShow: false,
        nailTechShow: false,
      },
      files:[],
      pocketPhoto:[],
      visible:false,
      value:'',
      valueError:'',
      tabIndex: 0
    }
  }

  componentDidMount(){
    window.scrollTo(0,0)
    this.props.getSignUpData()
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.signupPhase === 'success') {
      if (prevProps.signupuserdata && prevProps.signupuserdata.status === true ) {
        this.props.history.push('/home')
      }  
      if(prevProps.signupuserdata.message){
        message.error(_.get(prevProps,'signupuserdata.message',''))
      }
    }
    if (prevProps.signUpPageDetailsPhase === 'success') {
      if(prevProps.signUpPageDetailsData.success === true){
        this.setState({ 
          HairStyleData : _.get(prevProps,'signUpPageDetailsData.hairStylist',''),
          HairTypeData : _.get(prevProps,'signUpPageDetailsData.hairTypes',''),
          MakeupArtistData: _.get(prevProps,'signUpPageDetailsData.makeupArtist',''),
          NailTechData: _.get(prevProps,'signUpPageDetailsData.nailTech',''),
          LashTechData : _.get(prevProps,'signUpPageDetailsData.lashTech',''),
          priceData : _.get(prevProps,'signUpPageDetailsData.pricePoints','')
        })
      }
    }
    if(prevProps.location.state){
      this.setState({ tabIndex : prevProps.location.state.value })
    }
    this.props.userClearPhase()
  }


  handle_adminHairTypes =  (selectGroups, setFieldValue, value) => {
    setFieldValue(value, selectGroups)
  }

  handle_SelectChanged =  (selectGroups, setFieldValue, value) => {
    setFieldValue(value, selectGroups)
  }

  handle_businessTypes = (selectGroups, setFieldValue) => {
    if(selectGroups === 'hair_stylist') {
      this.setState({
        hairServicesShow: true,
        makeupArtistShow: false,
        lashTechShow: false,
        nailTechShow: false,
      })
    }
    if(selectGroups === 'makeup_artist') {
      this.setState({
        hairStylistShow: false,
        hairTypeShow: false,
        hairServicesShow: false,
        makeupArtistShow: true,
        lashTechShow: false,
        nailTechShow: false,
      })
    }
    if(selectGroups === 'lash_tech') {
      this.setState({
        hairStylistShow: false,
        hairTypeShow: false,
        hairServicesShow: false,
        makeupArtistShow: false,
        lashTechShow: true,
        nailTechShow: false,
      })
    }
    if(selectGroups === 'nail_tech') {
      this.setState({
        hairStylistShow: false,
        hairTypeShow: false,
        hairServicesShow: false,
        makeupArtistShow: false,
        lashTechShow: false,
        nailTechShow: true,
      })
    }
    setFieldValue('businessType', selectGroups)
  }

  handle_makeupArtist = (selectGroups, setFieldValue) => {
    setFieldValue('makeupArtist', selectGroups)
  }

  handle_SelectHairChanged = (selectGroups, setFieldValue) => {
    if(selectGroups == 'hair_style'){
      this.setState({
        hairStylistShow: true,
        hairTypeShow: false,
        makeupArtistShow: false,
        lashTechShow: false,
        nailTechShow: false,
      })
    }
    if(selectGroups == 'hair_type'){
      this.setState({
        hairStylistShow: false,
        hairTypeShow: true,
        makeupArtistShow: false,
        lashTechShow: false,
        nailTechShow: false,
      })
    }
    setFieldValue('hairServices', selectGroups)
  }

  handle_nailTech = (selectGroups, setFieldValue) => {
    setFieldValue('nailTech', selectGroups)
  }

  handle_lashTech = (selectGroups, setFieldValue) => {
    setFieldValue('lashTech', selectGroups)
  }

  handleUser = async values => {
    const data = {}
    data.role = 'USER'
    data.profile = {
      firstName: _.get(values, 'firstName', ''),
      lastName: _.get(values, 'lastName', ''),
      email: _.get(values, 'email', ''),
      mobile: _.get(values, 'mobile', '')
    } 
    data.userName = _.get(values, 'userName', '')
    data.password = _.get(values, 'password', '')
    data.preferredHairStyle = _.get(values, 'preferredHairStyle', '')
    data.hairType = _.get(values, 'hairType', '')
    data.lashTech = _.get(values, 'lashTech', '')
    data.image = this.state.pocketPhoto
    
    // console.log(data,'data')
    await this.props.signupUser(data)
  }

  handleStylist = async values => {
    // console.log(values,';values')
    const data = {}
    data.role = 'STYLIST'
    data.profile = {
      firstName: _.get(values, 'firstName', ''),
      lastName: _.get(values, 'lastName', ''),
      email: _.get(values, 'email', ''),
      mobile: _.get(values, 'mobile', '')
    }
    data.password = _.get(values, 'password', '')
    data.salon = {
      salonName: _.get(values, 'salonName', ''),
      salonAddress: _.get(values, 'salonAddress', ''),
      instagramName: _.get(values, 'instagramName', ''),
      facebookName: _.get(values, 'facebookName', ''),
      website: _.get(values, 'website', '')
    }
    data.pricePoints = _.get(values, 'pricePoints', '')
    data.hairstyleServices = _.get(values, 'hairstyleServices', '')
    data.makeupArtist = _.get(values, 'makeupArtist', '')
    data.nailTech = _.get(values, 'nailTech', '')
    data.hairType = _.get(values, 'hairType', '')
    data.lashTech = _.get(values, 'lashTech', '')
    data.startTime = _.get(values, 'startTime', '')
    data.endTime = _.get(values, 'endTime', '')
    data.userName = _.get(values, 'userName', '')
    data.image = this.state.pocketPhoto
    data.freeLancer = _.get(values, 'FreeLancer', '')

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

  beforeUpload(file) {
    const isPNG = file.type === 'image/png'
    if (!isPNG) {
      message.error('You can only upload PNG file!')
      return false
    }
  }

  beforeMaskedValueChange = (newState, oldState, userInput) => {
    var { value } = newState;
    var selection = newState.selection;
    var cursorPosition = selection ? selection.start : null;
 
    // keep minus if entered by user
    if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
      if (cursorPosition === value.length) {
        cursorPosition--;
        selection = { start: cursorPosition, end: cursorPosition };
      }
      value = value.slice(0, -1);
    }
 
    return {
      value,
      selection
    };
  }

  render() {
    // console.log(this.state.pocketPhoto,'pocketPhoto')
    const { profile, HairStyleData, HairTypeData, MakeupArtistData, NailTechData, LashTechData, priceData} = this.state
    const Hours =['1','2','3','4','5','6','7','8','9','10','11','12']

    const BusinessData = [{title: 'Hair Stylist', value: 'hair_stylist'}, {title: 'Makeup Artist', value: 'makeup_artist'}, {title: 'Lash Technician', value: 'lash_tech'}, {title: 'Nail Technician', value: 'nail_tech'}]

    const HairServicesData = [{title: 'Hair Type', value: 'hair_type'}, {title: 'Hair Style', value: 'hair_style'}]
    
    let businessTypeOption = BusinessData && BusinessData.map((item, index) => {
      return (
        <Option key={index} value={item.value}>{item.title}</Option>
      )
    }, this)

    let hairServicesOption = HairServicesData && HairServicesData.map((item, index) => {
      return (
        <Option key={index} value={item.value}>{item.title}</Option>
      )
    }, this)

    let hairStyleOption = HairStyleData && HairStyleData.sort((a, b) => a.title > b.title ? 1:-1).map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    let hairTypeOption = HairTypeData && HairTypeData.sort((a, b) => a.title > b.title ? 1:-1).map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    let makeupArtistOption = MakeupArtistData && MakeupArtistData.sort((a, b) => a.title > b.title ? 1:-1).map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    let nailTechOption = NailTechData && NailTechData.sort((a, b) => a.title > b.title ? 1:-1).map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    let lashTechOption = LashTechData && LashTechData.sort((a, b) => a.title > b.title ? 1:-1).map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    let priceOption = priceData && priceData.map((item, index) => {
      return (
        <Option key={index} value={item.price}>{item.price}</Option>
      )
    }, this)

    let BusinessHours = Hours && Hours.map((item, index)=>{
      return (
        <Option key={index} value={item}>{item}</Option>
      )
    }, this)

    return (
      <div className="signup">
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
                  <h2>Sign up</h2>
                  <p>Sign up and Get Started</p>
                </div>
                <div className="tabs_signup">
                  <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                    <TabList>
                      <Tab>
                        {' '}
                        <img src="/images/user.png" alt="" /> I am a User
                      </Tab>
                      <Tab>
                        {' '}
                        <img src="/images/stylist.png" alt="" /> I am a Business
                      </Tab>
                    </TabList>
                    <TabPanel>
                      <div className="login_form">
                        <Formik
                          initialValues={{
                            firstName: '',
                            userName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            hairType: [],
                            lashTech: [],
                            preferredHairStyle: [],
                            mobile:''
                          }}
                          enableReinitialize
                          validationSchema={userSchema}
                          onSubmit={this.handleUser}
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
                                        this.handle_adminHairTypes(
                                          selected,
                                          setFieldValue
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
                                </li>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Lash Tech*{' '}
                                    </label>
                                    
                                     <Select
                                      showSearch
                                      mode="multiple"
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="select_type"
                                      onChange={selected =>
                                        this.handle_lashTech(
                                          selected,
                                          setFieldValue
                                        )
                                      }
                                      value={values.lashTech}
                                    >
                                      {lashTechOption}
                                    </Select>
                                    <ErrorMessage
                                      name="lashTech"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li> */}
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
                    </TabPanel>
                    <TabPanel>
                      <div className="login_form">
                        <Formik
                          initialValues={profile}
                          enableReinitialize
                          validationSchema={stylistSchema}
                          onSubmit={this.handleStylist}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue
                          }) => (
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
                                      onChange={handleChange}
                                      value={values.firstName || ''}
                                      className="form-control input"
                                      placeholder="First Name here"
                                    />
                                    <ErrorMessage
                                      name="firstName"
                                      component="span"
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
                                      name="lastName"
                                      component="span"
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
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Email Address*{' '}
                                    </label>
                                    <Field
                                      name="email"
                                      type="email"
                                      onChange={handleChange}
                                      value={values.email || ''}
                                      className="form-control input"
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
                                      value={values.mobile || ''}
                                      onChange={handleChange}
                                      placeholder="Phone Number here"
                                      maskChar={null}
                                      beforeMaskedValueChange={this.beforeMaskedValueChange}
                                    />
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
                                      Business Name*{' '}
                                    </label>
                                    <Field
                                      type="text"
                                      name="salonName"
                                      onChange={handleChange}
                                      value={values.salonName || ''}
                                      className="form-control input"
                                      placeholder="Business Name here"
                                    />
                                    <ErrorMessage
                                      name="salonName"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Business Address*{' '}
                                    </label>
                                    <Field
                                      type="text"
                                      name="salonAddress"
                                      onChange={handleChange}
                                      value={values.salonAddress || ''}
                                      className="form-control input"
                                      placeholder="Business Address here"
                                    />
                                    <ErrorMessage
                                      name="salonAddress"
                                      component="div"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Instagram Name*{' '}
                                    </label>
                                    <Field
                                      type="text"
                                      name="instagramName"
                                      onChange={handleChange}
                                      value={values.instagramName || ''}
                                      className="form-control input"
                                      placeholder="Instagram Name here"
                                    />
                                    <ErrorMessage
                                      name="instagramName"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Facebook Name <small>
                                        (Optional)
                                      </small>{' '}
                                    </label>
                                    <Field
                                      type="text"
                                      name="facebookName"
                                      onChange={handleChange}
                                      value={values.facebookName || ''}
                                      className="form-control input"
                                      placeholder="Facebook Name here"
                                    />
                                    <ErrorMessage
                                      name="facebookName"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Website <small>(Optional)</small>{' '}
                                    </label>
                                    <Field
                                      type="text"
                                      name="website"
                                      onChange={handleChange}
                                      value={values.website || ''}
                                      className="form-control input"
                                      placeholder="www.example.com"
                                    />
                                    <ErrorMessage
                                      name="website"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                {/* <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      FreeLancer*{' '}
                                    </label>
                                    <Select
                                      showSearch
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="select_price"
                                       onChange={selected =>
                                        this.handle_SelectChanged(
                                          selected,
                                          setFieldValue,
                                          'FreeLancer'
                                        )
                                      }
                                    >
                                    <Option key="Yes">Yes</Option>
                                      <Option key="No">No</Option>
                                    </Select>
                                    <ErrorMessage
                                      name="FreeLancer"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li> */}
                                {/* <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      HairStyle Services*{' '}
                                      <small>(Choose Multiple)</small>{' '}
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
                                          'hairstyleServices'
                                        )
                                      }
                                      value={values.hairstyleServices}
                                    >
                                      {hairStyleOption}
                                    </Select>
                                    <ErrorMessage
                                      name="hairstyleServices"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li>*/}
                                
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Business type*{' '}
                                    </label>
                                    <Select
                                      showSearch
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="business_select_type select_type"
                                      onChange={selected =>
                                        this.handle_businessTypes(
                                          selected,
                                          setFieldValue,
                                          'businessType'
                                        )
                                      }
                                      value={values.businessType}
                                    >
                                      {businessTypeOption}
                                    </Select>
                                    <ErrorMessage
                                      name="businessType"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li>
                                {this.state.hairServicesShow &&
                                <li>
                                  <div className="form-group">
                                <label className="label_form">
                                  {' '}
                                Select Type{' '}</label>
                                  <Select
                                    showSearch
                                    showArrow={true}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    className="business_select_type select_type"
                                    onChange={selected =>
                                      this.handle_SelectHairChanged(
                                        selected,
                                        setFieldValue,
                                        'hairServices'
                                      )
                                    }
                                    value={values.hairServices}
                                  >
                                    {hairServicesOption}
                                  </Select>
                                  </div>
                                </li>
                                }
                                {this.state.hairTypeShow && 
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Hair Type*{' '}<small>
                                        (Choose Multiple)
                                      </small>{' '}
                                    </label>
                                    <Select
                                      showSearch
                                      mode="multiple"
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="select_type"
                                      onChange={selected =>
                                        this.handle_adminHairTypes(
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
                                }
                                {this.state.hairStylistShow && 
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Hair Stylist*{' '}
                                      <small>(Choose Multiple)</small>{' '}
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
                                          'hairstyleServices'
                                        )
                                      }
                                      value={values.hairstyleServices}
                                    >
                                      {hairStyleOption}
                                    </Select>
                                    <ErrorMessage
                                      name="hairstyleServices"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li>
                                }
                                {this.state.makeupArtistShow && 
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Makeup Artist*{' '}
                                      <small>(Choose Multiple)</small>{' '}
                                    </label>
                                    <Select
                                      showSearch
                                      mode="multiple"
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="select_type"
                                      onChange={selected =>
                                        this.handle_makeupArtist(
                                          selected,
                                          setFieldValue,
                                          'makeupArtist'
                                        )
                                      }
                                      value={values.makeupArtist}
                                    >
                                      {makeupArtistOption}
                                    </Select>
                                    <ErrorMessage
                                      name="makeupArtist"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li>
                              }
                              {this.state.nailTechShow &&
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Nail Tech*{' '}
                                      <small>(Choose Multiple)</small>{' '}
                                    </label>
                                    <Select
                                      showSearch
                                      mode="multiple"
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="select_type"
                                      onChange={selected =>
                                        this.handle_nailTech(
                                          selected,
                                          setFieldValue,
                                          'nailTech'
                                        )
                                      }
                                      value={values.nailTech}
                                    >
                                      {nailTechOption}
                                    </Select>
                                    <ErrorMessage
                                      name="nailTech"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li>
                              }
                              {this.state.lashTechShow &&
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Lash Tech*<small>
                                        (Choose Multiple)
                                      </small>{' '}
                                    </label>
                                    
                                     <Select
                                      showSearch
                                      mode="multiple"
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="select_type"
                                      onChange={selected =>
                                        this.handle_lashTech(
                                          selected,
                                          setFieldValue
                                        )
                                      }
                                      value={values.lashTech}
                                    >
                                      {lashTechOption}
                                    </Select>
                                    <ErrorMessage
                                      name="lashTech"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li>
  }
                                {/* <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Price Points{' '}
                                    </label>
                                    {/* <Field type="text" name="pricePoints" className="form-control input" placeholder="Select" /> */}
                                    {/* <ErrorMessage name="email" component="div" /> */}
                                    {/*<Select
                                      showSearch
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="select_price"
                                       onChange={selected =>
                                        this.handle_SelectChanged(
                                          selected,
                                          setFieldValue,
                                          'pricePoints'
                                        )
                                      }
                                      values={values.pricePoints}
                                    >
                                    {priceOption}
                                    </Select>
                                    <ErrorMessage
                                      name="pricePoints"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li> */}
                              </ul>
                              <div className="btn_wrap">
                                <button
                                  disabled={isSubmitting}
                                  type="button"
                                  onClick={handleSubmit}
                                  className="btn btn-lg btn_login"
                                >
                                  Create Account
                                </button>
                              </div>
                              <p className="footer_login">
                                I Already have an account. <a href="/login">LOGIN</a>
                              </p>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
