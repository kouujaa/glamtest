import React, { PureComponent } from 'react'
import { Button } from "antd"
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'
import './styles.scss'

export default class HairSalonsComponent extends PureComponent {

  static propTypes = {
    // PropTypes go here
  }

  render() {
    return (
      <div>
        <div className="salons__wrap">
          <div className="container">
            <div className="row">
              {/*<div className="col-md-12">
                <div className="section__title">
                  <h2>Hair Salons</h2>
                  <p>The league of hair slayers</p>
                </div>
              </div>*/}
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-horizontal">
                        <div className="img__wrapper">
                          <img src="/images/salons.jpg" alt="" />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">Your crown matters.</h4>
                          <p className="card-text">“Working in a salon, you look at trends all day long. You’re looking at color all the time,what new products are coming out. You’re a part of the fashion industry, especially if you’re working in a higher-end salon.” to Invest in your hair, it is the crown you never take off.</p>
                          <Link to="/salons"><Button type="primary" shape="round">
                            Explore
                            <i className="fas fa-long-arrow-alt-right"></i>
                          </Button></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
