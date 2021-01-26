import React, { PureComponent } from 'react'

class SalonImage extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            salonImage : ''
        }
    }

    async componentDidMount(){
        const salon_id = this.props.salonId
        const data = {
          id : salon_id
        }

        fetch(`${process.env.REACT_APP_API_HOSTNAME}/getSalonsDetailById?id=${data.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              return res.json()
            })
            .then(payload => {
                this.setState({ salonImage: payload.salon.SalonsImage[0].Location})
            })
            .catch(error => {
              throw error
            })
    }
    render(){
        const { salonImage } = this.state
        return(
            <img alt="salon" src={salonImage ? salonImage : '/images/User_male.png'}  />
        )
    }
}

export default SalonImage