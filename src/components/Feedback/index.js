import React, { PureComponent } from 'react'
import './styles.scss'

export default class FeedbackComponent extends PureComponent {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="feedback_wrap">
        <div className="container">
          <div className="col-md-12">
            <h1>Hair Information</h1>
          </div>
        </div>
      </div>
    )
  }
}
