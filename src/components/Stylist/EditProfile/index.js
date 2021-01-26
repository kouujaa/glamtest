import React, { PureComponent } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Select, Spin, message, Upload, Switch  } from 'antd'
import InputMask from 'react-input-mask'
import Dropzone from 'react-dropzone'
import Cookies from 'js-cookie'
import _ from 'lodash'

import { EditStylistSchema } from '../../../utils/validations'
import './styles.scss'

const { Option } = Select

export default class EditProfileComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      salonsData: '',
      firstName: '',
      lastName: '',
      userName:'',
      email: '',
      mobile: '',
      password: '',
      salonName: '',
      salonAddress: '',
      instagramName: '',
      facebookName: '',
      website: '',
      pricePointspricePoints: '',
      startTime: '',
      endTime: '',
      hairstyleServices: [],
      hairType: [],
      HairStyleData: '',
      HairTypeData: '',
      priceData: '',
      fullPageLoading: false,
      buttonDisable: false,
      button: true,
      files:[],
      bannerFiles: [],
      pocketPhoto:[],
      visible:false,
      salonsPicture:[],
      newSalonsPicture:[],
      bannerPicture: [],
      Hours: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      Meridian: ['AM', 'PM'] ,
      previousPhoto:[],
      FreeLancer:'',
      description:'',
      file:null,
      monday: false,
      mondayStartTime: '',
      mondayEndTime: '',
      mondayStartTimeMaridian: '',
      mondayEndTimeMaridian: '',
      tuesday: false,
      tuesdayStartTime: '',
      tuesdayEndTime: '',
      tuesdayStartTimeMaridian: '',
      tuesdayEndTimeMaridian: '',
      wednesday: false,
      wednesdayStartTime: '',
      wednesdayEndTime: '',
      wednesdayStartTimeMaridian: '',
      wednesdayEndTimeMaridian: '',
      thursday: false,
      thursdayStartTime: '',
      thursdayEndTime: '',
      thursdayStartTimeMaridian: '',
      thursdayEndTimeMaridian: '',
      friday: false,
      fridayStartTime: '',
      fridayEndTime: '',
      fridayStartTimeMaridian: '',
      fridayEndTimeMaridian: '',
      saturday: false,
      saturdayStartTime: '',
      saturdayEndTime: '',
      saturdayStartTimeMaridian: '',
      saturdayEndTimeMaridian: '',
      sunday: false,
      sundayStartTime: '',
      sundayEndTime: '',
      sundayStartTimeMaridian: '',
      sundayEndTimeMaridian: '',
    }
  }

  static propTypes = {
    // PropTypes go here
  }

  handleDescriptionChange(e){
    this.setState({ [e.target.name] : e.target.value })
  }

  handle_SelectChanged = (selectGroups, setFieldValue, value) => {
    setFieldValue(value, selectGroups)
  }

  async handleStylist(values) {
    this.setState({ buttonDisable : true , button : false })
    const data = {}
    data._id = this.state.id
    data.role = 'STYLIST'
    data.profile = {
      firstName: _.get(values, 'firstName', ''),
      lastName: _.get(values, 'lastName', ''),
      email: _.get(values, 'email', ''),
      mobile: _.get(values, 'mobile', '')
    }
    data.salon = {
      salonName: _.get(values, 'salonName', ''),
      salonAddress: _.get(values, 'salonAddress', ''),
      instagramName: _.get(values, 'instagramName', ''),
      facebookName: _.get(values, 'facebookName', ''),
      website: _.get(values, 'website', '')
    }
    data.availablity = {
      monday: {
        status: this.state.monday,
        timeSlot: [
            parseInt(_.get(values, 'mondayStartTime', ''))+' '+_.get(values, 'mondayStartTimeMaridian'), parseInt(_.get(values, 'mondayEndTime', ''))+' '+_.get(values, 'mondayEndTimeMaridian')
          ]
      },
      tuesday: {
        status: this.state.tuesday,
        timeSlot: [
          parseInt(_.get(values, 'tuesdayStartTime', ''))+' '+_.get(values, 'tuesdayStartTimeMaridian'), parseInt(_.get(values, 'tuesdayEndTime', ''))+' '+_.get(values, 'tuesdayEndTimeMaridian')
        ]
      },
      wednesday: {
        status: this.state.wednesday,
        timeSlot: [
          parseInt(_.get(values, 'wednesdayStartTime', ''))+' '+_.get(values, 'wednesdayStartTimeMaridian'), parseInt(_.get(values, 'wednesdayEndTime', ''))+' '+_.get(values, 'wednesdayEndTimeMaridian')
        ]
      },
      thursday: {
        status: this.state.thursday,
        timeSlot: [
          parseInt(_.get(values, 'thursdayStartTime', ''))+' '+_.get(values, 'thursdayStartTimeMaridian'), parseInt(_.get(values, 'thursdayEndTime', ''))+' '+_.get(values, 'thursdayEndTimeMaridian')
        ]
      },
      friday: {
        status: this.state.friday,
        timeSlot: [
          parseInt(_.get(values, 'fridayStartTime', ''))+' '+_.get(values, 'fridayStartTimeMaridian'), parseInt(_.get(values, 'fridayEndTime', ''))+' '+_.get(values, 'fridayEndTimeMaridian')
        ]
      },
      saturday: {
        status: this.state.saturday,
        timeSlot: [
          parseInt(_.get(values, 'saturdayStartTime', ''))+' '+_.get(values, 'saturdayStartTimeMaridian'), parseInt(_.get(values, 'saturdayEndTime', ''))+' '+_.get(values, 'saturdayEndTimeMaridian')
        ]
      },
      sunday: {
        status: this.state.sunday,
        timeSlot: [
          parseInt(_.get(values, 'sundayStartTime', ''))+' '+_.get(values, 'sundayStartTimeMaridian'), parseInt(_.get(values, 'sundayEndTime', ''))+' '+_.get(values, 'sundayEndTimeMaridian')
        ]
      }
    }
    data.pricePoints = _.get(values, 'pricePoints', '')
    data.hairstyleServices = _.get(values, 'hairstyleServices', '')
    data.hairType = _.get(values, 'hairType', '')
    data.startTime = _.get(values, 'startTime', '')
    data.endTime = _.get(values, 'endTime', '')
    data.userName = _.get(values, 'userName', '')
    data.image = this.state.pocketPhoto
    data.previousPhoto = this.state.previousPhoto
    data.salonsPicture = this.state.salonsPicture
    data.newSalonsPicture = this.state.newSalonsPicture
    data.bannerPicture = this.state.bannerPicture

    if(this.state.description){
      data.description = this.state.description
    }

    //console.log(data,'data')
    
    const result = await this.props.EditSalons(data)
    if(result.value.status === true){
      this.setState({ buttonDisable : false , button : true })
      message.success('Updated Successfully')
      setTimeout(()=>{
        this.props.history.push('/stylist/home')
      },2000)
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.signupdataPhase === 'success') {
      this.setState({
        HairStyleData: prevProps.signupdata.hairStylist,
        HairTypeData: prevProps.signupdata.hairTypes,
        priceData: prevProps.signupdata.pricePoints
      })
    }
    this.props.userClearPhase()
  }

  async componentDidMount() {
    this.setState({ fullPageLoading :true })
    const salonsToken = Cookies.get('authToken')

    if (salonsToken) {
      const result = await this.props.getSalonsDataById(salonsToken)
      if (result.value.status === true) {
        this.setState({
          id: _.get(result,'value.salons._id',''),
          firstName: _.get(result,'value.user.profile.firstName',''),
          lastName: _.get(result,'value.user.profile.lastName',''),
          userName: _.get(result,'value.salons.userName',''),
          email: _.get(result,'value.salons.email',''),
          mobile: _.get(result,'value.salons.mobile',''),
          salonName: _.get(result,'value.salons.salonName',''),
          salonAddress: _.get(result,'value.salons.salonAddress',''),
          instagramName: _.get(result,'value.salons.instagramName',''),
          facebookName: _.get(result,'value.salons.facebookName',''),
          website: _.get(result,'value.salons.website',''),
          pricePoints: _.get(result,'value.salons.pricePoints',''),
          startTime: _.get(result,'value.salons.startTime',''),
          endTime: _.get(result,'value.salons.endTime',''),
          hairstyleServices: _.get(result,'value.salons.hairstyleServices',''),
          hairType: _.get(result,'value.salons.hairType',''),
          pocketPhoto:[{ imagePreviewUrl : _.get(result,'value.salons.profilePicture[0].Location','') }],
          previousPhoto: _.get(result,'value.salons.profilePicture',''),
          salonsPicture:_.get(result,'value.salons.SalonsImage',''),
          newSalonsPicture: _.get(result,'value.salons.SalonsImage',''),
          bannerPicture: _.get(result,'value.salons.bannerImage',''),
          FreeLancer:_.get(result,'value.salons.FreeLancer',''),
          description:_.get(result,'value.salons.description',''),
          monday:_.get(result,'value.salons.availablity.monday.status',''),
          mondayStartTime: _.get(result,'value.salons.availablity.monday.timeSlot[0]',''),
          mondayEndTime: _.get(result,'value.salons.availablity.monday.timeSlot[1]',''),
          tuesday:_.get(result,'value.salons.availablity.tuesday.status',''),
          tuesdayStartTime: _.get(result,'value.salons.availablity.tuesday.timeSlot[0]',''),
          tuesdayEndTime: _.get(result,'value.salons.availablity.tuesday.timeSlot[1]',''),
          wednesday:_.get(result,'value.salons.availablity.wednesday.status',''),
          wednesdayStartTime: _.get(result,'value.salons.availablity.wednesday.timeSlot[0]',''),
          wednesdayEndTime: _.get(result,'value.salons.availablity.wednesday.timeSlot[1]',''),
          thursday:_.get(result,'value.salons.availablity.thursday.status',''),
          thursdayStartTime: _.get(result,'value.salons.availablity.thursday.timeSlot[0]',''),
          thursdayEndTime: _.get(result,'value.salons.availablity.thursday.timeSlot[1]',''),
          friday:_.get(result,'value.salons.availablity.friday.status',''),
          fridayStartTime: _.get(result,'value.salons.availablity.friday.timeSlot[0]',''),
          fridayEndTime: _.get(result,'value.salons.availablity.friday.timeSlot[1]',''),
          saturday:_.get(result,'value.salons.availablity.saturday.status',''),
          saturdayStartTime: _.get(result,'value.salons.availablity.saturday.timeSlot[0]',''),
          saturdayEndTime: _.get(result,'value.salons.availablity.saturday.timeSlot[1]',''),
          sunday:_.get(result,'value.salons.availablity.sunday.status',''),
          sundayStartTime: _.get(result,'value.salons.availablity.sunday.timeSlot[0]',''),
          sundayEndTime: _.get(result,'value.salons.availablity.sunday.timeSlot[1]',''),
          fullPageLoading: false
        })
      }
      this.props.getSignUpData()
    }
  }



  handleChangeFile = ({ file, fileList }) => {
    this.setState({ fileList : fileList })

    let files = [file.originFileObj]

    // this.setState({ pocketPhoto : [file] })

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
                //pocket.push({ name: file.name, imagePreviewUrl: reader.result })
                pocket.push({ name: file.name, Location: reader.result })
                self.setState({ visible : true, pocketPhoto: pocket, pocketPhotoError: '', })
                self.forceUpdate()
              }
            }
            reader.readAsDataURL(file)
          } else {
            alert('Please insert a file less than 3 MB!')
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

  beforeUpload(file) {
    const isPNG = file.type === 'image/png'
    if (!isPNG) {
      message.error('You can only upload PNG file!')
      return false
    }
  }

  async collectionOfImage(files){
    var MAX_UPLOAD_SIZE=3145728
    var _URL = window.URL || window.webkitURL
    this.setState({
      files 
    })
    let self = this
    let pocket = []
    this.state.newSalonsPicture.map(image => {
      pocket.push({name: image.name, Location: image.Location})
    })
    files.forEach(file => {
      if (file.type.split('/')[0] === 'image') {
        if (file.size < MAX_UPLOAD_SIZE) {
          var img = new Image()
          let reader = new FileReader()
          reader.onloadend = () => {
            img.src = _URL.createObjectURL(file)
            img.onload = function () {
              //pocket.push({ name: file.name, imagePreviewUrl: reader.result })
              pocket.push({ name: file.name, Location: reader.result })

              self.setState({ visible: true, newSalonsPicture: pocket, pocketPhotoError: '' })
              self.forceUpdate()
            }
          }
          reader.readAsDataURL(file)
        } else {
          alert('Please insert a file less than 3 MB!')
        }
      } else {
        // toast("File Type Invalid")
      }
    })
  }

  async collectionOfBanner(bannerFiles){
    var MAX_UPLOAD_SIZE=3145728
    var _URL = window.URL || window.webkitURL
    this.setState({
      bannerFiles 
    })
    let self = this
    let bannerpocket = []
    bannerFiles.forEach(file => {
      if (file.type.split('/')[0] === 'image') {
        if (file.size < MAX_UPLOAD_SIZE) {
          var img = new Image()
          let reader = new FileReader()
          reader.onloadend = () => {
            img.src = _URL.createObjectURL(file)
            img.onload = function () {
              if(this.width >= 1200 && this.height >= 500){
                bannerpocket.push({ name: file.name, Location: reader.result })
                self.setState({ visible: true, bannerPicture: bannerpocket, pocketPhotoError: '' })
                self.forceUpdate()
              }else{
                message.warn('Banner image size should be 1200*575 at least')
              }
            }
          }
          reader.readAsDataURL(file)
        } else {
          alert('Please insert a file less than 3 MB!')
        }
      } 
    })
  }

  deleteImage(value, id){
    const { salonsPicture, newSalonsPicture } = this.state

    if(value === 'previous'){

      let myArray = salonsPicture.filter(function( obj ) {
        return obj.ETag !== id
      })
      this.setState({ salonsPicture : myArray })
    
    } else{
      
      let myArray = newSalonsPicture.filter(function( obj ) {
        return obj.name !== id
      })
      this.setState({ newSalonsPicture : myArray })
    
    }
  }
  deleteBannerImage(value, id){
    const { bannerPicture } = this.state
    let myArray = bannerPicture.filter(function( obj ) {
      return obj.name !== id
    })
    this.setState({ bannerPicture : myArray })
  }

  updateMonDay(name, status){
    if(status===true){
      this.setState({monday: true})
    }else if(status===false){
      this.setState({monday: false})
    }
  }
  updateTuesDay(name,status){
    if(status===true){
      this.setState({ tuesday: true })
    }else if(status===false){
      this.setState({ tuesday: false })
    }
  }
  updateWednesDay(name, status){
    if(status===true){
      this.setState({ wednesday: true })
    }else if(status===false){
      this.setState({ wednesday: false })
    }
  }

  updateThursDay(name, status){
    if(status===true){
      this.setState({ thursday: true })
    }else if(status===false){
      this.setState({ thursday: false })
    }
  }

  updateFriDay(name, status){
    if(status===true){
      this.setState({friday: true})
    }else if(status===false){
      this.setState({friday: false})
    }
  }

  updateSaturDay(name, status){
    if(status===true){
      this.setState({saturday: true})
    }else if(status===false){
      this.setState({saturday: false})
    }
  }

  updateSunDay(name, status){
    if(status===true){
      this.setState({sunday: true})
    }else if(status===false){
      this.setState({sunday: false})
    }
  }

  render() {
    const { 
      HairStyleData, 
      HairTypeData, 
      priceData, 
      pocketPhoto, 
      salonsPicture, 
      newSalonsPicture,
      bannerPicture,
      Hours,
      Meridian } = this.state

    let hairStyleOption = HairStyleData && HairStyleData.map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    let hairTypeOption = HairTypeData && HairTypeData.map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    let priceOption = priceData && priceData.map((item, index) => {
      return (
        <Option key={index} value={item.price}>{item.price}</Option>
      )
    }, this)

    let BusinessHours = Hours && Hours.map((item, index) => {
      return (
        <Option key={index} value={item}>{item}</Option>
      )
    }, this)

    let BusinessMeridian = Meridian && Meridian.map((item, index) => {
      return (
        <Option key={index} value={item}>{item}</Option>
      )
    }, this)

    return (
      <div>
        <Spin spinning={this.state.fullPageLoading}>
          <div className="edit_profile_stylist">
            <div className="edit_wrap">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="section__title">
                      <h2>Edit Profile</h2>
                      <p>Edit Your Profile and Get Restarted</p>
                    </div>
                    <div className="login_form">
                      <Formik
                        initialValues={{
                          firstName: this.state.firstName,
                          lastName: this.state.lastName,
                          userName: this.state.userName,
                          email: this.state.email,
                          mobile: this.state.mobile,
                          password: this.state.password,
                          salonName: this.state.salonName,
                          salonAddress: this.state.salonAddress,
                          instagramName: this.state.instagramName,
                          facebookName: this.state.facebookName,
                          website: this.state.website,
                          startTime: this.state.startTime,
                          endTime: this.state.endTime,
                          mondayStartTime: this.state.mondayStartTime.split(" ")[0],
                          mondayEndTime: this.state.mondayEndTime.split(" ")[0],
                          mondayStartTimeMaridian: this.state.mondayStartTime.split(" ")[1],
                          mondayEndTimeMaridian: this.state.mondayEndTime.split(" ")[1],
                          tuesdayStartTime: this.state.tuesdayStartTime.split(" ")[0],
                          tuesdayEndTime: this.state.tuesdayEndTime.split(" ")[0],
                          tuesdayStartTimeMaridian: this.state.tuesdayStartTime.split(" ")[1],
                          tuesdayEndTimeMaridian: this.state.tuesdayEndTime.split(" ")[1],
                          wednesdayStartTime: this.state.wednesdayStartTime.split(" ")[0],
                          wednesdayEndTime: this.state.wednesdayEndTime.split(" ")[0],
                          wednesdayStartTimeMaridian: this.state.wednesdayStartTime.split(" ")[1],
                          wednesdayEndTimeMaridian: this.state.wednesdayEndTime.split(" ")[1],
                          thursdayStartTime: this.state.thursdayStartTime.split(" ")[0],
                          thursdayEndTime: this.state.thursdayEndTime.split(" ")[0],
                          thursdayStartTimeMaridian: this.state.thursdayStartTime.split(" ")[1],
                          thursdayEndTimeMaridian: this.state.thursdayEndTime.split(" ")[1],
                          fridayStartTime: this.state.fridayStartTime.split(" ")[0],
                          fridayEndTime: this.state.fridayEndTime.split(" ")[0],
                          fridayStartTimeMaridian: this.state.fridayStartTime.split(" ")[1],
                          fridayEndTimeMaridian: this.state.fridayEndTime.split(" ")[1],
                          saturdayStartTime: this.state.saturdayStartTime.split(" ")[0],
                          saturdayEndTime: this.state.saturdayEndTime.split(" ")[0],
                          saturdayStartTimeMaridian: this.state.saturdayStartTime.split(" ")[1],
                          saturdayEndTimeMaridian: this.state.saturdayEndTime.split(" ")[1],
                          sundayStartTime: this.state.sundayStartTime.split(" ")[0],
                          sundayEndTime: this.state.sundayEndTime.split(" ")[0],
                          sundayStartTimeMaridian: this.state.sundayStartTime.split(" ")[1],
                          sundayEndTimeMaridian: this.state.sundayEndTime.split(" ")[1],
                          hairstyleServices: this.state.hairstyleServices,
                          hairType: this.state.hairType,
                          pricePoints: this.state.pricePoints,
                        }}
                        enableReinitialize
                        validationSchema={EditStylistSchema}
                        onSubmit={this.handleStylist.bind(this)}
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
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Salon Name*{' '}
                                    </label>
                                    <Field
                                      type="text"
                                      name="salonName"
                                      onChange={handleChange}
                                      value={values.salonName || ''}
                                      className="form-control input"
                                      placeholder="Salon Name here"
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
                                      Salon Address*{' '}
                                    </label>
                                    <Field
                                      type="text"
                                      name="salonAddress"
                                      onChange={handleChange}
                                      value={values.salonAddress || ''}
                                      className="form-control input"
                                      placeholder="Salon Address here"
                                    />
                                    <ErrorMessage
                                      name="salonAddress"
                                      component="div"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                {/* <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Business Hours*{' '}
                                    </label>
                                    
                                    <div className="select_wrap">
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'startTime'
                                          )
                                        }
                                        value={values.startTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="startTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      am
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'endTime'
                                          )
                                        }
                                        value={values.endTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="endTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      pm
                                    </div>
                                  </div>
                                </li> */}
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
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      HairStyle Services{' '}
                                      <small>(Choose Multiple)</small>{' '}
                                    </label>
                                    <Select
                                      showSearch
                                      mode="multiple"
                                      maxTagCount={1}
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
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Hair type <small>
                                        (Choose Multiple)
                                      </small>{' '}
                                    </label>
                                    <Select
                                      showSearch
                                      mode="multiple"
                                      maxTagCount={1}
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
                                      Price Points{' '}
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
                                          'pricePoints'
                                        )
                                      }
                                      value={[values.pricePoints]}
                                    >
                                      {priceOption}
                                    </Select>
                                    {/* <ErrorMessage
                                      name="pricePoints"
                                      component="span"
                                      className="error_message"
                                    /> */}
                                  </div>
                                </li>
                                <li></li>
                                <li>
                                  <div className="form-group time-group">
                                    <label className="label_form">
                                      {' '}
                                      Monday Hours*{' '}
                                    </label>
                                    <Switch checked={this.state.monday} onChange={this.updateMonDay.bind(this,'Monday')} />
                                  {this.state.monday &&  
                                    <div className="select_wrap">
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'mondayStartTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.mondayStartTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="mondayStartTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="AM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'mondayStartTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.mondayStartTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'mondayEndTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.mondayEndTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="mondayEndTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="PM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'mondayEndTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.mondayEndTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                    </div>
                                  }
                                  </div>
                                </li>

                                <li>
                                  <div className="form-group time-group">
                                    <label className="label_form">
                                      {' '}
                                      Tuesday Hours*{' '}
                                    </label>
                                    <Switch checked={this.state.tuesday} onChange={this.updateTuesDay.bind(this,'Tuesday')} />
                                    {this.state.tuesday &&
                                    <div className="select_wrap">
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'tuesdayStartTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.tuesdayStartTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="tuesdayStartTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="AM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'tuesdayStartTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.tuesdayStartTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'tuesdayEndTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.tuesdayEndTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="tuesdayEndTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="PM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'tuesdayEndTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.tuesdayEndTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                    </div>
                                  }
                                  </div>
                                </li>

                                <li>
                                  <div className="form-group time-group">
                                    <label className="label_form">
                                      {' '}
                                      Wednesday Hours*{' '}
                                    </label>
                                    <Switch checked={this.state.wednesday} onChange={this.updateWednesDay.bind(this,'Wednesday')} />
                                    {this.state.wednesday &&
                                    <div className="select_wrap">
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'wednesdayStartTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.wednesdayStartTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="wednesdayStartTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="AM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'wednesdayStartTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.wednesdayStartTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'wednesdayEndTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.wednesdayEndTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="wednesdayEndTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="PM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'wednesdayEndTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.wednesdayEndTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                    </div>
                                    }
                                  </div>
                                </li>
                                
                                <li>
                                  <div className="form-group time-group">
                                    <label className="label_form">
                                      {' '}
                                      Thursday Hours*{' '}
                                    </label>
                                    <Switch checked={this.state.thursday} onChange={this.updateThursDay.bind(this,'Thursday')} />
                                    {this.state.thursday &&
                                    <div className="select_wrap">
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'thursdayStartTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.thursdayStartTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="thursdayStartTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="AM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'thursdayStartTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.thursdayStartTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'thursdayEndTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.thursdayEndTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="thursdayEndTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="PM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'thursdayEndTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.thursdayEndTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                    </div>
                                  }
                                  </div>
                                </li>

                                <li>
                                  <div className="form-group time-group">
                                    <label className="label_form">
                                      {' '}
                                      Friday Hours*{' '}
                                    </label>
                                    <Switch checked={this.state.friday} onChange={this.updateFriDay.bind(this,'Friday')} />
                                    {this.state.friday &&
                                    <div className="select_wrap">
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'fridayStartTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.fridayStartTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="fridayStartTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="AM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'fridayStartTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.fridayStartTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'fridayEndTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.fridayEndTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="fridayEndTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="PM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'fridayEndTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.fridayEndTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                    </div>
                                  }
                                  </div>
                                </li>
                                
                                <li>
                                  <div className="form-group time-group">
                                    <label className="label_form">
                                      {' '}
                                      Saturday Hours*{' '}
                                    </label>
                                    <Switch checked={this.state.saturday} onChange={this.updateSaturDay.bind(this,'Saturday')} />
                                    {this.state.saturday &&
                                    <div className="select_wrap">
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'saturdayStartTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.saturdayStartTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="saturdayStartTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="AM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'saturdayStartTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.saturdayStartTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'saturdayEndTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.saturdayEndTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="saturdayEndTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="PM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'saturdayEndTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.saturdayEndTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                    </div>
                                    }
                                  </div>
                                </li>
                                
                                <li>
                                  <div className="form-group time-group">
                                    <label className="label_form">
                                      {' '}
                                      Sunday Hours*{' '}
                                    </label>
                                    <Switch checked={this.state.sunday} onChange={this.updateSunDay.bind(this,'Sunday')} />
                                    { this.state.sunday &&
                                    <div className="select_wrap">
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'sundayStartTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.sundayStartTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="sundayStartTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="AM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'sunsdayStartTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.sundayStartTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="6"
                                        optionFilterProp="children"
                                        className="select_hours"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'sundayEndTime'
                                          )
                                        }
                                        defaultValue = {'00'}
                                        value={values.sundayEndTime}
                                      >
                                        {BusinessHours}
                                      </Select>
                                      <ErrorMessage
                                        name="sundayEndTime"
                                        component="span"
                                        className="error_message"
                                      />
                                      <Select
                                        showSearch
                                        showArrow={true}
                                        placeholder="PM"
                                        optionFilterProp="children"
                                        className="select_hours select_hours_maridian"
                                        onChange={selected =>
                                          this.handle_SelectChanged(
                                            selected,
                                            setFieldValue,
                                            'sundayStartTimeMaridian'
                                          )
                                        }
                                        defaultValue = {'AM'}
                                        value={values.sundayStartTimeMaridian}
                                      >
                                        {BusinessMeridian}
                                      </Select>
                                    </div>
                                  }
                                  </div>
                                </li>
                                </ul>
                                  <div className="form-group textarea_wrap">
                                    <label className="label_form">
                                      {' '}
                                      Description{' '}
                                    </label>
                                    <textarea
                                      name="description"
                                      className="textarea_edit_profile"
                                      value={this.state.description}
                                      onChange={this.handleDescriptionChange.bind(this)}
                                    >
                                    </textarea>
                                  </div>
                              <div>
                                <Dropzone 
                                  onDrop={this.collectionOfImage.bind(this)}
                                  multiple={true}
                                  >
                                  {({getRootProps, getInputProps}) => (
                                    <section>
                                      <div className="outline_wrap" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className="upload_file_wrap">Upload File</p>
                                      </div>
                                    </section>
                                  )}
                                </Dropzone>
                              </div>
                              <div className="upload_images_wrap_edit">
                              {/* {salonsPicture && salonsPicture.map((val,i)=>{
                                return(
                                  <div key={i}>
                                    <img src={val.Location} alt="Card" key={i} />
                                    <p onClick={this.deleteImage.bind(this, 'previous', val.ETag)}>Remove</p>
                                  </div>
                                )
                              })} */}
                              {newSalonsPicture && newSalonsPicture.map((val,i)=>{
                                return(
                                  <div key={i}>
                                    <img src={val.Location} alt="Card" key={i} />
                                     <p onClick={this.deleteImage.bind(this, 'new', val.name)}>Remove</p>
                                  </div>
                                )
                              })}
                              </div>
                              {/*upload banner */}
                              <div>
                                <Dropzone 
                                  onDrop={this.collectionOfBanner.bind(this)}
                                  multiple={false}
                                  >
                                  {({getRootProps, getInputProps}) => (
                                    <section>
                                      <div className="outline_wrap" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className="upload_file_wrap">Upload Banner</p>
                                      </div>
                                    </section>
                                  )}
                                </Dropzone>
                              </div>
                              {/*banner preview */}
                              <div className="upload_images_wrap_edit">
                              {bannerPicture && bannerPicture.map((val,i)=>{
                                return(
                                  <div key={i}>
                                    <img src={val.Location} alt="Card" key={i} />
                                     <p onClick={this.deleteBannerImage.bind(this, 'new', val.name)}>Remove</p>
                                  </div>
                                )
                              })}
                              </div>
                              <div className="btn_wrap">
                                <button
                                  type="button"
                                  onClick={handleSubmit}
                                  disabled={this.state.buttonDisable}
                                  className="btn btn-lg btn_edit"
                                >
                                  {this.state.button ? 'Save' : 'Please wait...'}
                                </button>
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
        </Spin>
      </div>
    )
  }
}
