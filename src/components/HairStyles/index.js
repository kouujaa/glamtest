import React, { PureComponent } from "react";
import { Carousel, Rate, Select } from "antd";
import Icon from "@ant-design/icons";
import EmptyData from "../Emptypage";
import HairSkeleton from "./hairSkeleton";
import Slider from "react-slick";
import Cookies from "js-cookie";
import _ from "lodash";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.scss";

const { Option } = Select;

export default class HairStylesComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      status: 0,
      salonsData: [],
      bestHairStylist: [],
      hairStyles: [],
      hairTypes: [],
      lashTechs: [],
      pricePoints: [],
      ratings: 0,
      page: 1,
      fullPageLoading: false,
      userRatings: 0,
      userId: "",
      visible: false,
      id: "",
      hairstyle: "",
      check: false,
      disabled: false,
      searchText: ""
    };
  }

  onChange(name, value, e) {
    this.setState({ [name]: value });
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
      fullPageLoading: true
    });
    const data = {
      hairStyles: this.state.hairStyles,
      hairTypes: this.state.hairTypes,
      lashTechs: this.state.lashTechs,
      pricePoints: this.state.pricePoints,
      ratings: this.state.ratings,
      page: this.state.page
    };

    const results = await this.props.getBestHairStylist();
    const result = await this.props.getSalonsData(data);

    if (results.value.status === true && result.value.status === true) {
      this.setState({
        bestHairStylist: results,
        salonsData: result.value.Salons,
        fullPageLoading: false
      });
    }
  }

  async SubmitRating(detail, value) {
    const userToken = Cookies.get("authToken");
    this.setState({
      userRatings: value,
      userId: detail._id
    });
    const data = {
      userToken: userToken,
      salonsId: detail._id,
      rating: value,
      salonName: detail.salonName
    };

    const newdata = {
      hairStyles: this.state.hairStyles,
      hairTypes: this.state.hairTypes,
      pricePoints: this.state.pricePoints,
      ratings: this.state.ratings,
      page: this.state.page
    };

    const hairStyle = {
      hairStyles: this.state.hairstyle
    };

    const result = await this.props.addRatings(data);
    if (result.value.status) {
      const results = await this.props.UpgradeSalonsRating(data);
      if (results.value.status && this.state.check === false) {
        const upgradesalons = await this.props.getSalonsData(newdata);
        if (upgradesalons.value.status) {
          this.setState({ salonsData: upgradesalons.value.Salons });
        }
      } else {
        const newResult = await this.props.getSalonsByHairStyles(hairStyle);
        if (newResult.value.status) {
          this.setState({ salonsData: newResult });
        }
      }
    }
  }

  async salonsAccordingHairStyles(value) {
    this.setState({
      check: true,
      hairstyle: value
    });
    const data = {
      hairStyles: value
    };
    const result = await this.props.getSalonsByHairStyles(data);
    if (result.value.status) {
      this.setState({ salonsData: result });
    }
  }

  handleVisibleChange(id) {
    const userToken = Cookies.get("authToken");
    if (userToken) {
      this.setState({
        visible: true,
        id: id
      });
    } else {
      this.props.history.push("/login");
    }
  }

  salonsDashboard(value) {
    window.open(`/salon/${value._id}`);
    // this.props.history.push({
    //   pathname : "/salon",
    //   state : { value : value }
    // })
  }

  async Submit() {
    this.setState({ disabled: true });
    const data = {
      hairStyles: this.state.hairStyles,
      hairTypes: this.state.hairTypes,
      lashTechs: this.state.lashTechs,
      pricePoints: this.state.pricePoints,
      ratings: this.state.ratings,
      page: this.state.page
    };

    const result = await this.props.getSalonsData(data);
    if (result.value.status === true) {
      this.setState({ salonsData: result.value.Salons });
    }
  }

  async Reset() {
    this.setState({
      hairStyles: [],
      hairTypes: [],
      lashTechs: [],
      pricePoints: [],
      ratings: "",
      disabled: false
    });
    const data = {
      hairStyles: [],
      hairTypes: [],
      lashTechs: [],
      pricePoints: [],
      ratings: 0,
      page: this.state.page
    };
    const result = await this.props.getSalonsData(data);
    if (result.value.status === true) {
      this.setState({ salonsData: result.value.Salons });
    }
  }

  _handleTextFocus = e => {
    e.preventDefault();
    this.setState({
      searchboxStyle: {
        width: "100%"
      }
    });
  };
  async _handleTextBlur(e) {
    this.setState({ searchText: e.target.value });
    const data = {
      hairStyles: this.state.hairStyles,
      hairTypes: this.state.hairTypes,
      lashTechs: this.state.lashTechs,
      pricePoints: this.state.pricePoints,
      ratings: this.state.ratings,
      page: this.state.page
    };
    const result = await this.props.getSalonsData(data);

    if (result.value.status === true) {
      this.setState({ salonsData: result.value.Salons });
    }
    let currentList = [];
    let newList = [];
    if (this.state.searchText !== "") {
      currentList = this.state.salonsData;
      newList = currentList.filter(item => {
        let lca = item.salonName.toLowerCase();
        let filters = this.state.searchText.toLowerCase();
        return lca.includes(filters);
      });
    } else {
      newList = this.state.salonsData;
    }
    this.setState({ salonsData: newList });
  }

  render() {
    const { salonsData, bestHairStylist } = this.state;

    let hairStyleOption =
      bestHairStylist &&
      _.get(bestHairStylist, "value.hairStylist", []).map((item, index) => {
        return (
          <Option key={index} value={item.title}>
            {item.title}
          </Option>
        );
      }, this);

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

    const settings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 500,
      centerMode: true,
      swipeToSlide: true,
      slidesToShow: window.screen.width <= 767 ? 1 : 5,
      centerPadding: "0px",
      focusOnSelect: true,
      autoplay: false,
      rows: 1,
      prevArrow: <SlickArrowLeft />,
      nextArrow: <SlickArrowRight />,
      className: "main__img"
    };
    const contentStyle = {
      width: "35%",
      height: "160px"
    };
    return (
      <div>
        {this.state.fullPageLoading ? (
          <HairSkeleton />
        ) : (
          <div className="hairstyles_wrap">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 p-0">
                  <img
                    src="images/makeup-artists_banner.jpg"
                    className="img-fluid w-100 bannerheight"
                    alt="makeup artist banner"
                  />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section__title">
                    <h2>Makeup Artists</h2>
                    {/*<p>The House of best salons in the town</p>*/}
                  </div>
                  <div className="filter_wrapper">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <ul>
                            <li>
                              <input
                                type="text"
                                name="searchText"
                                className="salonSearch"
                                value={this.state.searchText}
                                placeholder="Search Salon"
                                autoComplete="off"
                                onFocus={this._handleTextFocus}
                                onChange={this._handleTextBlur.bind(this)}
                              />
                            </li>
                            <li>
                              <Select
                                placeholder="Makeup Artists"
                                showSearch
                                showArrow={true}
                                //mode="multiple"
                                maxTagCount={1}
                                className="select_salonwrap"
                                value={this.state.hairStyles}
                                onChange={this.onChange.bind(
                                  this,
                                  "hairStyles"
                                )}
                              >
                                {hairStyleOption}
                              </Select>
                            </li>
                            <li>
                              <Rate
                                value={this.state.ratings}
                                onChange={this.onChange.bind(this, "ratings")}
                                defaultValue={1}
                                className="ratings_wrap_salon"
                              />
                            </li>
                            <li>
                              <div
                                className="btn btn_reset"
                                onClick={this.Reset.bind(this)}
                              >
                                Reset
                              </div>
                            </li>
                            <li>
                              <div
                                className="btn btn_apply"
                                onClick={this.Submit.bind(this)}
                              >
                                Apply
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider">
                    <Slider
                      asNavFor={this.state.nav2}
                      ref={slider => (this.slider1 = slider)}
                      {...settings}
                    >
                      {bestHairStylist &&
                        _.get(bestHairStylist, "value.hairStylist", []).map(
                          (value, i) => {
                            return (
                              <div
                                className="slide"
                                key={i}
                                onClick={this.salonsAccordingHairStyles.bind(
                                  this,
                                  value.title
                                )}
                              >
                                <div className="child-element">
                                  <img
                                    className="imgs"
                                    src={_.get(
                                      value,
                                      "image[0].Location",
                                      "/images/User_male.png"
                                    )}
                                    alt="bc"
                                  />
                                  <p className="text__slider">
                                    {_.get(value, "title", "")}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        )}
                    </Slider>
                  </div>

                  <div className="salons_wrap">
                    <h2>Styles according to the makeup artist </h2>
                    {/* {salonsData && _.get(salonsData, 'value.Salons', []).length === 0 ? */}
                    {salonsData && salonsData.length === 0 ? (
                      <EmptyData />
                    ) : (
                      <div className="row">
                        {/* {salonsData && _.get(salonsData, 'value.Salons', []).map((value, i) => ( */}
                        {salonsData &&
                          salonsData.map((value, i) => (
                            <div
                              key={i}
                              className="col-md-4"
                              onClick={this.salonsDashboard.bind(this, value)}
                            >
                              <div className="card">
                                <div className="card_img">
                                  {/* <img className="card-img-top" src={_.get(value,'SalonsImage[0].Location','/images/Hairtype.png')} alt="" /> */}
                                  <Carousel autoplay>
                                    {value.SalonsImage &&
                                      value.SalonsImage.map(image => (
                                        <div style={contentStyle}>
                                          <img
                                            src={image.Location}
                                            alt="salon"
                                          />
                                        </div>
                                      ))}
                                  </Carousel>
                                </div>
                                <div className="salon_description">
                                  <h5 className="salon_name">
                                    {_.get(value, "salonName", "")}
                                  </h5>
                                  <p className="salon_address">
                                    {_.get(value, "salonAddress", "")}
                                  </p>
                                  <div className="ratings_wrap">
                                    <div className="salon_ratings">
                                      <Rate
                                        disabled
                                        value={_.get(value, "NewRating", 0)}
                                      />
                                    </div>
                                    {/*<div>
                                    <Popover 
                                      content={
                                        <Rate 
                                          value={this.state.userRatings} 
                                          onChange={this.SubmitRating.bind(this, value)} 
                                          allowHalf 
                                          defaultValue={1}
                                          visible={value._id === this.state.id ? this.state.visible : false}
                                        />
                                      } 
                                      title={null} 
                                      trigger="click"
                                    >
                                      <button onClick={this.handleVisibleChange.bind(this, value._id)} className="btn btn_rate_salon">Rate Salon</button>
                                    </Popover>
                                  </div>*/}
                                  </div>
                                  <p className="avg_cost">
                                    {_.get(value, "pricePoints", "")}
                                  </p>
                                  <p className="salon_speciality">
                                    SPECIALTIES: Locs | Natural styling (
                                    {_.get(value, "hairstyleServices", "").join(
                                      ", "
                                    )}
                                    )
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
