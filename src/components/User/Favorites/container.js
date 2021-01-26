import { connect } from 'react-redux'
import { getAllFavSalonById, deleteFavoriteSalon } from '../../../store/user/duck'
import { getSalonsDetailById } from '../../../store/home/salons/duck'
import FavoriteComponent from './index'

const FavoriteContainer = connect(
   // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  { 
    getSalonsDetailById,
    getAllFavSalonById, 
    deleteFavoriteSalon 
  }
)(FavoriteComponent)

export default FavoriteContainer