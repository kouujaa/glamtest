import React, { PureComponent } from "react";
// import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { List, Avatar } from "antd";
import { Spin, Rate, Popconfirm } from "antd";
import Icon from "@ant-design/icons";
import Cookies from "js-cookie";
import _ from "lodash";
import "./styles.scss";
import SalonService from "./salonService";
import $ from "jquery";

export default class DashboardComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      salonsData: "",
      fullPageLoading: false,
      isOpen: false,
      visible: false,
      salonId: "",
      serviceName: "",
      description: "",
      price: "",
      editService: false,
      editServiceId: "",
      enlarge: false,
      ratingData: ""
    };
  }

  static propTypes = {
    // PropTypes go here
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ fullPageLoading: true });
    const salonsToken = Cookies.get("authToken");

    if (salonsToken) {
      let totalRating = 0;
      const result = await this.props.getSalonsDataById(salonsToken);
      //console.log(result,'result')
      if (result.value.status === true) {
        let ratingLength = result.value.salons.newRatingId.length;
        if (ratingLength > 0) {
          result.value.salons.newRatingId.map(rating => {
            totalRating = totalRating + rating.rating;
          });
        }
        this.setState({
          salonId: _.get(result, "value.salons._id", ""),
          salonsData: _.get(result, "value.salons", ""),
          ratingData: Math.round(totalRating / ratingLength),
          fullPageLoading: false
        });
      }
    }
  }

  EditProfile() {
    this.props.history.push("/stylist/edit-profile");
  }

  onClose() {
    this.setState({ visible: false });
  }

  handleServices = async values => {
    const { editService, editServiceId } = this.state;

    if (!editService) {
      const data = {
        serviceName: _.get(values, "serviceName", ""),
        price: _.get(values, "price", ""),
        description: _.get(values, "description", ""),
        salonId: this.state.salonId
      };

      const result = await this.props.addSalonService(data);
      if (result.value.status === true) {
        this.setState({
          visible: false,
          serviceName: "",
          description: "",
          price: ""
        });
      }
    } else {
      const editData = {
        serviceName: _.get(values, "serviceName", ""),
        price: _.get(values, "price", ""),
        description: _.get(values, "description", ""),
        _id: editServiceId
      };

      const results = await this.props.editSalonService(editData);
      if (results.value.status === true) {
        this.setState({ visible: false });
      }
    }
    this.componentDidMount();
  };

  showDrawer(id) {
    let value = id;
    const { salonsData } = this.state;
    if (value) {
      let salon = _.get(salonsData, "salonServiceId", "");
      let editData = _.filter(salon, { _id: value });

      this.setState({
        visible: true,
        editService: true,
        editServiceId: value,
        serviceName: editData[0].serviceName,
        price: editData[0].price,
        description: editData[0].description
      });
    } else {
      this.setState({
        visible: true,
        editService: false,
        serviceName: "",
        price: "",
        description: ""
      });
    }
  }

  async deleteSalonService(id) {
    await this.props.deleteSalonService(id);
    this.componentDidMount();
  }

  cancel(e) {}
  zoomImage = img => {
    $(".show").fadeIn();
    $(".img-show img").attr("src", img);
  };

  hideZoom = () => {
    $(".show").fadeOut();
  };

  render() {
    const { salonsData, ratingData } = this.state;
    return (
      <div>
        <Spin spinning={this.state.fullPageLoading}>
          <div className="stylist_dashboard_home">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-lg-4 col-sm-12">
                      <div className="left_wrap">
                        <div className="img_wrap">
                          <img
                            src={_.get(
                              salonsData,
                              "profilePicture[0].Location",
                              "/images/profile.png"
                            )}
                            alt="Card"
                          />
                        </div>
                        <div className="salon_details_wrap">
                          <p className="salon_name">
                            {_.get(salonsData, "firstName", "")}{" "}
                            {_.get(salonsData, "lastName", "")}
                          </p>
                          {/* <p>FreeLancer - <span> {_.get(salonsData, 'FreeLancer', '') === "Yes" ? 'Yes' : 'No'}</span></p> */}
                          <p>
                            Status -{" "}
                            <span>
                              {_.get(salonsData, "isActive", "") === true
                                ? "Active"
                                : "Blocked"}
                            </span>
                          </p>
                        </div>
                        {/* <div className="list_wrap">
                          <div className="wrap">
                            <p className="title">Makeup-Artists</p>
                          </div>
                          <p className="list">{salonsData.hairstyleServices && salonsData.hairstyleServices.join(', ')}</p>
                        </div>
                        <div className="list_wrap">
                          <div className="wrap">
                            <p className="title">Nail-Techs</p>
                          </div>
                          <p className="list">{salonsData.hairType && salonsData.hairType.join(', ')}</p>
                        </div>
                        <div className="list_wrap">
                          <div className="wrap">
                            <p className="title">Lash-Techs</p>
                          </div>
                          <p className="list">{salonsData.lashTech && salonsData.lashTech.join(', ')}</p>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-lg-8 col-sm-12">
                      <div className="right_wrap">
                        <div className="personal_info">
                          <div>
                            <p className="name">
                              {_.get(salonsData, "salonName", "")}
                            </p>

                            {/* <p>Salon Time </p>
                              <div>Monday: {_.get(salonsData, 'availablity.monday.status', '')===true ?<span>{_.get(salonsData, 'availablity.monday.timeSlot[0]', '')} - {_.get(salonsData, 'availablity.monday.timeSlot[1]', '')}</span> : 'Today salon closed'}</div>
                              <div>Tuesday: {_.get(salonsData, 'availablity.tuesday.status', '')===true ?<span> {_.get(salonsData, 'availablity.tuesday.timeSlot[0]', 'Today salon closed')} - {_.get(salonsData, 'availablity.tuesday.timeSlot[1]', '')}</span> : ''}</div>
                              <div>Wednesday: {_.get(salonsData, 'availablity.wednesday.status', '')===true ?<span> {_.get(salonsData, 'availablity.wednesday.timeSlot[0]', '')} - {_.get(salonsData, 'availablity.wednesday.timeSlot[1]', 'Today salon closed')}</span>: 'Today salon closed'}</div>
                              <div>Thursday: {_.get(salonsData, 'availablity.thursday.status', '')===true ?<span>{_.get(salonsData, 'availablity.thursday.timeSlot[0]', '')} - {_.get(salonsData, 'availablity.thursday.timeSlot[1]', '')}</span> : 'Today salon closed'}</div>
                              <div>Friday: {_.get(salonsData, 'availablity.friday.status', '')===true ?<span>{_.get(salonsData, 'availablity.friday.timeSlot[0]', '')} - {_.get(salonsData, 'availablity.friday.timeSlot[1]', '')}</span> : 'Today salon closed' }</div>
                              <div>Saturday: {_.get(salonsData, 'availablity.saturday.status', '')===true ?<span>{_.get(salonsData, 'availablity.saturday.timeSlot[0]', '')} - {_.get(salonsData, 'availablity.saturday.timeSlot[1]', '')}</span> : 'Today salon closed' }</div>
                              <div>Sunday: {_.get(salonsData, 'availablity.sunday.status', '')===true ? <span>{_.get(salonsData, 'availablity.sunday.timeSlot[0]', '')} - {_.get(salonsData, 'availablity.sunday.timeSlot[1]', '')}</span> : 'Today salon closed'}</div>
                            
                            <p>Price - <span>{_.get(salonsData, 'pricePoints', '')}</span> </p> */}
                          </div>
                          <div>
                            {/*<p className="location"><i className="fa fa-map-marker"></i>{_.get(salonsData, 'loaction', 'UnAvailable')}</p>*/}
                          </div>
                        </div>
                        <div>
                          <Rate value={ratingData ? ratingData : 0} disabled />
                        </div>
                        <div className="tabs_profile">
                          <Tabs>
                            <TabList>
                              <Tab>
                                <i className="fa fa-user"></i> About
                              </Tab>
                              <Tab>
                                <i className="fa fa-user"></i> Salons Pics
                              </Tab>
                              <Tab>
                                <i className="fas fa-eye"></i> Reviews
                              </Tab>
                            </TabList>
                            <TabPanel>
                              <div className="contact_info">
                                <p className="details_name">
                                  Contact Information
                                </p>
                                <div className="details">
                                  <p className="title_info">Phone:</p>
                                  <p>{_.get(salonsData, "mobile", "")}</p>
                                </div>
                                <div className="details">
                                  <p className="title_info">Address:</p>
                                  <p>{_.get(salonsData, "salonAddress", "")}</p>
                                </div>
                                <div className="details">
                                  <p className="title_info">E-mail:</p>
                                  <p>{_.get(salonsData, "email", "")}</p>
                                </div>
                                <div className="details">
                                  <p className="title_info">Facebook:</p>
                                  <p>{_.get(salonsData, "facebookName", "")}</p>
                                </div>
                                <div className="details">
                                  <p className="title_info">Instagram:</p>
                                  <p>
                                    {_.get(salonsData, "instagramName", "")}
                                  </p>
                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel>
                              <div>
                                <div className="upload_images_wrap_edit">
                                  {salonsData &&
                                    salonsData.SalonsImage.map((val, i) => {
                                      return (
                                        <div key={i}>
                                          <img
                                            src={_.get(val, "Location", "")}
                                            alt="Card"
                                            key={i}
                                          />
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel>
                              <div className="reviews_wrap">
                                <List
                                  itemLayout="horizontal"
                                  dataSource={salonsData.newRatingId}
                                  renderItem={(value, i) => {
                                    return (
                                      <List.Item>
                                        <List.Item.Meta
                                          //avatar={<Avatar src="/images/User_male.png" />}
                                          avatar={
                                            <Avatar
                                              src={_.get(
                                                value,
                                                "userImage[0].Location",
                                                0
                                              )}
                                            />
                                          }
                                          title={
                                            <div className="title_Wrapper">
                                              <span>
                                                {_.get(value, "userName", 0)}
                                              </span>
                                            </div>
                                          }
                                          description={_.get(
                                            value,
                                            "review",
                                            0
                                          )}
                                        />
                                        <img
                                          src={_.get(value, "image[0]", 0)}
                                          alt="rating"
                                          style={{
                                            width: "50px",
                                            height: "50px"
                                          }}
                                          onClick={this.zoomImage.bind(
                                            this,
                                            value.image[0]
                                          )}
                                        />
                                        <Rate
                                          value={_.get(value, "rating", 0)}
                                        />
                                      </List.Item>
                                    );
                                  }}
                                />
                                <div className="show">
                                  <div
                                    className="overlay"
                                    onClick={this.hideZoom}
                                  ></div>
                                  <div className="img-show">
                                    <span onClick={this.hideZoom}>X</span>
                                    <img src="" />
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="details_wrapper">
                <div className="row">
                  <div className="col-md-6">
                    <div className="hairstyle_details_wrap">
                      <p className="hairstyle_title" onClick={() => this.setState({ isOpen: !isOpen })}><span>HairStyles</span></p>
                        <Collapse isOpen={isOpen}>
                          <Card>
                            <CardBody>
                              <p className="hairstyle_name">HairStyle Name</p>
                              <p className="hairstyle_name">HairStyle Name</p>
                              <p className="hairstyle_name">HairStyle Name</p>
                              <p className="hairstyle_name">HairStyle Name</p>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>

          <SalonService
            handleServices={this.handleServices.bind(this)}
            onClose={this.onClose.bind(this)}
            {...this.state}
          />

          <div className="stylist_dashboard_home">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="services_wrapper">
                    <div className="head_wrap">
                      <h2 className="title">SERVICES</h2>
                      <button
                        className="btn btn_add"
                        onClick={this.showDrawer.bind(this, null)}
                      >
                        Add
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <td>Services</td>
                            <td>Price</td>
                            <td></td>
                          </tr>
                        </thead>
                        <tbody>
                          {salonsData &&
                            salonsData.salonServiceId.map((val, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <p className="m-0">
                                      <b>{_.get(val, "serviceName", "")}</b>
                                    </p>{" "}
                                    <div>{_.get(val, "description", "")}</div>
                                  </td>
                                  <td>${_.get(val, "price", "")}</td>
                                  <td>
                                    <Icon
                                      onClick={this.showDrawer.bind(
                                        this,
                                        val._id
                                      )}
                                      type="edit"
                                      key="edit"
                                      className="edit"
                                    />
                                    <Popconfirm
                                      title="Are you sure delete this service?"
                                      onConfirm={this.deleteSalonService.bind(
                                        this,
                                        val._id
                                      )}
                                      onCancel={this.cancel}
                                      overlayClassName="popconfirm_wrapper"
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                      <Icon
                                        type="delete"
                                        key="delete"
                                        className="delete"
                                      ></Icon>
                                    </Popconfirm>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}
