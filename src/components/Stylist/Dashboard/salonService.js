import React, { PureComponent } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Drawer } from 'antd'
// import _ from 'lodash'
import 'antd/dist/antd.css'
import { SalonServiceSchema } from '../../../utils/validations'
import './styles.scss'

export default class ViewDrawer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      serviceName: this.props.serviceName,
      description: this.props.description,
      price: this.props.price,
      visible: this.props.visible,
      editService: this.props.editService,
      editServiceId: this.props.editServiceId,
    }
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps) {
      return {
        serviceName: nextProps.serviceName,
        description: nextProps.description,
        price: nextProps.price,
        visible: nextProps.visible,
        editService: nextProps.editService,
        editServiceId: nextProps.editServiceId,
      }
    } else {
      return null
    }
  }

  render() {
    const { editService } = this.state
    return (
      <div>
        <Drawer
          title="Service Form"
          placement="right"
          closable={true}
          onClose={this.props.onClose}
          visible={this.state.visible}
          width={500}
          className="drawer_add_dashboard"
        >
          <Formik
            initialValues={{
              serviceName: this.state.serviceName,
              description: this.state.description,
              price: this.state.price
            }}
            enableReinitialize
            validationSchema={SalonServiceSchema}
            onSubmit={this.props.handleServices}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              setFieldValue,
              handleSubmit,
              isSubmitting
            }) => (
                <Form>
                  <div className="form-group">
                    <label className="label_form">Name</label>
                    <Field
                      name="serviceName"
                      type="text"
                      onChange={handleChange}
                      value={values.serviceName || ''}
                      className="form-control input"
                      placeholder="Name"
                    />
                    <ErrorMessage name="serviceName" component="span" />
                  </div>
                  <div className="form-group">
                    <label className="label_form">Description</label>
                    <Field
                      name="description"
                      type="text"
                      onChange={handleChange}
                      value={values.description || ''}
                      className="form-control input"
                      placeholder="Description"
                    />
                    <ErrorMessage name="description" component="span" />
                  </div>
                  <div className="form-group">
                    <label className="label_form">Price</label>
                    <Field
                      name="price"
                      type="number"
                      onChange={handleChange}
                      value={values.price || ''}
                      className="form-control input"
                      placeholder="Price"
                    />
                    <ErrorMessage name="price" component="span" />
                  </div>
                  <div className="btn_wrap">
                    <button type="button" className="btn" onClick={handleSubmit} >{editService ? 'Edit' : 'Submit'}</button>
                  </div>
                </Form>
              )}
          </Formik>
        </Drawer>
      </div>
    )
  }
}
