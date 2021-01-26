import React, { PureComponent } from "react";
// import PropTypes from 'prop-types'\
import { Spin, Pagination, Card, Popconfirm, message } from "antd";
import Icon from "@ant-design/icons";
import _ from "lodash";
import EmptyData from "../../Emptypage";
import Cookies from "js-cookie";
import "./styles.scss";
import { Link } from "react-router-dom";
import CoverImage from "./coverImage";
const { Meta } = Card;

export default class DashboardComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      fullPageLoading: false,
      favSalonData: "",
      page: 0,
      totalPage: 0,
      text: "",
      current: 1
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ fullPageLoading: true });
    const userToken = Cookies.get("authToken");

    if (userToken) {
      const result = await this.props.getUser(userToken);
      if (result.value.status === true) {
        this.setState({
          userData: _.get(result, "value.users", ""),
          fullPageLoading: false
        });
      }
      const favResult = await this.props.getAllFavSalonById({
        page: this.state.page,
        text: this.state.text,
        token: userToken
      });
      console.log(favResult);
      if (favResult.value.status === true) {
        this.setState({ favSalonData: favResult, loading: false });
      }
    }
  }

  EditProfile() {
    this.props.history.push("/user/edit-profile");
  }

  async deleteFavoriteSalon(id, e) {
    e.preventDefault();
    this.setState({ loading: true });
    const result = await this.props.deleteFavoriteSalon(id);
    if (result.value.status === true) {
      this.setState({ loading: false });
      message.success(result.value.message);
      this.componentDidMount();
    }
  }
  cancel(e) {
    e.preventDefault();
  }

  render() {
    const { userData, favSalonData } = this.state;
    // console.log(_.get(userData, 'image[0].Location', '/images/profile.png'),'url')
    return (
      <div>
        <Spin spinning={this.state.fullPageLoading}>
          <div className="user_dashboard_home">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="main_wrapper">
                    <img
                      className="image_wrapper"
                      src={_.get(
                        userData,
                        "image[0].Location",
                        "/images/profile.png"
                      )}
                      alt="Card"
                    />
                    <div className="info_wrap">
                      <div className="head_wrap">
                        <h5 className="my_profile_wrap">
                          {_.get(userData, "profile.firstName", "")}{" "}
                          {_.get(userData, "profile.lastName", "")}
                        </h5>
                        <p>Email- {_.get(userData, "profile.email", "")}</p>
                        <p>Mobile - {_.get(userData, "profile.mobile", "")}</p>
                      </div>
                      <div className="detail_info">
                        {favSalonData &&
                        _.get(favSalonData, "value.FavSalon", []).length ===
                          0 ? (
                          <EmptyData />
                        ) : (
                          ""
                        )}
                        <div className="wrapper">
                          <div className="favSalon__wrapper">
                            <div className="row">
                              {favSalonData &&
                                favSalonData.value.FavSalon.map((value, i) => (
                                  <div
                                    key={i}
                                    className="col-lg-3 col-md-4 col-sm-12"
                                  >
                                    <Link to={"/salon/" + value.salonId}>
                                      <Card
                                        hoverable
                                        className="card_hairstylist"
                                        // cover={<img alt="example" src={_.get(value,'SalonsImage[0].Location','/images/User_male.png')}  />}
                                        cover={
                                          <CoverImage salonId={value.salonId} />
                                        }
                                        actions={[
                                          <Popconfirm
                                            title="Are you sure delete this Favorite Salon?"
                                            onConfirm={this.deleteFavoriteSalon.bind(
                                              this,
                                              value._id
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
                                        ]}
                                      >
                                        <Meta
                                          title={_.get(value, "salonName", "")}
                                        />
                                      </Card>
                                    </Link>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                        {/* <div className="wrapper">
                          <p>Hair Style  - {userData.preferredHairStyle && userData.preferredHairStyle.join(', ')}</p>
                          <div className="img_wrapper">
                            <div>
                              <img src="/images/User_male.png" alt="hairtype" />
                              <p>Hair styles</p>
                            </div>
                            <div>
                              <img src="/images/User_male.png" alt="hairtype" />
                              <p>Hair styles</p>
                            </div>
                            <div>
                              <img src="/images/User_male.png" alt="hairtype" />
                              <p>Hair styles</p>
                            </div>
                            <div>
                              <img src="/images/User_male.png" alt="hairtype" />
                              <p>Hair styles</p>
                            </div>
                            <div>
                              <img src="/images/User_male.png" alt="hairtype" />
                              <p>Hair styles</p>
                            </div>
                            <div>
                              <img src="/images/User_male.png" alt="hairtype" />
                              <p>Hair styles</p>
                            </div>
                            <div>
                              <img src="/images/User_male.png" alt="hairtype" />
                              <p>Hair styles</p>
                            </div>
                          </div>
                        </div>
                        <div className="wrapper">
                          <p>Hair Type - {userData.preferredHairType && userData.preferredHairType.join(', ')}</p>
                          <div className="img_wrapper">
                            <div>
                              <img src="/images/Hairtype.png" alt="hairtype" />
                              <p>Hair Type</p>
                            </div>
                            <div>
                              <img src="/images/Hairtype.png" alt="hairtype" />
                              <p>Hair Type</p>
                            </div>
                            <div>
                              <img src="/images/Hairtype.png" alt="hairtype" />
                              <p>Hair Type</p>
                            </div>
                            <div>
                              <img src="/images/Hairtype.png" alt="hairtype" />
                              <p>Hair Type</p>
                            </div>
                            <div>
                              <img src="/images/Hairtype.png" alt="hairtype" />
                              <p>Hair Type</p>
                            </div>
                            <div>
                              <img src="/images/Hairtype.png" alt="hairtype" />
                              <p>Hair Type</p>
                            </div>
                            <div>
                              <img src="/images/Hairtype.png" alt="hairtype" />
                              <p>Hair Type</p>
                            </div>
                          </div>
                        </div> */}
                      </div>
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
