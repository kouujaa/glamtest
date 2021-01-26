import React, { PureComponent } from 'react'
import { Spin, Pagination, Card, Icon, Popconfirm,message } from 'antd'
import _ from 'lodash'
import './style.scss'
import EmptyData from '../../Emptypage'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import CoverImage from './coverImage'
const { Meta } = Card

class FavoriteComponent extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            favSalonData: '',
            page: 0,
            totalPage: 0,
            text: '',
            current: 1,
        }
    }
    componentDidMount = async() => {
        window.scrollTo(0, 0)
        const userToken = Cookies.get('authToken')
        this.setState({loading: true})
        if (userToken) {
            const result = await this.props.getAllFavSalonById({ page: this.state.page, text: this.state.text, token: userToken })
            if (result.value.status === true) {
                this.setState({ favSalonData: result, loading: false })
            }
        }
    }

    async searchUsersData(e){
        const userToken = Cookies.get('authToken')
        this.setState({ text: e.target.value })
        const payload = {
          text: e.target.value,
          page: 1,
          token: userToken
        }
        const result = await this.props.getAllFavSalonById(payload)
        if (result.value.status === true) {
          this.setState({ favSalonData: result })
        }
    }
    async deleteFavoriteSalon(id, e){
        e.preventDefault()
        this.setState({ loading: true })
        const result = await this.props.deleteFavoriteSalon(id)
        if(result.value.status===true){
            this.setState({ loading: false })
            message.success(result.value.message)
            this.componentDidMount()
        }
    }
    cancel(e) { e.preventDefault() }
    render(){
        const {favSalonData} = this.state
        // let totalSalon = _.get(favSalonData, 'value.totalLength')

        // if((this.state.text).length !== 0){
        //     totalSalon = _.get(favSalonData, 'value.FavSalon', []).length
        // }
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
                                    favSalonData && _.get(favSalonData, 'value.FavSalon',[]).length === 0 ?
                                        <EmptyData /> : ''
                                }
                                <div className="favSalon__wrapper">
                                    <div className="row">
                                        {
                                            favSalonData && favSalonData.value.FavSalon.map((value, i) => (
                                                <div key={i} className="col-lg-3 col-md-4 col-sm-12">
                                                    <Link to={'/salon/'+value.salonId}>
                                                    <Card
                                                        hoverable
                                                        className="card_hairstylist"
                                                        // cover={<img alt="example" src={_.get(value,'SalonsImage[0].Location','/images/User_male.png')}  />}
                                                         cover={<CoverImage salonId={value.salonId} /> }
                                                        actions={[
                                                            <Popconfirm
                                                              title="Are you sure delete this Favorite Salon?"
                                                              onConfirm={this.deleteFavoriteSalon.bind(this, value._id)}
                                                              onCancel={this.cancel}
                                                              overlayClassName="popconfirm_wrapper"
                                                              okText="Yes"
                                                              cancelText="No"
                                                            >
                                                              <Icon
                                                                type="delete"
                                                                key="delete"
                                                                className="delete"
                                                              >
                                                              </Icon>
                                                            </Popconfirm>
                                                          ]}
                                                    >
                                                    <Meta title={_.get(value,'salonName','')} />
                                                    </Card>
                                                    </Link>
                                                </div>
                                                
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="pagination_wrapper">
                                    <Pagination
                                        //onChange={this.changePage.bind(this)}
                                        defaultCurrent={1}
                                        defaultPageSize={10}
                                        //total={totalOrder}
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

export default FavoriteComponent