import React, { PureComponent } from 'react'
import Slider from "react-slick"
import _ from 'lodash'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './styles.scss'

// const imgs = [
//   "/images/Layer2.jpg",
//   "/images/Layer2.jpg",
//   "/images/Layer2.jpg",
//   "/images/Layer2.jpg",
//   "/images/Layer2.jpg",
//   "/images/Layer2.jpg"
// ]

export default class CustomersLoveUsComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      nav1: null,
      nav2: null,
      salonsData:[]
    }
  }

  static propTypes = {
    // PropTypes go here
  }

  async componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    })
    const result = await this.props.customersLoveUs()
    if(result.value.status === true){
      this.setState({
        salonsData : result
      }) 
    }
  }

  render() {
    const { salonsData } = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      centerMode: true,
      autoplay: true,
      autoplayDuration: 1200,
      slidesToShow: window.screen.width <=767 ? 1 : 3,
      centerPadding: "0px",
      arrows: false,
      className: "main__img"
    };
    return (
      <div className="customers__review">

        <div className="section__title">
          <h2> Customers Love us!</h2>
          <p>The House of best salons in the town</p>
        </div>
        <div className="slider">
          {/* MAIN SLIDER */}
          <Slider asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)} {...settings}>
            { salonsData && _.get(salonsData,'value.salons',[]).map((value,i)=>{
              return (
                <div className="slide" key={i}>
                  <div className="child-element">
                    <img className="imgs" src={_.get(value,'SalonsImage[0].Location','/images/Hairtype.png')} alt="bc" />
                  </div>
                </div>
              )
            })}
          </Slider>
          {/* BOTTOM SLIDER */}
          <Slider
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={1}
            swipeToSlide={true}
            focusOnSelect={true}
            swipe={false}
            arrows={false}
          >
          { salonsData && _.get(salonsData,'value.salons',[]).map((value,i)=>{
            return(
              <div className="text__slider" key={i}>
                <h5 className="salon_name">{_.get(value,'salonName','')}</h5>
              </div>
            )
          })}
            {/*<div className="text__slider">
              <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            </div>*/}
          </Slider>
        </div>
      </div>
    )
  }
}
