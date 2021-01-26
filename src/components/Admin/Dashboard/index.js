import React, { PureComponent } from 'react'
import { Link } from "react-router-dom"
import { Spin } from 'antd'
import _ from 'lodash'
import './styles.scss'

export default class DashboardComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      TotalHairStyles : '',
      TotalHairTypes : '',
      TotalMakeupArtist: '',
      TotalNailTech: '',
      TotalSalons : '',
      TotalUsers : '',
      TotalNewsLetter : '',
      TotalContactInfo : '',
      TotalOrders: '',
      TotalLashTechs: '',
      loading: false
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const result = await this.props.getHomePageData()
    if(result.value.status === true){
      this.setState({ 
        TotalHairStyles : _.get(result,'value.hairStylist',''),
        TotalHairTypes : _.get(result,'value.hairTypes',''),
        TotalMakeupArtist : _.get(result,'value.makeupArtist',''),
        TotalNailTech : _.get(result,'value.nailTech',''),
        TotalLashTechs: _.get(result,'value.lashTech',''),
        TotalSalons :_.get(result,'value.salons',''),
        TotalUsers : _.get(result,'value.users',''),
        TotalNewsLetter : _.get(result,'value.newsLetter',''),
        TotalContactInfo : _.get(result,'value.contact',''),
        TotalOrders : _.get(result,'value.orders',''),
        loading: false
      })
    }
  }

  render() {
    const { 
      TotalContactInfo,
      TotalHairStyles, 
      TotalNewsLetter, 
      TotalHairTypes,
      TotalMakeupArtist,
      TotalNailTech,
      TotalLashTechs,
      TotalSalons, 
      TotalUsers,
      TotalOrders
    } = this.state
    
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="home_dashboard_wrap">
                  <div className="row">
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/salons" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalSalons}+</p>
                          <p>Salons</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Salon_icon.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/hair-style" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalHairStyles}+</p>
                          <p>Hair Style</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Hairstylist.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/hair-type" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalHairTypes}+</p>
                          <p>Hair Type</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Hairtype.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/makeup-artists" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalMakeupArtist}+</p>
                          <p>Makeup Artist</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Hairstylist.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/nail-techs" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalNailTech}+</p>
                          <p>Nail Techs</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Hairstylist.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/lash-techs" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalLashTechs}+</p>
                          <p>Lash Techs</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Hairtype.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/users" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalUsers}+</p>
                          <p>Users</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/User_male.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/news-letter" ><div className="box_wrap">
                      <div className="content">
                          <p>{TotalNewsLetter}+</p>
                          <p>News Letter</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Newsletter.png" alt=""/>
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/contact-info" ><div className="box_wrap">
                      <div className="content">
                          <p>{TotalContactInfo}+</p>
                          <p>Contact Info</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Contact_info.png" alt=""/>
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/orders" ><div className="box_wrap">
                      <div className="content">
                          <p>{TotalOrders}+</p>
                          <p>Orders</p>
                        </div>
                        <div className="img_wrap" style={{fontSize: '45px',width: '76px',textAlign: 'center',background: '#fff'}}>
                          {/* <img src="/images/Contact_info.png" alt=""/> */}
                          <i className="fa fa-list" style={{color: '#ba9961'}}></i>
                        </div>
                      </div></Link>
                    </div>
                  </div>
                </div>
                {/*<div className="row">
                  <div className="col-lg-12 col-xl-6">
                    <div className="wrapper_content_box">
                      <p className="title_wrap">Title</p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="wrapper_content_box">
                      <p className="title_wrap">Title</p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="wrapper_content_box">
                      <p className="title_wrap">Title</p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="wrapper_content_box">
                      <p className="title_wrap">Title</p>
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
          </div>
        </Spin>
      </div>
    )
  }
}
