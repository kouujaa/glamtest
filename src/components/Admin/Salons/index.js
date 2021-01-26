import React, { PureComponent } from 'react'
import _ from 'lodash'
// import PropTypes from 'prop-types'
import { List, Avatar, Pagination, Spin, Switch, Rate } from 'antd'
import './styles.scss'
import EmptyData from '../../Emptypage'


export default class SalonsComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      salonsData: this.props.salonsData,
      current: 1,
      page: 0,
      totalPage: 0,
      text: '',
      loading: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.salonsPhase === 'success') {
      return {
        salonsData: nextProps.salonsdata,
        loading: false
      }
    } else {
      return null
    }
    // this.props.salonsClearPhase()
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.getSalons({ page: this.state.page, text: this.state.text })
  }

  changePage(pageNumber) {
    this.setState({ page: parseInt(pageNumber) })

    const payload = {
      page: pageNumber,
      text: this.state.text
    }

    this.props.getSalons(payload)
  }

  searchSalonsData(e) {
    this.setState({ text: e.target.value })

    const payload = {
      text: e.target.value,
      page: 1
    }
    this.props.getSalons(payload)
  }

  async updateStatus(id, status) {
    const data = {
      _id: id,
      status: status
    }
    const result = await this.props.UpdateSalonsStatus(data)
    if (result.value.status === true) {
      this.props.getSalons({ page: this.state.page, text: this.state.text })
    }
  }


  render() {
    const { salonsData, loading } = this.state
    let totalSalons = _.get(salonsData, 'totalLength')

    if((this.state.text).length !== 0){
      totalSalons = _.get(salonsData, 'value.Salons', []).length
    }

    return (
      <div>
        <Spin spinning={loading}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="search_wrapper">
                  <form className="form-inline">
                    <div className="form-group mr-3">
                      <input
                        onChange={this.searchSalonsData.bind(this)}
                        type="text"
                        className="form-control search_input"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>

                {
                  salonsData && _.get(salonsData, 'Salons', []).length === 0 ?
                    <EmptyData /> : ''
                }

                <div className="salons_list">
                  <List
                    itemLayout="horizontal"
                    dataSource={_.get(salonsData, 'Salons', [])}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Switch checked={item.isActive} onChange={this.updateStatus.bind(this, item._id)} />
                        ]}>
                        <List.Item.Meta
                          avatar={<Avatar src={_.get(item, 'profilePicture[0].Location', '/images/profile.png' )} />}
                          title={item.salonName}
                          description={<div className="salon_info_wrap">
                            <ul>
                              <li>
                                <p><span> Address -</span> {_.get(item, 'salonAddress', '')}</p>
                              </li>
                              <li>
                                <p><span>Phone Number -</span> {_.get(item, 'mobile', '')}</p>
                              </li>
                              <li>
                                <p><span>Email - </span>{_.get(item, 'email', '')}</p>
                              </li>
                              <li>
                                <p><span>Instgram Name - </span>{_.get(item, 'instagramName', '')}</p>
                              </li>
                              <li>
                                <p><span>Hairstyle Services - </span>{_.join(item, 'hairstyleServices',', ')}</p>
                              </li>
                              {/* <li>
                                <p><span>Hair Type - </span>{_.get(item, 'hairType','').join(', ')}</p>
                              </li>  */}
                              <li>
                                <p><span>Hair Type - </span>{_.join(item, 'hairType',', ')}</p>
                              </li>
                              <li>
                                <div><span>Rating - </span><Rate value={_.get(item, 'rating', 0)} disabled /></div>
                              </li>
                              <li>
                                <p><span>FreeLancer - </span>{_.get(item, 'freeLancer', '')}</p>
                              </li>
                              <li>
                                <p><span>Time - </span>{_.get(item, 'startTime', '')} am to {_.get(item, 'endTime', '')} pm </p>
                              </li>
                              <li>
                                <p><span>Price - </span>{_.get(item, 'pricePoints', '')}</p>
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
                    total={totalSalons}
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
