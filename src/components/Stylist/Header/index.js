import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Button, Modal, Card, Row, Col, List, message, Descriptions, Alert } from 'antd';
import './styles.scss'
import { Link } from "react-router-dom";
import _ from 'lodash'
import Cookies from 'js-cookie'
import StripeCheckout from 'react-stripe-checkout'
import moment from 'moment'
const { Header } = Layout

export default class HeaderComponent extends PureComponent {

  static propTypes = {
    // PropTypes go here
  }

  state = {
    visible: false,
    packageName: '',
    packagePrice: '',
    paid: false,
    paidModalVisible: false,
    paymentData: '',
    validity: '',
    leftDays: ''
  }

  logout = async () => {
    await this.props.logout()
    this.props.history.push('/')
  }

  async componentDidMount(){
    window.scrollTo(0,0)
    const salonsToken =  Cookies.get('authToken')
    if(salonsToken){
      const result = await this.props.getPaymentDataById(salonsToken)
      if(result.value.status===true && result.value.paymentData!==null){
        this.setState({
          paid: true,
          paymentData: _.get(result, 'value.paymentData', '')
        })
        let date = this.state.paymentData.updatedAt
        let d1 = new Date(date) //firstDate
        let d2 = new Date() //SecondDate
        let diff = Math.abs(d1-d2);
        let totaldays = Math.floor(diff/ (1000 * 60 * 60 * 24))
        this.setState({leftDays: (this.state.paymentData.validity - totaldays)})
        // if(this.state.leftDays < 0){
        //   const disableResult = await this.props.disableSalon(salonsToken)
        // }
      }else{
        this.setState({paid: false})
      }
    }
  }

  subscribeModal = () => {
    this.setState({visible: true})
  }
  PaidModal = () => {
    this.setState({paidModalVisible: true})
  }

  payClick = (name, price, validity) => {
    this.setState({
      packageName: name,
      packagePrice: price,
      validity: validity
    })
  }

  subscriptionPayment = async(token) => {
    const salonsToken = Cookies.get('authToken')
    if(salonsToken){
      const data = {
        token: token,
        leftDays: this.state.leftDays > 0 ? this.state.leftDays : 0,
        salonsToken: salonsToken,
        product: {
          name: this.state.packageName,
          price: this.state.packagePrice,
          validity: this.state.validity
        }
      }
      const result = await this.props.subscriptionPayment(data)
      if(result.value.result.paid===true){
        message.success(result.value.message)
        this.setState({
          visible: false,
          paid: true
        })
      }else{
        message.error(result.value.message)
      }
    }
  }

