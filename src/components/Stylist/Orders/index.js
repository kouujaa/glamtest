import React, { PureComponent } from 'react'
import { Spin, List, Pagination, Switch, message, Badge  } from 'antd'
import _ from 'lodash'
import './style.scss'
import EmptyData from '../../Emptypage'
import moment from 'moment'
import Cookies from 'js-cookie'


class OrderComponent extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            orderData: '',
            page: 0,
            totalPage: 0,
            text: '',
            current: 1,
            totalRevenue: ''
        }
    }
    componentDidMount = async() => {
        window.scrollTo(0, 0)
        this.setState({ loading: true })
        const salonsToken = Cookies.get('authToken')

        if (salonsToken) {
          const result = await this.props.getSalonOrdersById({page: this.state.page,text: this.state.text,token: salonsToken })
          if (result.value.status === true) {
            this.setState({ orderData: result, totalRevenue: result.value.salonData.totalRevenue, loading: false })
          }
        }
      }
      async changePage(pageNumber){
        this.setState({ page: parseInt(pageNumber) })
        const salonsToken = Cookies.get('authToken')
        const payload = {
        page: pageNumber,
        text: this.state.text,
        token: salonsToken
        }
        const result = await this.props.getSalonOrdersById(payload)
        if (result.value.status === true) {
            this.setState({ orderData: result })
          }
      }
      async searchUsersData(e){
        this.setState({ text: e.target.value })
        const salonsToken = Cookies.get('authToken')
        const payload = {
          text: e.target.value,
          page: 1,
          token: salonsToken
        }
        const result = await this.props.getSalonOrdersById(payload)
        if (result.value.status === true) {
          this.setState({ orderData: result })
        }
      }

      async updateStatus(id, price, salonId, status){
        const data = {
            _id: id,
            status: status,
            price: price,
            salonId: salonId,
          }
          const result = await this.props.UpdateOrderStatus(data)
          if (result.value.status === true) {
              this.setState({totalRevenue: result.value.salons.totalRevenue})
            this.componentDidMount()
            message.success(result.value.message)
        }
      }

    render(){
        const { orderData, totalRevenue } = this.state
        let totalOrder = _.get(orderData, 'value.totalLength')

        if((this.state.text).length !== 0){
            totalOrder = _.get(orderData, 'value.Orders', []).length
        }
        return(
            <div>
                <Spin spinning={this.state.loading}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 order__wrapper">
                                <div className="search_wrapper">
                                    <form className="form-inline">
                                        <div className="form-group mr-3">
                                        <input
                                            onChange={this.searchUsersData.bind(this)}
                                            type="text"
                                            className="form-control search_input"
                                            placeholder="Search"
                                        />
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    {totalRevenue && totalRevenue ? 
                                    <Badge count={`Total Revenue is $`+ totalRevenue}>
                                        <a href="#" className="head-example" />
                                    </Badge>
                                    : 'No Revenue till now'
                                    }
                                </div>
                                {
                                    orderData && _.get(orderData, 'value.Orders',[]).length === 0 ?
                                        <EmptyData /> : ''
                                }
                                <div className="users_list">
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={_.get(orderData, 'value.Orders',[])}
                                        renderItem={item => (
                                        <List.Item
                                         actions={[
                                            <Switch checked={item.status} onChange={this.updateStatus.bind(this, item._id, item.totalPrice, item.salonsId[0])} />
                                          ]}
                                        >
                                            <List.Item.Meta
                                            title={_.get(item, 'salonName', '')}
                                            description={<div className="user_info_wrap">
                                                <ul>
                                                    <li>
                                                        <p><span>Name - </span>{_.get(item, 'bookingName', '')}</p>
                                                    </li>
                                                    <li>
                                                    <p><span>Services -</span>
                                                        {
                                                            item.serviceId.map((service,i) => (
                                                            <span key={i}>{service.name}{i < item.serviceId.length - 1 ? ', ' : '' }</span>
                                                            ))
                                                        }
                                                    </p>
                                                    </li>
                                                    <li>
                                                        <p><span>Email - </span>{_.get(item, 'email', '')}</p>
                                                    </li>
                                                    <li>
                                                        <p><span>Mobile - </span>{_.get(item, 'bookingMobile', '')}</p>
                                                    </li>
                                                    <li>
                                                    <p><span>Booking Date - </span> {item.bookingDate !== '' ? moment.utc(item.bookingDate).format('DD-MM-YYYY') : '' }</p>
                                                    </li>
                                                    <li>
                                                        <p><span>Total Amount - </span>${_.get(item, 'totalPrice', '')}</p>
                                                    </li>
                                                </ul>
                                            </div>}
                                            />
                                        </List.Item>
                                        )}
                                    />
                                </div>
                                <div className="pagination_wrapper">
                                    <Pagination
                                        onChange={this.changePage.bind(this)}
                                        defaultCurrent={1}
                                        defaultPageSize={10}
                                        total={totalOrder}
                                        hideOnSinglePage={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }    
}

export default OrderComponent