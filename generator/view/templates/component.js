import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

import './styles.scss'

export default class <%= viewName %>Component extends PureComponent {

  static propTypes = {
    // PropTypes go here
  }

  render() {
    return (
      <div>
        <h1><%= viewName %></h1>
      </div>
    )
  }
}
