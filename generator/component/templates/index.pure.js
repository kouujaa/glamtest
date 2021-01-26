import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

import './styles.scss'

const COMPONENT_CLASSNAME = '<%= componentName %>'

export default class <%= componentName %> extends PureComponent {

  static propTypes = {
    // PropTypes go here
  }

  static defaultProps = {
    // Default Props go here
  }

  render() {
    return (
      <span className={COMPONENT_CLASSNAME}><%= componentName %></span>
    )
  }

}
