import { connect } from 'react-redux'
import { addHairTypes } from '../../../store/admin/hairTypes/duck'
import { getHairTypes, editHairType, deleteHairType} from '../../../store/admin/hairTypes/duck'
import HairTypesComponent from './index'

const HairTypesContainer = connect(
  // Map state to props
 state=> ({
  	data: state.hairTypesData
  }),
  // Map actions to dispatch and props
  { addHairTypes, 
  	getHairTypes,
  	editHairType,
  	deleteHairType
  }
)(HairTypesComponent)

export default HairTypesContainer



