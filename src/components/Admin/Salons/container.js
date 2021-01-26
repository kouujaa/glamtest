import { connect } from 'react-redux'
import { getSalons, salonsClearPhase } from '../../../store/admin/salons/duck'
import { UpdateSalonsStatus } from '../../../store/user/duck'
import SalonsComponent from './index'

const SalonsContainer = connect(
  // Map state to props
  state => ({
  	salonsdata : state.salons.salonsdata,
  	salonsPhase : state.salons.salonsPhase 
  }),
  // Map actions to dispatch and props
  { getSalons,
  	UpdateSalonsStatus,
  	salonsClearPhase 
  }
)(SalonsComponent)

export default SalonsContainer
