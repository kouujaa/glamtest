import React, { PureComponent } from "react";
import _ from "lodash";
import Icon from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./styles.scss";

export default class HairStylesComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      topHairStylist: []
    };
  }

  async componentDidMount() {
    const result = await this.props.getTopHairStylist();
    if (result.value.status === true) {
      this.setState({ topHairStylist: result });
    }
  }
  render() {
    const { topHairStylist } = this.state;
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
      <button
        {...props}
        className={
          "slick-prev slick-arrow" +
          (currentSlide === 0 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
      >
        <Icon
          key="left"
          type="left"
          style={{ fontSize: "20px", color: "#000" }}
          theme="outlined"
        />
      </button>
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
      <button
        {...props}
        className={
          "slick-next slick-arrow" +
          (currentSlide === slideCount - 1 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
      >
        <Icon
          key="right"
          type="right"
          style={{ fontSize: "20px", color: "#000" }}
          theme="outlined"
        />
      </button>
    );
    var settings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 500,
      centerMode: true,
      swipeToSlide: true,
      slidesToShow: window.screen.width <= 767 ? 1 : 5,
      centerPadding: "0px",
      focusOnSelect: true,
      autoplay: true,
      prevArrow: <SlickArrowLeft />,
      nextArrow: <SlickArrowRight />,
      className: "main__img",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <div className="hairstyle__wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section__title">
                  <h2>Hair Styles</h2>
                  {/*<p>The House of best hair styles in the town</p>*/}
                </div>
                {/*<div className="row">
                  {topHairStylist && _.get(topHairStylist, 'value.hairStylist', []).map((value, i) => (
                    <div key={i} className="col-md-3">
                      <div className="card">
                        <img className="card-img-top" src="/Layer2.jpg" alt="" />
                        <img className="card-img-top" src={_.get(value, 'image[0].Location', '/images/User_male.png')} alt="" />
                        <div className="card-body">
                          <h5 className="card-title">{_.get(value, 'title', '')}</h5>
                        </div>
                      </div>
                    </div>
                  ))
                  }
                </div>*/}
                <Slider {...settings}>
                  {topHairStylist &&
                    _.get(topHairStylist, "value.hairStylist", []).map(
                      (value, i) => {
                        return (
                          <div key={i} className="card">
                            <img
                              className="card-img-top"
                              src={_.get(
                                value,
                                "image[0].Location",
                                "/images/User_male.png"
                              )}
                              alt=""
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {_.get(value, "title", "")}
                              </h5>
                              {/*<p className="card-text">{_.get(value,'description','')}</p>*/}
                            </div>
                          </div>
                        );
                      }
                    )}
                </Slider>
                <div className="text-center btn__wrap">
                  <Link to="/hair-information">
                    <Button type="primary" shape="round">
                      Explore
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
