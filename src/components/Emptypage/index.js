import React, { PureComponent } from "react";
// import PropTypes from 'prop-types'
import Icon from "@ant-design/icons";
import "./styles.scss";

export default class EmptypageComponent extends PureComponent {
  static propTypes = {
    // PropTypes go here
  };

  render() {
    return (
      <div>
        <div className="no_data_page">
          <span>
            <Icon type="cloud" className="icon_cloud" />
            <p className="content">No Data Found</p>
          </span>
        </div>
      </div>
    );
  }
}
