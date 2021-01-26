import React, { PureComponent } from 'react'
import { Link } from "react-router-dom"
import { Layout, message } from 'antd'
import Cookies from 'js-cookie'
import './styles.scss'
const { Footer } = Layout

export default class FooterComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email:'',
      showSignUp:true,
      instafeed:[]
    }
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  async componentDidMount(){
    const userToken = Cookies.get('authToken')
    if(userToken){
      this.setState({ showSignUp: false })
    }
    await fetch("https://www.instagram.com/the_glamplug/?__a=1")
      .then(res => res.json())
      .then((result) => {
        this.setState({instafeed: result.graphql.user.edge_owner_to_timeline_media.edges})
        //console.log(result.graphql.user.edge_owner_to_timeline_media.edges[0].node.shortcode)
      })
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
    if((this.state.email).length !== 0){
      const errorFlag = this.validate.bind(this)
      if(errorFlag){
        const data = { email : this.state.email }
        const result = await this.props.submitEmailAddress(data)
        if(result.value.status === true){
          message.success('Submitted')
          this.setState({ email : '' })
        }
      }
    }
  }

  render() {
    const { showSignUp, instafeed } = this.state
    return (
      <div>
        <section className="signup__wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                { 
                  showSignUp === true ?
                    <div className="signup__fields">
                      <form className="form-inline form__wrap">
                        <div className="form-group">
                          <label className="">Signup for our Newsletter</label>
                        </div>
                        <div className="form-group mx-sm-3">
                          <input name="email" value={this.state.email} onChange={this.onChange.bind(this)} type="email" className="form-control email_input" placeholder="example@example.com" />
                        </div>
                        <button onClick={this.submitEmail.bind(this)} type="button" className="btn btn_signup">Signup</button>
                      </form>
                    </div>
                  :
                    ''
                }
              </div>
            </div>
          </div>
          <div className="instaFeed__wrapper">
          {
            instafeed.map(feed=> (
              <div key={feed.node.shortcode}><a href={`https://www.instagram.com/p/${feed.node.shortcode}`} target="_blank" rel="noopener noreferrer"> <img src={feed.node.display_url} alt={feed.node.id} /> </a></div>
            ))
          }
          </div>
        </section>
        <Footer className="footer__bg">
          <div className="container">
            <div className="row">
              <div className="col-md-12">

                <div className="row">
                  <div className="col-md-9">
                    <div className="footer__wrap">
                      <ul>
                        <li><span><hr /></span><Link to="/about-us"><p>About Us</p></Link><Link to="/Faq"><p>FAQ</p></Link></li>
                        <li><span><hr /></span><Link to="/privacy"><p>Privacy</p></Link><Link to="/Terms-of-services"><p>Terms of Services</p></Link></li>
                        <li><span><hr /></span><Link to="/hair-information"><p>Hair Information</p></Link><Link to="/contact-us"><p>Customer Support</p></Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="social__wrapper">
                      <div>
                        <a href="https://www.facebook.com/The-Glam-Plug-115667280082828/" target="_blank" rel="noopener noreferrer"><img src="/images/FB-01.svg" alt="" /></a>
                      </div>
                      <div>
                        <a href="https://www.instagram.com/the_glamplug/" target="_blank" rel="noopener noreferrer"><img src="/images/Insta-01.svg" alt="" /></a>
                      </div>

                      
                      
                    </div>
                  </div>
                </div>
                <div className="footer__logo">
                  <img src="/images/Logo_Glamplug.svg" alt="" />
                  <p>Copyright © 2019-2020 theglamplug.com. All Rights Reserved.</p>
                  <p><a href="#!">info@theglamplug.ca</a></p>
                </div>

              </div>
            </div>
          </div>
        </Footer>
      </div>
    )
  }
}
