import React, { PureComponent } from 'react'
import { Select, Rate, Carousel } from 'antd'
import Cookies from 'js-cookie'
import EmptyData from '../Emptypage'
import SalonSkeleton from './salonSkeleton'
import _ from 'lodash'
import $ from 'jquery'
import './styles.scss'

const { Option } = Select

export default class SalonsComponent extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      status : 0,
      salonsData:[],
      hairStylesData : '',
      hairTypesData : '',
      lashTechData: '',
      pricePointsData : '',
      hairStyles:[],
      hairTypes:[],
      lashTechs: [],
      pricePoints:[],
      ratings:0,
      userRatings:0,
      page:1,
      fullPageLoading: false,
      userId:'',
      visible:false,
      id:'',
      disabled:false,
      searchText: '',
    }
  }

  onChange(name, value, e){
    this.setState({ [name] : value })
  }

  async componentDidMount(){
    window.scrollTo(0,0)
    $('#selectID').attr('readonly', true)
    this.setState({ fullPageLoading: true })

    const data = {
      hairStyles : this.state.hairStyles,
      hairTypes : this.state.hairTypes,
      lashTechs: this.state.lashTechs,
      pricePoints : this.state.pricePoints,
      ratings : this.state.ratings, 
      page: this.state.page
    }
    
    this.props.getSignUpData()
    const result = await this.props.getSalonsData(data)
    if(result.value.status === true){
      this.setState({ salonsData : result.value.Salons , fullPageLoading: false })
    }
  } 

  componentDidUpdate(prevProps, prevState){
    if (prevProps.signUpPageDetailsPhase === 'success') {
      if(prevProps.signUpPageDetailsData.success === true){
        this.setState({
          hairStylesData : _.get(prevProps,'signUpPageDetailsData.hairStylist','').sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)),
          hairTypesData : _.get(prevProps,'signUpPageDetailsData.hairTypes',''),
          lashTechData : _.get(prevProps,'signUpPageDetailsData.lashTech',''),
          pricePointsData : _.get(prevProps,'signUpPageDetailsData.pricePoints',''),
        })
      }
    }
    if(prevProps.location.state && this.state.status === 0){
      this.setState({
        hairStyles : prevProps.location.state.detail.HairStyleData,
        hairTypes : prevProps.location.state.detail.HairTypeData,
        lashTechs : prevProps.location.state.detail.LashTechData,
        status : 1 
      })
    }
    this.props.ClearPhase()
    this.props.userClearPhase()
  }

  async Reset(){
    this.setState({
        hairStyles : [],
        hairTypes : [],
        lashTechs: [],
        pricePoints:[],
        ratings:'',
        disabled:false
    })
    const data = {
      hairStyles : [],
      hairTypes : [],
      lashTechs: [],
      pricePoints : [],
      ratings : 0, 
      page: this.state.page
    }
    const result = await this.props.getSalonsData(data)
    if(result.value.status === true){
      this.setState({ salonsData : result.value.Salons })
    }
  }

  async Submit(){
    this.setState({ disabled : true })
    const data = {
      hairStyles : this.state.hairStyles,
      hairTypes : this.state.hairTypes,
      lashTechs: this.state.lashTechs,
      pricePoints : this.state.pricePoints,
      ratings : this.state.ratings, 
      page: this.state.page
    }

    const result = await this.props.getSalonsData(data)
    if(result.value.status === true){
      this.setState({ salonsData : result.value.Salons })
    }
  }

  async SubmitRating(detail, value){
    const userToken = Cookies.get('authToken')
    this.setState({ 
      userRatings : value , 
      userId : detail._id 
    })
    this.forceUpdate()
    const data = {
      userToken : userToken,
      salonsId : detail._id,
      rating : value,
      salonName: detail.salonName 
    }

    const newdata = {
      hairStyles : this.state.hairStyles,
      hairTypes : this.state.hairTypes,
      lashTechs: this.state.lashTechs,
      pricePoints : this.state.pricePoints,
      ratings : this.state.ratings, 
      page: this.state.page
    }

    const result = await this.props.addRatings(data)
    if(result.value.status === true){
      const results = await this.props.UpgradeSalonsRating(data)
      if(results.value.status === true){
        const upgradesalons = await this.props.getSalonsData(newdata)
        if(upgradesalons.value.status === true){
          this.setState({ 
            salonsData : upgradesalons.value.Salons, 
            visible : false,
            id : '',
          })
        }
      }
    }
  }

  handleVisibleChange(id){
    const userToken = Cookies.get('authToken')
    if(userToken){
      this.setState({ 
        visible : true, 
        id:id
      })
    } else {
      this.props.history.push("/login")
    }
  }

  salonsDashboard(value){
    window.open(`/salon/${value._id}`, '_self')
    // this.props.history.push({
    //   pathname : "/salon",
    //   state : { value : value }
    // })
  }

  _handleTextFocus = (e) => {
    e.preventDefault()
    this.setState({
      searchboxStyle: {
        width: '100%'
      }
    })
  }
  async _handleTextBlur(e){
    this.setState({searchText: e.target.value})
    const data = {
      hairStyles : this.state.hairStyles,
      hairTypes : this.state.hairTypes,
      lashTechs: this.state.lashTechs,
      pricePoints : this.state.pricePoints,
      ratings : this.state.ratings, 
      page: this.state.page
    }
    const result = await this.props.getSalonsData(data)
    if(result.value.status === true){
      this.setState({ salonsData : result.value.Salons})
    }
    let currentList = []
    let newList = []
    if(this.state.searchText !== ''){
      currentList = this.state.salonsData
      newList = currentList.filter(item => {
        let lca = item.salonName.toLowerCase()
        let filters = this.state.searchText.toLowerCase()
        return lca.includes(filters)
      })
    }else{
      newList = this.state.salonsData
    }
    this.setState({salonsData: newList})
  }
  render() {
    const { hairTypesData, hairStylesData, lashTechData, salonsData } = this.state

    let hairStyleOption = hairStylesData && hairStylesData.map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    let hairTypeOption = hairTypesData && hairTypesData.map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    let lashTechOption = lashTechData && lashTechData.map((item, index) => {
      return (
        <Option key={index} value={item.title}>{item.title}</Option>
      )
    }, this)

    // let pricePointsOption = pricePointsData && pricePointsData.map((item, index) => {
    //   return (
    //     <Option key={index} value={item.price}>{item.price}</Option>
    //   )
    // }, this)

    const contentStyle = {
      width: '35%',
      height: '160px',
    };

    // const salonsDataList = _.get(salonsData,'value.Salons',[])
    return (
      <div>
      {this.state.fullPageLoading ?
        <SalonSkeleton/>
        :
        <div className="salonspage_wrap">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 p-0">
                <img src="images/salon_banner.jpg" className="img-fluid w-100 bannerheight" />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section__title">
                  <h2>Hair Salons</h2>
                  <p>The House of best salons in the town</p>
                </div>
              </div>
            </div>
          </div>
          <div className="filter_wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <ul>
                    <li>
                      <input type="text"
                        name="searchText"
                        className="salonSearch" 
                        value={this.state.searchText}
                        placeholder="Search Salon" 
                        autoComplete="off"
                        onFocus={this._handleTextFocus}
                        onChange={this._handleTextBlur.bind(this)}
                      />
                    </li>
                    <li>
                      <Select
                        placeholder="Hair Type"
                        showSearch
                        showArrow={true}
                        //mode="multiple"
                        maxTagCount={1}
                        className="select_salonwrap"
                        value={this.state.hairStyles}
                        onChange={this.onChange.bind(this, 'hairStyles')}
                      >
                        {hairStyleOption}
                      </Select>
                    </li>
                    <li>
                      <Select
                        placeholder="Hair Style"
                        showSearch
                        showArrow={true}
                        //mode="multiple"
                        className="select_salonwrap"
                        id="selectID"
                        value={this.state.hairTypes}
                        maxTagCount={1}
                        onChange={this.onChange.bind(this, 'hairTypes')}
                      >
                        {hairTypeOption}
                      </Select>
                    </li>
                    
                    {/* <li>
                      <Select
                        placeholder="Lash Tech"
                        showSearch
                        showArrow={true}
                        //mode="multiple"
                        className="select_salonwrap"
                        id="selectID"
                        value={this.state.lashTechs}
                        maxTagCount={1}
                        onChange={this.onChange.bind(this, 'lashTechs')}
                      >
                        {lashTechOption}
                      </Select>
                    </li> */}
                    {/*<li>
                      <Select
                        showSearch
                        showArrow={true}
                        placeholder="Price Point"
                        className="select_salonwrap"
                        value={this.state.pricePoints}
                        onChange={this.onChange.bind(this, 'pricePoints')}
                      >
                        {pricePointsOption}
                      </Select>
                    </li>*/}
                    <li>
                      <Rate 
                        value={this.state.ratings} 
                        onChange={this.onChange.bind(this, 'ratings')} 
                        defaultValue={1}
                        className="ratings_wrap_salon"
                      />
                    </li>
                    <li>
                      <div className="btn btn_reset" onClick={this.Reset.bind(this)}>Reset</div>
                    </li>
                    <li>
                      <div className="btn btn_apply" onClick={this.Submit.bind(this)}>Apply</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
            <div className="container">
              {/* { salonsData && _.get(salonsData,'value.Salons',[]).length === 0 ? */}
              { salonsData && salonsData.length === 0 ?
                <EmptyData />
              :
                <div className="row">
                  <div className="col-md-12">
                    <div className="salons_wrap">
                      <div className="row">
                        {/* { salonsData && _.get(salonsData,'value.Salons',[]).map((value,i)=>( */}
                          { salonsData && salonsData.map((value,i)=>(
                          <div key={i} className="col-lg-4 col-md-6" onClick={this.salonsDashboard.bind(this, value)}>
                            <div className="card">
                              <div className="card_img">
                                
                                <Carousel autoplay>
                                  {
                                    value.SalonsImage && value.SalonsImage.map(image => 
                                      <div style={contentStyle}>
                                        <img src={image.Location} alt="salon" />
                                      </div>
                                    )
                                  }
                                </Carousel>
                                
                                {/* <img className="card-img-top" src={_.get(value,'SalonsImage[0].Location','/images/Hairtype.png')} alt="" /> */}
                              </div>
                              <div className="salon_description">
                                <h5 className="salon_name">{_.get(value,'salonName','')}</h5>
                                <p className="salon_address">{_.get(value,'salonAddress','')}</p>
                                <div className="ratings_wrap">
                                  <div className="salon_ratings">
                                    <Rate disabled value={_.get(value,'NewRating',0)} />
                                  </div>
                                  {/*<div>
                                    <Popover 
                                      content={
                                        <Rate 
                                          value={this.state.userRatings} 
                                          onChange={this.SubmitRating.bind(this, value)} 
                                          allowHalf 
                                          defaultValue={1}
                                          visible={value._id === this.state.id ? this.state.visible : false}
                                        />
                                      } 
                                      title={null} 
                                      trigger="click"
                                    >
                                      <button onClick={this.handleVisibleChange.bind(this, value._id)} className="btn btn_rate_salon">Rate Salon</button>
                                    </Popover>
                                  </div>*/}
                                </div>
                                <p className="avg_cost">{_.get(value,'pricePoints','')}</p>
                                <p className="salon_speciality">SPECIALTIES: Locs | Natural styling ({_.get(value,'hairstyleServices','').join(', ')}, {_.get(value,'hairType','').join(', ')}, {_.get(value,'lashTech','').join(', ')})</p>
                              </div>
                            </div>
                          </div>
                          ))
                        } 
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
        </div>
      }
      </div>
    )
  }
}
