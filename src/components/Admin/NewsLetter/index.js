import React, { PureComponent } from 'react'
import _ from 'lodash'
import { Pagination, Spin } from 'antd'
import EmptyData from '../../Emptypage'
import SendMail from './sendMail'
import './styles.scss'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'


export default class NewsLetterComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      NewsLetterData: '',
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
    }
  }

  onClose = () => { this.setState({ visible: false }) }

  async componentDidMount() {
    this.setState({ loading: true })
    const result = await this.props.getNewsLetterEmail({ page: this.state.page, text: this.state.text })
    if (result.value.status === true) {
      this.setState({ NewsLetterData: result, loading: false })
    }
  }

  async changePage(pageNumber) {
    this.setState({ page: parseInt(pageNumber), loading: true })

    const payload = {
      page: pageNumber,
      text: this.state.text
    }

    const result = await this.props.getNewsLetterEmail(payload)
    if (result.value.status === true) {
      this.setState({ NewsLetterData: result, loading: false })
    }
  }

  async searchEmailData(e) {
    this.setState({ text: e.target.value, loading: true })

    const payload = {
      text: e.target.value,
      page: 1
    }

    const result = await this.props.getNewsLetterEmail(payload)
    if (result.value.status === true) {
      this.setState({ NewsLetterData: result, loading: false })
    }
  }

  openDrawer(value) {
    this.setState({
      visible : true,
      to : value.email,
      id : value._id
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
      role: 'NEWS_LETTER',
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
    const { NewsLetterData } = this.state
    let totalNewsLetter = _.get(NewsLetterData, 'value.totalLength')
    
    if((this.state.text).length !== 0){
      totalNewsLetter = _.get(NewsLetterData, 'value.NewsLetter', []).length
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
                        onChange={this.searchEmailData.bind(this)}
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
                {/* 
                {
                  NewsLetterlist && NewsLetterlist.length === 0 ?
                    <EmptyData />
                    :
                    <div className="newsletter_wrapper">
                      <Table
                        pagination={false}
                        dataSource={list}
                        rowClassName="testrow"
                      >
                        <Column
                          title="Email Address"
                          dataIndex="email"
                        />
                        <Column
                          title="Action"
                          render={(key) => (<Link to="#!" onClick={this.openDrawer.bind(this, key)} >Send Mail</Link>)}
                        />
                      </Table>
                    </div>
                } */}
                {
                  NewsLetterData && _.get(NewsLetterData, 'value.NewsLetter', []).length === 0 ?
                    <EmptyData />
                    :
                    <div className="newsletter_wrapper">
                      <div className="table-responsive">
                        <ReactHTMLTableToExcel
                          className="download-table-xls-button"
                          table="email"
                          filename="EmailReport"
                          sheet="Sheet" 
                          buttonText="Export" />
                        <table id="email" className="table table-borderless">
                          <thead>
                          <tr>
                            <td>Email Address</td>
                            <td>Action</td>
                            <td>Activities</td>
                          </tr>
                          </thead>
                          <tbody>
                          { NewsLetterData && _.get(NewsLetterData, 'value.NewsLetter', []).map((value,i)=>(
                          <tr key={i}>
                            <td><p><i className="fas fa-user"></i>{_.get(value,'email','')}</p></td>
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
                    total={totalNewsLetter}
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
