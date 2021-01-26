import { connect } from 'react-redux'
import { getSalonsData } from '../../store/home/salons/duck'
import { getBestLashTech } from '../../store/home/lashTechs/duck'
import LashTechsComponent from './index'

const LashTechsContainer = connect(
// Map state to props
  (/*state*/) => ({}),
// Map actions to dispatch and props
  {
    getBestLashTech,
    getSalonsData
  }
)(LashTechsComponent)

export default LashTechsContainer