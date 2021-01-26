import React, { PureComponent } from 'react'
import { message } from 'antd'
import _ from 'lodash'
import ThankYouPage from './thankYou' 
import './styles.scss'

export default class ContactUsComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      Message: '',
      thankYou: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    window.scrollTo(0,0)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.addContactInfoPhase === "success"){
      if(prevProps.addContactInfoData.status === true){
        message.success(_.get(prevProps,'addContactInfoData.message',''))
        this.setState({ name: '', Message: '', email: '', thankYou: true })
        setTimeout(()=>{
          this.setState({ thankYou:false })
        },15000)
      }
    }
    this.props.userClearPhase()
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async () => {
    const { name, email, Message } = this.state
    const data = {
      name,
      email,
      message: Message
    }
    const err = await this.validate()
    if (!_.isEmpty(err)) {
      if (err.name) {
        message.error(err.name)
      } else if (err.email) {
        message.error(err.email)
      } else if (err.Message) {
        message.error(err.Message)
      }
    }
    if (Object.keys(err).length === 0) {
      this.props.addContactInfo(data)
    }
  }

  validate = () => {
    const { name, email, Message } = this.state
    const err = {}
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     // eslint-disable-line
    if (!name) {
      err.name = 'Name is Required'
    }
    if (email === '' || email.trim() === '') {
      err.email = 'Email is Required.'
    }
    if (email && email !== '') {
      let testR = emailRegex.test(String(email).toLowerCase())
      if (!testR) {
        err.email = 'Email is invalid.'
      }
    }
    if (!Message) {
      err.Message = 'Message is required'
    }
    return err
  }

  render() {
    const { thankYou } = this.state
    return (
      <div>
      { thankYou ?
        <ThankYouPage/>
        :
        <div className="contactus__wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="section__title">
                  <h2>Talk to us!</h2>
                  <p>
                    Need help fiil out the form below shoot us an email at{' '}
                    <a href="#!">info@theglamplug.ca</a> we will get back to you
                    within 24 hours.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                <div className="form__wrap">
                  <form>
                    <div className="form-group">
                      <label className="label_form"> Name* </label>
                      <input
                        type="text"
                        className="form-control input"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                        placeholder="Your Name here"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label_form"> Email* </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control input"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                        placeholder="example@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label_form">
                        {' '}
                        Tell us what you need help with{' '}
                      </label>
                      <textarea
                        className="form-control input textarea"
                        placeholder="Message"
                        name="Message"
                        value={this.state.Message}
                        onChange={this.handleChange}
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => this.handleSubmit()}
                        className="btn btn-lg btn_contact"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
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
