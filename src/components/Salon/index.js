import React, { PureComponent } from 'react'
import { Collapse, Modal, Rate, Spin, message, Button, Upload, Carousel } from 'antd'
import Icon from '@ant-design/icons' 
import { Formik, Form, Field } from 'formik'
import Cookies from 'js-cookie'
import _ from 'lodash'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import './styles.scss'
import $ from 'jquery'
const { Panel } = Collapse
let total = 0
export default class SalonComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      writeReviewVisible: false,
      salonsDetails:'',
      fullPageLoading:true,
      rating:0,
      review:'',
      count:9,
      service:[],
      isSubmitting: true,
      addDateVisible:false,
      gotoCart: false,
      startDate: '',
      minTimes: '',
      maxTimes: '',
      disableTime: false,
      totalPrice: '',
      favorite: true,
      booking_name: '',
      booking_mobile: '',
      booking_email: '',
      fileList: [],
      files: [],
      pocketPhoto:[],
      imageUrl: ''
    }
        this.handleChange = this.handleChange.bind(this)
  }

  onChange(name, value, e){
    this.setState({ [name] : value })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async componentDidMount(){
    const userToken = Cookies.get('authToken')
    window.scrollTo(0,0)
    const salon_id = this.props.match.params.id
    const data = {
      id : salon_id
    }

    const result = await this.props.getSalonsDetailById(data)
    if(result.value.status === true){
      let cd = new Date()
      let weekday = new Array(7)
      weekday[0] = "sunday"
      weekday[1] = "monday"
      weekday[2] = "tuesday"
      weekday[3] = "wednesday"
      weekday[4] = "thursday"
      weekday[5] = "friday"
      weekday[6] = "saturday"
      let today = weekday[cd.getDay()]
      if(result.value.salon.availablity && result.value.salon.availablity[today].status===true){
        let mx, min
        mx = result.value.salon.availablity[today].timeSlot[1].split(" ")[1]==='PM' ? parseInt(result.value.salon.availablity[today].timeSlot[1].split(" ")[0]) + 12 : parseInt(result.value.salon.availablity[today].timeSlot[1].split(" ")[0])

        min = result.value.salon.availablity[today].timeSlot[0].split(" ")[1]==='PM' ? parseInt(result.value.salon.availablity[today].timeSlot[0].split(" ")[0]) + 12 : parseInt(result.value.salon.availablity[today].timeSlot[0].split(" ")[0])

        this.setState({
          startDate: setHours(setMinutes(new Date(), 0), min),
          minTimes: setHours(setMinutes(new Date(), 0), min),
          maxTimes: setHours(setMinutes(new Date(), 0), mx),
          disableTime: false
        })
      }else{
        this.setState({ disableTime: true })
      }
      if(userToken){
        const favdata = {
          id : salon_id,
          userToken: userToken
        }
        const results = await this.props.getFavoriteSalonById(favdata)
        if(results.value.status === true && results.value.favsalon.length > 0){
          this.setState({favorite: false})
        }
      }
      this.setState({
        salonsDetails : result.value.salon,
        fullPageLoading: false
      })
    }



    // $(".show-img").onClick(() => {
    //   $(".image-show").show();
    // })

    // $(".hide-icon-btn").onClick(() => {
    //   $(".image-show").hide();
    // })




  }

  callback = (key) => {
    // console.log(key)
  }

  async submitRating(){
    this.setState({ fullPageLoading: true })
    const userToken = Cookies.get('authToken')
    const data = {
      userToken : userToken,
      rating : this.state.rating,
      review : this.state.review,
      salonId : this.state.salonsDetails._id,
      image: this.state.imageUrl,
    }

    const salon_id = this.props.match.params.id
    const NewData = {
      id : salon_id
    }

    const result = await this.props.addNewRating(data)
    if(result.value.status === true){
      const results = await this.props.UpgradeSalonsNewRating(data)
      if(results.value.status === true){
        const upgradeSalons = await this.props.getSalonsDetailById(NewData)
        if(upgradeSalons.value.status === true){
          this.setState({
            salonsDetails : upgradeSalons.value.salon,
            fullPageLoading: false,
            writeReviewVisible: false,
            rating:0,
            review:''
          })
        }
      }
    }
  }

  OpenReviewModal(e){
    e.stopPropagation()
    const userToken = Cookies.get('authToken')
    if(userToken){
      this.setState({ writeReviewVisible: true })
    } else {
      this.props.history.push("/login")
    }
  }

  async AddBookingDate(e){
    e.stopPropagation()
    const userToken = Cookies.get('authToken')
    if(userToken){
      const result = await this.props.getUser(userToken)
      this.setState({
        booking_name: _.get(result, 'value.users.userName', ''),
        booking_email: _.get(result, 'value.users.profile.email', ''),
        booking_mobile: _.get(result, 'value.users.profile.mobile', ''),
        addDateVisible: true
      })
    } else {
      this.props.history.push("/login")
    }
  }

  selectBookingDate = (date) => {
      let weekday = new Array(7)
      weekday[0] = "sunday"
      weekday[1] = "monday"
      weekday[2] = "tuesday"
      weekday[3] = "wednesday"
      weekday[4] = "thursday"
      weekday[5] = "friday"
      weekday[6] = "saturday"
      let today = weekday[date.getDay()]
      if(this.state.salonsDetails.availablity[today].status===true){
        let mx, min
        mx = this.state.salonsDetails.availablity[today].timeSlot[1].split(" ")[1]==='PM' ? parseInt(this.state.salonsDetails.availablity[today].timeSlot[1].split(" ")[0]) + 12 : parseInt(this.state.salonsDetails.availablity[today].timeSlot[1].split(" ")[0])

        min = this.state.salonsDetails.availablity[today].timeSlot[0].split(" ")[1]==='PM' ? parseInt(this.state.salonsDetails.availablity[today].timeSlot[0].split(" ")[0]) + 12 : parseInt(this.state.salonsDetails.availablity[today].timeSlot[0].split(" ")[0])

        this.setState({
          startDate: date,
          minTimes: setHours(setMinutes(new Date(), 0), min),
          maxTimes: setHours(setMinutes(new Date(), 0), mx),
          disableTime: false
        })
      }else{
        message.warning('The salon is off on the selected day. Please Select another day for booking')
        this.setState({ disableTime: true })
      }
    //this.setState({startDate: date})
  }

  handleCheckbox(id,name,description,price, e){
    let serviceItems = this.state.service
    if(e.target.checked===true){
      let verify = serviceItems.includes(id)
      if(verify === true){
         let index = serviceItems.indexOf(id)
         if(index > -1){
          serviceItems.splice(index,1)
         }
      }else{
        total += parseInt(price)
        serviceItems.push({id,name,description,price})
      }
      this.setState({service: serviceItems, totalPrice: total})
    }else if(e.target.checked===false){
      serviceItems.splice(id, 1)
    }
  }

  async AddBooking(){
    const {service, startDate} = this.state
    const userToken = Cookies.get('authToken')
    if(service.length > 0 && startDate !== ''){
      if(this.state.booking_name !== '' && this.state.booking_mobile !== '' && this.state.booking_email !== ''){
        this.setState({ fullPageLoading: true })
      const data = {
        service: service,
        bookingName: this.state.booking_name,
        bookingMobile: this.state.booking_mobile,
        bookingEmail: this.state.booking_email,
        bookingDate: startDate,
        salonId: this.state.salonsDetails._id,
        salon_user: this.state.salonsDetails.userId[0],
        salonName: this.state.salonsDetails.salonName ,
        userToken: userToken,
        totalPrice: this.state.totalPrice
      }
      Cookies.set('cartData', data)
      message.success('Your service has been added in cart. Go to checkout')
      this.setState({
        gotoCart: true,
        fullPageLoading: false,
        addDateVisible: false,
        service: [],
        //startDate: setHours(setMinutes(new Date(), 0), 10)
      })
      //this.props.addToCart(data)
      // const result = await this.props.addservicebooking(data)
      // if(result.value.status===true){
      //   message.success(result.value.message)
      //   this.setState({
      //     fullPageLoading: false,
      //     addDateVisible: false,
      //     service: [],
      //     startDate: setHours(setMinutes(new Date(), 0), 10),
      //   })
      // }
    }else{
      message.error('Booking fields are missing.')
    }
  }
  }

  favorite = async(fav) => {
    const userToken = Cookies.get('authToken')
    if(userToken){
      this.setState({ fullPageLoading: true })
      const data = {
        userToken : userToken,
        salonId : this.state.salonsDetails._id,
        salonName: this.state.salonsDetails.salonName,
        favorite: fav
      }
      const result = await this.props.addSalonFavorite(data)
        if(result.value.status === true){
          this.setState({ fullPageLoading: false })
          this.setState({favorite: !this.state.favorite})
          message.success(result.value.message)
        }
      // if(fav==='favorite'){
      //   const result = await this.props.addSalonFavorite(data)
      //   if(result.value.status == true){
      //     this.setState({ fullPageLoading: false })
      //     this.setState({favorite: !this.state.favorite})
      //     message.success(result.value.message)
      //   }
      // }else if(fav==='unfavorite'){
      //   const result = await this.props.removeSalonFavorite(data)
      //   this.setState({ fullPageLoading: false })
      //   console.log(fav)
      // }
    } else {
      this.props.history.push("/login")
    }
  }

  loadReview(){
    const NewCount = this.state.count + 10
    this.setState({ count : NewCount })
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChangeFile = ({ file, fileList}) => {
    const arr = [fileList.slice(-1)[0]]
    this.setState({fileList: arr})
    let files = [file.originFileObj]
    var MAX_UPLOAD_SIZE = 2145728
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
                self.setState({ pocketPhoto: pocket, pocketPhotoError: '' })
                self.setState({ imageUrl: reader.result })
                self.forceUpdate()
              }
            }
            reader.readAsDataURL(file)
          }
        }
      }
    })
  }

  zoomImage = (img) => {
    $(".show").fadeIn();
    $(".img-show img").attr("src", img);
  }

  hideZoom = () => {
    $(".show").fadeOut();
  }

  showImage = (i,img) => {

      console.log("clicked on image",img)
      $(".image-show").hide();
      $(`#imgs${i}`).attr("src", img);
      $(`#image-show${i}`).show();


  }


  hideImage = () => {
    $(".image-show").hide();
  }

  render() {
    const { salonsDetails, service, favorite, fileList, minTimes, maxTimes, startDate } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const contentStyle = {
      width: '35%',
      height: '160px',
    };

    let salonImage = salonsDetails.SalonsImage && salonsDetails.SalonsImage.map((image, i) => {
      return(
        <div key={i} style={contentStyle}>
          <img src={image.Location} alt="salon" />
        </div>
      )
    })
    return (
      <div>
        <Spin spinning={this.state.fullPageLoading}>
          <div className="salon_wrap">
            <img src={ _.get(salonsDetails,'bannerImage[0].Location','')} className="salon_img" />
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="salon_info_wrap">
                    <div className="info_wrapper">
                      <h2>{/*Payton Rose Beauty Bar*/}{_.get(salonsDetails,'salonName','')}</h2>
                      <p className="salon_address">{/*6 Sickles Ave, New Rochelle, NY, United States*/}{_.get(salonsDetails,'salonAddress','')}</p>
                      <p>{ salonsDetails.description ? _.get(salonsDetails,'description','') : `Tiffany is a stylist that specializes in natural hair and locs. She is also a skincare specialist, she does facials and full body waxing. She promotes healthy hair, so Tiffany offers special treatments, nourishing, moisturizing, and strengthening, an array of styles that won’t alter the integrity of the natural hair. Tiffany starts locs and maintain them. The different techniques thatshe uses for locs are palming and interlocking. She usse different types of products light natural gels and oils for grooming.` }</p>
                    </div>
                    <div className="salon_ratings">
                      <Rate value={_.get(salonsDetails,'NewRating',0)} disabled/>
                    </div>
                  </div>
                  <div className="contact_details">

                      <Carousel autoplay>
                        {salonImage}
                      </Carousel>

                    {/* <img src={_.get(salonsDetails,'SalonsImage[0].Location','')} /> */}

                    <p><a href={'tel:'+_.get(salonsDetails,'mobile','')}><i className="fa fa-phone"></i> <span className="mr-5">{_.get(salonsDetails,'mobile','')}</span></a>
                    <span class="mobile-dblock">
                    <i className="fa fa-clock"></i> <span>Mon-Fri {_.get(salonsDetails,'startTime','')}:00AM - {_.get(salonsDetails,'endTime','')}:00PM</span>
                    </span>
                    </p>
                    {
                      favorite ? <Button className="favorite_btn" onClick={this.favorite.bind(this,'favorite')}>Favorite</Button>
                      : <Button className="favorite_btn" onClick={this.favorite.bind(this,'unfavorite')}>Unfavorite</Button>
                    }
                  </div>
                  <div className="review_wrap">
                    <Collapse defaultActiveKey={[]} onChange={this.callback}>
                      <Panel header={<h2 className="review_title">REVIEWS ({_.get(salonsDetails,'newRatingId',[]).length})
                        <div onClick={this.OpenReviewModal.bind(this)} className="btn btn_addreview">Add Reviews</div> </h2>}
                      key="1">
                      { salonsDetails && _.get(salonsDetails,'newRatingId','').length === 0 ?
                        <div>
                          <p>No Review Found</p>
                        </div>
                      :
                      <div>
                        {
                          salonsDetails && _.get(salonsDetails,'newRatingId','').map((value,i)=>{
                            if(i <= this.state.count){
                              return(
                                <div className="review_content_wrap" key={i}>
                                  <div className="profile_img">
                                    <img src={_.get(value,'userImage[0].Location',0)} alt="Profile" />
                                  </div>
                                  <div className="review_content">
                                    <p className="user_name">{_.get(value,'userName',0)}<small className="time_review">{/*9 days ago*/}</small> </p>
                                    <p className="review">{_.get(value,'review',0)}</p>
                                  </div>
                                  <div className="review_ratings">
                                    <img
                                        src={_.get(value,'image[0]',0)}
                                        alt="rating"
                                        className='show-img'
                                        onClick={() => this.showImage(i,value.image[0])}
                                        // onClick={this.zoomImage.bind(this, value.image[0] )}
                                      />
                                    <Rate value={_.get(value,'rating',0)} disabled/>
                                    <div id={'image-show'+i} class="image-show" style={{backgroundColor: '#fff', position: 'relative', display: 'none'}}>
			<img  id={'imgs'+i} className="imgs" src='' style={{width: '100%'}}/>
			<span class="hide-icon-btn" onClick={this.hideImage}>X</span>
		</div>
                                     {/* <div className="show">
                                     <div className="overlay" onClick={this.hideZoom}></div>
                                    <div className="img-show">
                                       <span onClick={this.hideZoom}>X</span>
                                       <img src="" />
                                     </div>
                                   </div> */}
                                  </div>
                                </div>
                              )
                            } else {
                                return(
                                  ''
                                )
                            }
                          })
                        }
                        {/* {
                          _.get(salonsDetails,'newRatingId','').length > this.state.count ?
                            <p onClick={this.loadReview.bind(this)}>loader</p>
                          :
                            ''
                        } */}
                        </div>
                      }
                      </Panel>
                    </Collapse>
                  </div>
                  <div className="salon_services">
                      <Formik
                          initialValues = {{
                              service: []
                            }}
                            onSubmit={this.handleBooking}
                          >
                            {({
                              values,
                            }) => (
                              <Form>
                    <h2 className="salon_title">SERVICES</h2>
                    {
                      salonsDetails && salonsDetails.salonServiceId.map((val,i)=>{
                        return (
                              <div className="services_wrap" key={i}>
                                <div className="left_wrap">
                                  <p><b>{_.get(val,'serviceName','')}</b></p>
                                  <p>{_.get(val,'description','')}</p>
                                </div>
                                <div className="right_wrap">
                                  <label>
                                  <Field
                                      name="service"
                                      type="checkbox"
                                      className="form-control input"
                                      onClick={this.handleCheckbox.bind(this,_.get(val,'_id',''),_.get(val,'serviceName',''),_.get(val,'description',''),_.get(val,'price','') )}
                                      value={_.get(val,'_id','')}
                                    />
                                    <span style={{fontSize:'14px'}}>${_.get(val,'price','')}</span>
                                  </label>
                                </div>
                              </div>
                          )
                        })
                    }
                    {
                      salonsDetails &&<div style={{textAlign:'center'}}> <button style={{background: '#bb9b62',textAlign:'center'}}
                      disabled={ service.length!==0  ? !this.state.isSubmitting : this.state.isSubmitting}
                      onClick={this.AddBookingDate.bind(this)} className="mt-2 btn_book pl-5 pr-5 btn text-white">BOOK</button>
                        </div>
                    }
                    </Form>
                    )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Modal */}
            <Modal
              title={<h2 className="modal_head">Booking</h2>}
              visible={this.state.addDateVisible}
              footer={null}
              onCancel={() => this.setState({ addDateVisible: false })}
            >
              <form className="modal_body">
                <div className="form-group text-center" style={{marginLeft: '75px'}}>
                  <input style={{width: '80%'}} type="text" name="booking_name" onChange={this.handleChange} value={this.state.booking_name} className="form-control" placeholder="Type your name" required />
                </div>
                <div className="form-group text-center" style={{marginLeft: '75px'}}>
                  <input style={{width: '80%'}} type="text" name="booking_mobile" onChange={this.handleChange} value={this.state.booking_mobile} className="form-control" placeholder="Type your Mobile Number" required />
                </div>
                <div className="form-group text-center" style={{marginLeft: '75px'}}>
                  <input style={{width: '80%'}} type="text" name="booking_email" onChange={this.handleChange} value={this.state.booking_email} className="form-control" placeholder="Type your Email" required />
                </div>
                <div className="form-group text-center">
                  {
                    this.state.disableTime ?
                    <DatePicker
                      minDate={new Date()}
                      onChange={date => this.selectBookingDate(date)}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      inline
                    />
                    :
                    <DatePicker
                    selected={startDate}
                    minDate={new Date()}
                    onChange={date => this.selectBookingDate(date)}
                    showTimeSelect
                    minTime={minTimes}
                    maxTime={maxTimes}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    inline
                  />
                  }
                </div>
                <div className="modal_footer">
                  <button type="button" onClick={this.AddBooking.bind(this)} disabled={this.state.disableTime} className="btn btn_submit">Submit</button>
                </div>
              </form>
            </Modal>

            {/* Redirect Modal */}
            <Modal
              title=''
              visible={this.state.gotoCart}
              footer={null}
              onCancel={() => this.setState({ gotoCart: false })}
            >
              <form className="modal_body">
                <div className="form-group text-center cart__button">
                  <a href='/cart'><button type="button" className="btn btn_submit">Cart</button></a>
                  <a href={'/salon/' + this.state.salonsDetails._id}><button type="button" className="btn btn_submit">Continue</button></a>
                </div>
              </form>
            </Modal>

            {/* Review Modal */}
            <Modal
              title={<h2 className="modal_head">Review</h2>}
              visible={this.state.writeReviewVisible}
              footer={null}
              onCancel={() => this.setState({ writeReviewVisible: false })}
            >
              <form className="modal_body">
                <div className="form-group text-center">
                  <label>Click on stars to Rate!</label>
                  <Rate onChange={this.onChange.bind(this, 'rating')} value={this.state.rating} className="star_rating" />
                </div>
                <div className="form-group text-center">
                  <label> Tell us about your experience </label>
                  <textarea onChange={this.handleChange} name="review" value={this.state.review} className="form-control textarea" placeholder="Write your experience..." ></textarea>
                </div>
                <div className="form-group text-center">
                  <Upload
                    multiple={false}
                    listType="picture-card"
                    className="avatar-uploader img_uploader"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChangeFile}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </div>
                <div className="modal_footer">
                  <button type="button" onClick={this.submitRating.bind(this)} className="btn btn_submit">Submit</button>
                </div>
              </form>
            </Modal>
          </div>
        </Spin>
      </div>
    )
  }
}
