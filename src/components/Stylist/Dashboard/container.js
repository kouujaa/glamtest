import { connect } from 'react-redux'
import { getSalonsDataById, UpdateSalonsImages } from '../../../store/home/salons/duck'
import { addSalonService, editSalonService, deleteSalonService } from '../../../store/admin/salons/duck'
import DashboardComponent from './index'

const DashboardContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	getSalonsDataById,
  	UpdateSalonsImages,
    addSalonService,
  	editSalonService,
  	deleteSalonService
  }
)(DashboardComponent)

export default DashboardContainer
