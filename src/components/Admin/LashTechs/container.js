import { connect } from 'react-redux'
import { addLashTech, getLashTech, editLashTech, deleteLashTech, adminLashTechClearPhase } from '../../../store/admin/lashTech/duck'
import LashTechsComponent from './index'

const LashTechsContainer = connect(
    // Map state to props
    state=> ({
        addLashTechPhase: state.lashTech.addLashTechPhase,
        addLashTechData : state.lashTech.addLashTechData,
        getLashTechPhase: state.lashTech.getLashTechPhase,
        getLashTechdata : state.lashTech.getLashTechdata,
        editLashTechPhase: state.lashTech.editLashTechPhase,
        editLashTechdata : state.lashTech.editLashTechdata,
        deleteLashTechPhase: state.lashTech.deleteLashTechPhase,
        deleteLashTechdata : state.lashTech.deleteLashTechdata,
    }),
    // Map actions to dispatch and props
    {
        addLashTech,
        getLashTech,
        editLashTech,
        deleteLashTech,
        adminLashTechClearPhase
    }
    
)(LashTechsComponent)

export default LashTechsContainer