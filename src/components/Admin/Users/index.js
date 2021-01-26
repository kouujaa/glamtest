import React, { PureComponent } from 'react'
import { List, Avatar, Pagination, Spin, Switch } from 'antd'
import './styles.scss'
import _ from 'lodash'
import EmptyData from '../../Emptypage'

export default class UsersComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      UsersData: '',
      current: 1,
      page: 0,
      totalPage: 0,
      text: '',
      loading: false
    }
  }

  componentDidMount = async () => {
    this.setState({ loading: true })
    const result = await this.props.getAllUsers({ page: this.state.page, text: this.state.text })
    if (result.value.success === true) {
      this.setState({ UsersData: result, loading: false })
    }
  }

  async changePage(pageNumber) {
    this.setState({ page: parseInt(pageNumber) })

    const payload = {
      page: pageNumber,
      text: this.state.text
    }

    const result = await this.props.getAllUsers(payload)
    if (result.value.success === true) {
      this.setState({ UsersData: result })
    }
  }

  async searchUsersData(e) {
    this.setState({ text: e.target.value })

    const payload = {
      text: e.target.value,
      page: 1
    }
    const result = await this.props.getAllUsers(payload)
    if (result.value.success === true) {
      this.setState({ UsersData: result })
    }
  }

  async updateStatus(id, status) {
    const data = {
      _id: id,
      status: status
    }
    const results = await this.props.UpdateUserStatus(data)
    if (results.value.status === true) {
      const result = await this.props.getAllUsers({ page: this.state.page, text: this.state.text })
      if (result.value.success === true) {
        this.setState({ UsersData: result })
      }
    }
  }

  render() {
    const { UsersData } = this.state
    let totalUser = _.get(UsersData, 'value.totalLength')

    if((this.state.text).length !== 0){
      totalUser = _.get(UsersData, 'value.Users', []).length
    }

    return (
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
                  UsersData && _.get(UsersData, 'value.Users',[]).length === 0 ?
                    <EmptyData /> : ''
                }

                <div className="users_list">
                  <List
                    itemLayout="horizontal"
                    dataSource={_.get(UsersData, 'value.Users',[])}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Switch defaultChecked onChange={this.updateStatus.bind(this, item._id)} />
                        ]}>
                        <List.Item.Meta
                          avatar={<Avatar src={_.get(item, 'image[0].Location', '/images/profile.png' )} />}
                          title={_.get(item, 'profile.firstName', '')}
                          description={<div className="user_info_wrap">
                            <ul>
                              <li>
                                <p><span>Email - </span>{_.get(item, 'profile.email', '')}</p>
                              </li>
                              <li>
                                <p><span>Phone Number -</span>{_.get(item, 'profile.mobile', '')}</p>
                              </li>
                              <li>
                                <p><span>Hairstyle - </span>{_.get(item,'preferredHairStyle','').join(', ')}</p>
                              </li>
                              <li>
                                <p><span>Hair Types - </span>{_.get(item,'preferredHairType','').join(', ')}</p>
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
                    total={totalUser}
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
