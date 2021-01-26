import { Carousel } from 'antd'
import React, { PureComponent } from 'react'

class CoverImage extends PureComponent {
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
                this.setState({ salonImage: payload.salon.SalonsImage})
            })
            .catch(error => {
              throw error
            })
    }
    render(){
        const { salonImage } = this.state
        const contentStyle = {
          width: '35%',
          height: '160px',
        };
        
        return(
            // <img alt="example" src={salonImage ? salonImage : '/images/User_male.png'}  />
            <Carousel autoplay dots={false}>
              {
                salonImage && salonImage.map(image => 
                  <div style={contentStyle}>
                    <img style={{ width: '100%',height: '238px',objectFit: 'cover'}} src={image.Location} alt="cover" />
                  </div>
                )
              }
            </Carousel>
        )
    }
}

export default CoverImage