  render() {
    const { paid, paymentData,leftDays } = this.state
    let paymentAlert
    if(leftDays <= 10){
      paymentAlert = <Alert 
                        message="Warning"
                        description={leftDays < 11 ? ` ${leftDays} days left your subscription. Please update your subscription` : 'Your Plan expired Please purchase again'}
                        type="warning"
                        showIcon
                        
                      />
    }
    
    const products = [
      {
        id: 1,
        packageName: '1 Month Plan',
        price: 75,
        currency: 'USD',
        validity: 30,
        facility: ['Unlimited Beginner Yoga Classes']
      },
      {
        id: 2,
        packageName: '6 Months Plan',
        price: 100,
        currency: 'USD',
        validity: 180,
        facility: [
            '24/7 Gym Access', 
            'Unlimited access to all Yoga Classes', 
            'Unlimited access to all Pilates Classes'
          ]
      },
      {
        id: 3,
        packageName: '1 Year Plan',
        price: 140,
        currency: 'USD',
        validity: 365,
        facility: [
            '24/7 Gym Access', 
            'Unlimited access to all Yoga Classes', 
            'Unlimited access to all Pilates Classes',
            '2 Private Training Sessions'
          ]
      },
    ]
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.logout.bind(this)}>Logout</Menu.Item>
      </Menu>
    )

    const membershipMenu = (
      <Menu>
        {
          paid && <Menu.Item key="1" onClick={this.PaidModal}>Membership Detail</Menu.Item>
        }
        <Menu.Item key="2" onClick={this.subscribeModal}>Update Pro</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="w-100">
              <div className="dashboard_wrap_header-stylist">
                <ul>
                  <li>
                    <div className="logo_dashboard_wrap">
                      <Link to="/home" ><img src="/images/Logo_Glamplug.svg" alt="" /></Link>
                    </div>
                  </li>
                  <li>
                    <div className="admin_wrap">
                      {/* {
                        paid ? 
                        <Button onClick={this.PaidModal} className="btn btn_add subscribe-btn">Paid</Button> : 
                        <Button onClick={this.subscribeModal} className="btn btn_add subscribe-btn">Update Pro</Button>
                      } */}
                      <Dropdown overlayClassName={"overlay__class_dropdown"} overlay={membershipMenu}>
                        <p>Membership</p>
                      </Dropdown>
                      
                    </div>
                    <div className="admin_wrap">
                      <Dropdown overlayClassName={"overlay__class_dropdown"} overlay={menu}>
                        <p>Stylist<i className="far fa-user-circle"></i><i className="fas fa-caret-down"></i></p>
                      </Dropdown>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Layout className="sub_header_dashboard-stylist">
            <Header>
              <Menu
                theme="light"
                mode="horizontal"
                overflowedIndicator={<i className="fas fa-list"></i>}
                selectedKeys={[this.props.location.pathname]}
              > 
                <Menu.Item key="/stylist/home">
                  <Link to="/stylist/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="/stylist/edit-profile">
                  <Link to="/stylist/edit-profile">Edit-Profile</Link>
                </Menu.Item>
                <Menu.Item key="/stylist/reset-password">
                  <Link to="/stylist/reset-password">Reset-Password</Link>
                </Menu.Item>
                <Menu.Item key="/stylist/orders">
                  <Link to="/stylist/orders">Orders</Link>
                </Menu.Item>
              </Menu>
            </Header>
          </Layout>
        </div>
        {/* subscribe modal */}
          <Modal
            title="Choose a monthly subscription"
            visible={this.state.visible}
            footer={null}
            width={900}
            onCancel={() => this.setState({visible: false})}
            className="subscibeModal"
          >
            <div className="site-card-wrapper">
              {paymentAlert}
            <Row gutter={16}>
              {
                products && products.map((product) => 
                <Col span={8}>
                  <Card title={product.packageName} bordered={false} style={{height: '445px'}}>
                    <List>
                      <List.Item>$<span style={{fontSize: '36px',display: 'flex',margin: '-14px 0 0 9px'}}>{product.price}</span>
                        {
                          paymentData.amount===product.price && leftDays >= 0 ? 'Purchased' :
                          <StripeCheckout 
                          stripeKey={process.env.REACT_APP_STRIPE_KEY} 
                          token={this.subscriptionPayment} 
                          name={product.packageName}
                          amount={product.price*100}
                          currency={product.currency}
                        >
                            <Button className="subscribeButton" onClick={this.payClick.bind(this,product.packageName,product.price,product.validity)}>Select</Button>
                        </StripeCheckout>
                        }
                      </List.Item>
                      {
                        product.facility.map((facility,i) => (
                        <List.Item>{facility}</List.Item>
                        ))
                      }
                    </List>
                  </Card>
                </Col>
                )
              }
            </Row>
          </div>
          </Modal>
          {/* Payment detail modal */}
          <Modal
            title="Payment Detail"
            visible={this.state.paidModalVisible}
            footer={null}
            onCancel={() => this.setState({paidModalVisible: false})}
            style={{background: '#fff'}}
            className="memberDetail"
          >
            <div className="site-card-wrapper">
              {paymentAlert}
              <Descriptions>
                <Descriptions.Item label="Package Name">{paymentData.description}</Descriptions.Item>
                <Descriptions.Item label="Email">{paymentData.email}</Descriptions.Item>
                <Descriptions.Item label="Amount">{paymentData.amount}</Descriptions.Item>
                <Descriptions.Item label="Payment Date">{moment.utc(paymentData.updatedAt).format('DD-MM-YYYY')}</Descriptions.Item>
              </Descriptions>
            </div>
          </Modal>
      </div>
    )
  }
}
