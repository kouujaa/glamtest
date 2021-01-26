import React, { PureComponent } from 'react'
import CountdownTimer from "react-component-countdown-timer"
import './style.scss'
import { Formik, Form, ErrorMessage } from 'formik'
import { LandingPageSchema } from '../../utils/validations'
import { message } from 'antd'

class LandingPage extends PureComponent {

    state = {
        email: ''
    }

    handleUser = async(values, {resetForm}) => {
        const result = await this.props.landingPageNotify(values)
        if(result.value.status === true){
            message.success(result.value.message)
            resetForm({});
        }
    }
    render(){
        let currentDate = new Date()
        let nextDate = new Date('5/30/2021')
        let seconds = (nextDate-currentDate)/1000
        return(
            <div className="main-content">
                <div className="main-content-inner">
                    <div className="image-container">
                        <img src="./images/bghome.jpg" class="banner-img" alt="home background" />
                        <div className="overlay"></div>
                    </div>
                    <div className="top-head">
                        <img src="./images/Logo_Glamplug.svg" alt="logo" />
                    </div>
                    <div className="bottom-container">
                        <Formik 
                            onSubmit={this.handleUser} 
                            validationSchema={LandingPageSchema}
                            enableReinitialize
                            initialValues = {{ email: ''}}
                            >
                            {
                                ({
                                    values,
                                    handleChange,
                                    handleSubmit
                                }) => 
                                (
                                    <Form>
                                        <div className="insert-mail-form">
                                            <input 
                                                name="email"
                                                type="email"  
                                                onChange={handleChange} 
                                                autoComplete="off"
                                                placeholder="INSERT YOUR EMAIL" 
                                                value={values.email || ''}
                                                />
                                            <ErrorMessage 
                                                name="email"
                                                component="span"
                                                className="error_message"
                                            />
                                            <button type="button" onClick={handleSubmit} className="submit-btn">Notify Me</button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                        <div className="time-container">
                            <CountdownTimer count={seconds} size={12} labelSize={10} showTitle  />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage