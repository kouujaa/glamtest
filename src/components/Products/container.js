import { connect } from 'react-redux'
import ProductsComponent from './index'

const ProductsContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(ProductsComponent)

export default ProductsContainer
