import { connect } from 'react-redux'
import { getUser, getAllFavSalonById, deleteFavoriteSalon } from '../../../store/user/duck'
import { getSalonsDetailById } from '../../../store/home/salons/duck'
import DashboardComponent from './index'

const DashboardContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
    getUser,
    getAllFavSalonById, 
    deleteFavoriteSalon,
    getSalonsDetailById
  }
)(DashboardComponent)

export default DashboardContainer
