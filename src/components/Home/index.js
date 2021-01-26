import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { Select, Modal } from 'antd';
import HairSalons from './HairSalons/index'
import HairStyles from './HairStyles/container'
import { message } from 'antd'
// import CustomersLovesUs from './CustomersLoveUs/container'

import './styles.scss'

const { Option } = Select;

export default class HomeComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      HairStyleData:[],
      HairTypeData:[],
      HairStyle: [],
      HairType:[],
      HairService: [],
      location:'BC',
      writeNewsletterVisible: false,
      email: ''
    }
  }

  onChange(name, value, e){
    this.setState({ [name] : value })
  }
  onEmail(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount(){
    window.scrollTo(0,0)
    this.props.getSignUpData()
    let newsletter = sessionStorage.getItem('writeNewsletterVisible')
    if(newsletter !== null || newsletter === false){
      this.setState({ writeNewsletterVisible: false })
    }else{
      this.setState({ writeNewsletterVisible: true })
    }
  }

  validate(){
    var errorFlag = true
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // eslint-disable-line
    
    if (this.state.email && this.state.email !== '') {
      let testR = emailRegex.test(String(this.state.email).toLowerCase())
      if (!testR) {
        errorFlag = false
        message.error('Invalid Email')
      } else{
      }
    }

    return errorFlag
  }

  async submitEmail(){
    console.log(this.state.email)
    if((this.state.email).length !== 0){
      const errorFlag = this.validate.bind(this)
      if(errorFlag){
        const data = { email : this.state.email }
        const result = await this.props.submitEmailAddress(data)
        if(result.value.status === true){
          message.success('Submitted')
          sessionStorage.setItem('writeNewsletterVisible', false)
          this.setState({ 
            email : '',
            writeNewsletterVisible: false
        })
        }
      }
    }
  }

  cancelNewsletter = () => {
    sessionStorage.setItem('writeNewsletterVisible', false)
    this.setState({ writeNewsletterVisible: false })
  }

  componentDidUpdate = async (prevProps, prevState) => {
    // if (prevProps.signupdataPhase === 'success') {
    //   this.setState({ 
    //     HairStyleData : prevProps.signupdata.hairStylist,
    //     HairTypeData : prevProps.signupdata.hairTypes
    //   })
    // }
    if(prevProps.getServiceStylesPhase === 'success'){
      if(prevProps.getServiceStylesData.status === true){
        if(prevProps.getServiceStylesData.hair){
          this.setState({ 
            HairService : prevProps.getServiceStylesData.hair
          })
        }
        if(prevProps.getServiceStylesData.lashTech){
          this.setState({ 
            HairService : prevProps.getServiceStylesData.lashTech,
          })
        }
        if(prevProps.getServiceStylesData.makeupArtist){
          this.setState({ 
            HairService : prevProps.getServiceStylesData.makeupArtist,
          })
        }
        if(prevProps.getServiceStylesData.nailTech){
          this.setState({ 
            HairService : prevProps.getServiceStylesData.nailTech,
          })
        }
      }
    }
    this.props.userClearPhase()
  }
  submit(){
    const data = {
      HairStyleData : this.state.HairStyle,
      HairTypeData : this.state.HairType
    }
    this.props.history.push({
      pathname : "/salons",
      state : { detail : data }
    })
  }

  handleChange(service){
    this.setState({HairStyle: service})
    this.props.getServiceStyles(service)
  }

  render() {
    const { HairService } = this.state

    let hairServiceOption = HairService && HairService.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)).map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)


    const services = [
      { 
        id: 1, 
        name: 'Hair',  
        style: ['Barbers', 'Blowouts', 'Box braids', 'Cornrows', 'Dreadlocks', 'Goddess braids', 'Knotless braids', 'Pixie cut', 'Relaxer', 'Roller sets', 'Silk press', 'Texturizer', 'Tree braids', 'Trims', 'Twists', 'Twist out', 'Updos', 'Weaves', 'Wig Styling','Curly', 'Coily', 'Kinky', 'Natural', 'Straight', 'Transitioning', 'Wavy']
      },
      { 
        id: 2, 
        name: 'Lashes', 
        style: ['Classic', 'Volume', 'Hybrid', 'Mega Volume', 'Russian Volume', 'Fill']
      },
      { 
        id: 3, 
        name: 'MakeUp', 
        style: ['Eye Makeup', 'Graduation Makeup', 'Lash Application','Makeup Lessons', 'Simple & Natural', 'Full Glam']
      },
      { 
        id: 4, 
        name: 'Nails', 
        style: ['Acrylic', 
          'Fills',
          'Gel',
          'Manicure',
          'Ombre Nails',
          'Pedicure',
          'Press-ons',
          'Shellac'
          ]
      }
    ]

    let service = services && services.filter(ser => {
      return ser.name === this.state.HairStyle
    })

    let serviceOption = services && services.map((item, index) => {
      return (
        <Option key={index} value={item.name}>{item.name}</Option>
      )
    }, this)

    // let serviceStyleOption = service && service[0].style.map((item, index) => {
    //   return (
    //     <Option key={index} value={item}>{item}</Option>
    //   )
    // }, this)

    return (
      <div>
        <div className="home__bg">
          <img alt="description" src="/images/home_bg.jpg" />
          <div className="img__before"></div>
          <div className="text_homebg">
          <h1>Where Your Glam Matters</h1>
            <h2>Discover & book local black businesses you can trust with your glam, kinks, coils, and curls</h2>
          </div>
        </div>

        {/* AUTOCOMPLETE */}
        <div className="input__fields">
          <ul>
          
            <div className="form--wrap">
              <li>
                {/* <div>
                  <label className="input__label">Makeup Artist</label>
                </div> */}
                <Select
                  showSearch
                  ={false}
                  showArrow={false}
                  //mode="multiple"
                  placeholder="Choose a Service"
                  className="input multipule_select_wrap"
                  value={this.state.HairStyle}
                  onChange={this.onChange.bind(this, 'HairStyle'), this.handleChange.bind(this)}
                >
                 {serviceOption}
                </Select>
              </li>
              <li>
                {/* <div>
                  <label className="input__label">Nail Tech</label>
                </div> */}
                <Select
                  placeholder="Choose a Style"
                  showArrow={false}
                  //mode="multiple"
                  className="input multipule_select_wrap"
                  value={this.state.HairType}
                  onChange={this.onChange.bind(this , 'HairType')}
                >
                  {hairServiceOption }
                </Select>
              </li>
              <li>
                {/* <div>
                  <label className="input__label"> Location </label>
                </div> */}
                <Select

                  showArrow={false}
                  autoFocus={true}
                  placeholder="Choose City"
                  optionFilterProp="children"
                  className="input"
                  defaultValue={this.state.location}
                  value={this.state.location}
                  onChange={this.onChange.bind(this , 'location')}
                >
                  <Option value="BC">British Columbia</Option>
                  <Option value="Canada">Canada</Option>
                </Select>
              </li>

              <li onClick={this.submit.bind(this)} className="btn">
                Search
            </li>
            </div>

          </ul>
        </div>
        {/* AUTOCOMPLETE */}

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <HairSalons />
              <HairStyles />
              {/*<CustomersLovesUs />*/}
            </div>
          </div>
        </div>

        {/* Newsletter Modal */}
        <Modal
          title={<h2 className="modal_head">Newsletter</h2>}
          visible={this.state.writeNewsletterVisible}
          footer={null}
          onCancel={this.cancelNewsletter}
          className="newsletterModal"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 p-0">
                <img src='images/newsletter-pic.jpg' alt="newsletter" />
                <div className="modal-body-text">
                    <h4>WANT TO STAY IN THE LOOP?</h4>
                    <p>Get on the list to stay up to date</p>
                    <form>
                        <div className="form-group">
                        <input name="email" autoComplete="off" value={this.state.email} onChange={this.onEmail.bind(this)} type="email" className="form-control email_input" placeholder="example@example.com" />
                        </div>
                        <div className="form-group">
                        <button type="button" onClick={this.submitEmail.bind(this)} className="btn btn_submit submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>

      </div>
    )
  }
}
