import { connect } from 'react-redux'
import { getSalonsDetailById, addservicebooking, addSalonFavorite, getFavoriteSalonById } from '../../store/home/salons/duck'
import { addNewRating, UpgradeSalonsNewRating } from '../../store/home/ratings/duck'
import { getUser } from '../../store/user/duck'
import SalonComponent from './index'

const SalonContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	getSalonsDetailById,
    addNewRating,
    addservicebooking,
    UpgradeSalonsNewRating,
    addSalonFavorite,
    getFavoriteSalonById,
    getUser
  }
)(SalonComponent)

export default SalonContainer
