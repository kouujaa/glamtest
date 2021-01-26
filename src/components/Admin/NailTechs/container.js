import { connect } from 'react-redux'
import { addNailTechs, editNailTechs, getNailTechs, deleteNailTechs, adminNailTechsClearPhase } from '../../../store/admin/nailTechs/duck'
import NailTechComponent from './index'

const NailTechContainer = connect(
    // Map state to props
    (state) => ({
        addNailTechsPhase: state.nailTech.addNailTechsPhase,
        addNailTechsdata : state.nailTech.addNailTechsdata,
        getNailTechsPhase: state.nailTech.getNailTechsPhase,
        getNailTechsdata : state.nailTech.getNailTechsdata,
        editNailTechsPhase: state.nailTech.editNailTechsPhase,
        editNailTechsdata : state.nailTech.editNailTechsdata,
        deleteNailTechsPhase: state.nailTech.deleteNailTechsPhase,
        deleteNailTechsdata : state.nailTech.deleteNailTechsdata,
    }),

    // Map actions to dispatch and props
    {
        addNailTechs,
        editNailTechs,
        getNailTechs,
        deleteNailTechs,
        adminNailTechsClearPhase
    }
)(NailTechComponent)

export default NailTechContainer