import { connect } from 'react-redux'
import { getAllOrders } from '../../../store/admin/users/duck'
import OrderComponent from './index'

const OrderContainer = connect(
    // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
    getAllOrders
  }
)(OrderComponent)

export default OrderContainer