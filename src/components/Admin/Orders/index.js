import React, { PureComponent } from 'react'
import { Spin, List, Pagination } from 'antd'
import _ from 'lodash'
import './style.scss'
import EmptyData from '../../Emptypage'
import moment from 'moment'

class OrderComponent extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            orderData: '',
            page: 0,
            totalPage: 0,
            text: '',
            current: 1,
        }
    }

    componentDidMount = async() => {
        this.setState({loading: true})
        const result = await this.props.getAllOrders({ page: this.state.page, text: this.state.text })
        if (result.value.status === true) {
            this.setState({ orderData: result, loading: false })
        }
    }

    async changePage(pageNumber){
        this.setState({ page: parseInt(pageNumber) })

        const payload = {
        page: pageNumber,
        text: this.state.text
        }
        const result = await this.props.getAllOrders(payload)
        if (result.value.status === true) {
            this.setState({ orderData: result })
          }

    }

    async searchUsersData(e) {
        this.setState({ text: e.target.value })
    
        const payload = {
          text: e.target.value,
          page: 1
        }
        const result = await this.props.getAllOrders(payload)
        if (result.value.status === true) {
          this.setState({ orderData: result })
        }
      }


    render(){
        const { orderData } = this.state
        let totalOrder = _.get(orderData, 'value.totalLength')

        if((this.state.text).length !== 0){
            totalOrder = _.get(orderData, 'value.Orders', []).length
        }
        return(
            <div>
                <Spin spinning={this.state.loading}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
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
                                {
                                    orderData && _.get(orderData, 'value.Orders',[]).length === 0 ?
                                        <EmptyData /> : ''
                                }
                                <div className="users_list">
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={_.get(orderData, 'value.Orders',[])}
                                        renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                            title={_.get(item, 'salonName', '')}
                                            description={<div className="user_info_wrap">
                                                <ul>
                                                    <li>
                                                    <p><span>Services -</span>
                                                        {
                                                            item.serviceId.map((service,i) => (
                                                            <span>{service.name}{i < item.serviceId.length - 1 ? ', ' : '' }</span>
                                                            ))
                                                        }
                                                    </p>
                                                    </li>
                                                    <li>
                                                        <p><span>Email - </span>{_.get(item, 'email', '')}</p>
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