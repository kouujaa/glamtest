import React, { PureComponent } from 'react'
import './styles.scss'

export default class Thankyou extends PureComponent {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render() {
    return (
      <div>
        <div className="thankyou__wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="section__title">
                  <h2>Thankyou</h2>
                  <p> we will get back to you within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
