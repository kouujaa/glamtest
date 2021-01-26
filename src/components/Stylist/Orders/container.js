import { connect } from 'react-redux'
import OrderComponent from './index'
import { getSalonOrdersById, UpdateOrderStatus } from '../../../store/user/duck'

const OrderContainer = connect(
    //Map state to Props
    (/*state*/) => ({}),

    // Map actions to dispatch and props
    {
        getSalonOrdersById,
        UpdateOrderStatus
    }
)(OrderComponent)

export default OrderContainer