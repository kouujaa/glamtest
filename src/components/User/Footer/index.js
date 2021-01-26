import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

import './styles.scss'

export default class FooterComponent extends PureComponent {

  static propTypes = {
    // PropTypes go here
  }

  render() {
    return (
      <div>
        <div className="footer_dashboard">
          <p>Copyright © 2019-2020 theglamplug.com. All Rights Reserved.</p>
          <a href="#!">info@theglamplug.ca</a>
        </div>
      </div>
    )
  }
}
