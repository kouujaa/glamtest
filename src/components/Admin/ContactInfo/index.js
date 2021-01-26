import React, { PureComponent } from 'react'
import _ from 'lodash'
import { Pagination, Spin } from 'antd'
import EmptyData from '../../Emptypage'
import SendMail from '../NewsLetter/sendMail'
import './styles.scss'

export default class ContactInfoComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      contactInfoData: '',
      page: 0,
      totalPage: 0,
      text: '',
      loading: false,
      visible: false,
      to: '',
      subject: '',
      body: '',
      id:'',
      buttonDisable:false,
      button:true,
      mailDrawerLoading:false,
      message:'',
      messages:'',
      name:'',
    }
  }

  onClose = () => { this.setState({ visible: false }) }

  async componentDidMount() {
    this.setState({ loading: true })
    const result = await this.props.getContactInfo({ page: this.state.page, text: this.state.text })
    if (result.value.status === true) {
      this.setState({ contactInfoData: result, loading: false })
    }
  }

  async changePage(pageNumber) {
    this.setState({ page: parseInt(pageNumber), loading: true })

    const payload = {
      page: pageNumber,
      text: this.state.text
    }

    const result = await this.props.getContactInfo(payload)
    if (result.value.status === true) {
      this.setState({ contactInfoData: result, loading: false })
    }
  }

  async searchContactInfo(e) {
    this.setState({ text: e.target.value, loading: true })

    const payload = {
      text: e.target.value,
      page: 1
    }

    const result = await this.props.getContactInfo(payload)
    if (result.value.status === true) {
      this.setState({ contactInfoData: result, loading: false })
    }
  }

  openDrawer(value) {
    this.setState({
      visible : true,
      to : value.email,
      id : value._id,
      name : value.name,
      messages : value.message,
    })
  }

  async sendMail(values) {
    this.setState({ 
      buttonDisable: true, 
      button: false,
      mailDrawerLoading: true  
    })
    const data = {
      email: values.to,
      subject: values.subject,
      details: values.body,
      id : this.state.id,
      name : this.state.name,
      message : this.state.messages,
      role: 'CONTACT_INFO',
    }
    const result = await this.props.sendMail(data)
    if (result.value.status === true) {
      this.setState({
        mailDrawerLoading: false,  
        to: '',
        subject: '',
        body: '',
        buttonDisable:false,
        button:true,
        message:'Send Mail'
      })
      setTimeout(()=>{
        this.setState({ visible:false , message:'' })
      },5000)
      this.componentDidMount()
    }
  }

  render() {
    const { contactInfoData } = this.state
    let totalContactInfo = _.get(contactInfoData, 'value.totalLength')

    if((this.state.text).length !== 0){
      totalContactInfo = _.get(contactInfoData, 'value.ContactInfo', []).length
    }

    // const list = _.get(contactInfoData, 'value.ContactInfo', []).map(row => ({
    //   key: row._id,
    //   name: row.name,
    //   message: row.message,
    //   email: row.email
    // }))
    
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
                        onChange={this.searchContactInfo.bind(this)}
                        type="text"
                        className="form-control search_input"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>

                <SendMail
                  onClose={this.onClose.bind(this)}
                  sendMail={this.sendMail.bind(this)}
                  {...this.state}
                />

                {
                  contactInfoData && _.get(contactInfoData, 'value.ContactInfo', []).length === 0 ?
                    <EmptyData />
                    :
                    <div className="contactinfo_wrapper">
                      <div className="table-responsive">
                        <table className="table table-borderless">
                          <thead>
                            <tr>
                              <td>Name</td>
                              <td>Email Address</td>
                              <td>Messages</td>
                              <td>Action</td>
                              <td>Activities</td>
                            </tr>
                          </thead>
                          <tbody>
                          { contactInfoData && _.get(contactInfoData, 'value.ContactInfo', []).map((value,i)=>(
                            <tr key={i}>
                              <td><i className="fas fa-user"></i>{_.get(value,'name','')}</td>
                              <td>{_.get(value,'email','')}</td>
                              <td>{_.get(value,'message','')}</td>
                              <td><a href="#!" onClick={this.openDrawer.bind(this, value)}><i className="fas fa-envelope"></i>Send Mail</a></td>
                              <td><i className="fas fa-chart-line"></i>{_.get(value,'count','')}+</td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                }


                <div className="pagination_wrapper">
                  <Pagination
                    onChange={this.changePage.bind(this)}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    total={totalContactInfo}
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
