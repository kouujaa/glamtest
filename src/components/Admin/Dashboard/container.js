import { connect } from 'react-redux'
import { getHomePageData } from '../../../store/admin/users/duck'
import DashboardComponent from './index'

const DashboardContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  { 
  	getHomePageData 
  }
)(DashboardComponent)

export default DashboardContainer
