import { connect } from 'react-redux'
import { addHairStylist, getHairStylist, editHairStylist, deleteHairStylist, adminHairStylesClearPhase } from '../../../store/admin/hairStyles/duck'
import HairStylesComponent from './index'

const HairStylesContainer = connect(
  // Map state to props
  state=> ({
  	addHairStylesPhase: state.hairStylist.addHairStylesPhase,
    addHairStylesdata : state.hairStylist.addHairStylesdata,
    getHairStylesPhase: state.hairStylist.getHairStylesPhase,
    getHairStylesdata : state.hairStylist.getHairStylesdata,
    editHairStylesPhase: state.hairStylist.editHairStylesPhase,
    editHairStylesdata : state.hairStylist.editHairStylesdata,
    deleteHairStylesPhase: state.hairStylist.deleteHairStylesPhase,
    deleteHairStylesdata : state.hairStylist.deleteHairStylesdata,
  }),
  // Map actions to dispatch and props
  { addHairStylist, 
  	getHairStylist,
  	editHairStylist,
  	deleteHairStylist,
  	adminHairStylesClearPhase 
  }
)(HairStylesComponent)

export default HairStylesContainer
