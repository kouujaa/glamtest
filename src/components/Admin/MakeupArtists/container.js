import { connect } from 'react-redux'
import { addMakeupArtist, getMakeupArtist, deleteMakeupArtist, editMakeupArtist, adminMakeupArtistClearPhase } from '../../../store/admin/makeupArtist/duck'
import MakeupArtistComponent from './index'

const MakeupArtistContainer = connect(
    // Map state to props
    (state) => ({
        addMakeupArtistPhase: state.makeupArtist.addMakeupArtistPhase,
        addMakeupArtistdata : state.makeupArtist.addMakeupArtistdata,
        getMakeupArtistPhase: state.makeupArtist.getMakeupArtistPhase,
        getMakeupArtistdata : state.makeupArtist.getMakeupArtistdata,
        editMakeupArtistPhase: state.makeupArtist.editMakeupArtistPhase,
        editMakeupArtistdata : state.makeupArtist.editMakeupArtistdata,
        deleteMakeupArtistPhase: state.makeupArtist.deleteMakeupArtistPhase,
        deleteMakeupArtistdata : state.makeupArtist.deleteMakeupArtistdata,
    }),

    // Map actions to dispatch and props
    {
        addMakeupArtist,
        getMakeupArtist,
        editMakeupArtist,
        deleteMakeupArtist,
        adminMakeupArtistClearPhase
    }
)(MakeupArtistComponent)

export default MakeupArtistContainer