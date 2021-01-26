import React, { PureComponent } from 'react'
import Cookies from 'js-cookie'
import './styles.scss'

export default class AboutUsComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showSignUp:true
    }
  }

  componentDidMount(){
    window.scrollTo(0,0)
    const userToken = Cookies.get('authToken')
    if(userToken){
      this.setState({ showSignUp: false })
    }
  }

  Apply(){
    this.props.history.push({
      pathname : "/signup",
      state : { value : 1 }
    })
  }

  render() {
    const { showSignUp } = this.state
    return (
      <div>
        <div className="aboutus__wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section__title">
                  <h2>About Us</h2>
                  <p>Some Basic information that you need to know</p>
                </div>
              </div>
              <div className="content__aboutus">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="img_aboutus">
                      <img src="/images/aboutus.jpg" alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="content__text">
                      <h2>Meet the team</h2>
                      <p>My name is Vanessa Egharevba & I am a Nigerian girl who came to Canada when I was only two years old. Growing up ethnic in Vancouver was such a struggle, but the main struggle was finding someone to do my hair. It was either too coarse, too “nappy”, or the “stylist” was not educated enough to know what to even do with my hair. Finding hairstylists online was such a process because their photos never represented their work adequately enough for me to trust them with my hair & as a black woman, I am my hair. After years of research & years of trials & errors, Glam Plug was born. Glam Plug is a networking site for you to find the perfect stylist to protect & nurture your beautiful hair. Find the stylist that has a Ph.D. in your specific hair type. You no longer have to feel like an afterthought, Glam Plug puts you & your loc first. I know I will be able to bridge that gap between my brothers and sisters and the many talented stylists in Vancouver.</p>
                    </div>
                  </div>
                </div>
              </div>
              {
                showSignUp === true ? 
                  <div className="stylist__wrap">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="section__title">
                          <h2>Are you an amazing Stylist?</h2>
                          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                          <button type="button" onClick={this.Apply.bind(this)} className="btn btn-lg btn_submit">Apply to join now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                :
                  ''
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
