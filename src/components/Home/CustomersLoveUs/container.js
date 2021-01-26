import { connect } from 'react-redux'
import { customersLoveUs } from '../../../store/home/salons/duck'
import CustomersLoveUsComponent from './index'

const CustomersLoveUsContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	customersLoveUs
  }
)(CustomersLoveUsComponent)

export default CustomersLoveUsContainer
