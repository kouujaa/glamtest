import { connect } from 'react-redux'
import {addservicebooking } from '../../store/home/salons/duck'
import CartComponent from './index'

const CartContainer = connect(
    // Map state to props
    (/*state*/) => ({}),
    // Map actions to dispatch and props
    {
        addservicebooking
    }
)(CartComponent)

export default CartContainer