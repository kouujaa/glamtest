import React, { PureComponent } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Drawer, Spin } from 'antd'
import CKEditor from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import './styles.scss'

export default class SendMailComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible,
      to:this.props.to,
      subject:this.props.subject,
      body:this.props.body,
      buttonDisable: this.props.buttonDisable,
      button: this.props.button,
      mailDrawerLoading: this.props.mailDrawerLoading,
      message: this.props.message,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps){
      return {
        visible: nextProps.visible,
        to:nextProps.to,
        subject:nextProps.subject,
        body:nextProps.body,
        buttonDisable: nextProps.buttonDisable,
        button: nextProps.button,
        mailDrawerLoading: nextProps.mailDrawerLoading,
        message: nextProps.message
      }
    } 
    else {
      return null
    }
  }

  render() {
    return (
      <div className="drawer_mail_dashboard">
        <Drawer
          title="Send Mail"
          placement="right"
          closable={true}
          onClose={this.props.onClose.bind(this)}
          visible={this.state.visible}
          width={600}
          className="drawer_mail_dashboard"
        >
          <Spin spinning={this.state.mailDrawerLoading}>
          <Formik
          initialValues={{
            to:this.state.to,
            subject:this.state.subject,
            body:this.state.body
          }}
          enableReinitialize
          onSubmit={this.props.sendMail.bind(this)}
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
              <label className="label_form">To</label>
              <Field
                name="to"
                type="text"
                onChange={handleChange}
                value={values.to || ''}
                className="form-control input"
                placeholder="Title"
              />
              <ErrorMessage name="title" component="span" />
            </div>
            <div className="form-group">
              <label className="label_form">Subject</label>
              <Field
                name="subject"
                type="text"
                onChange={handleChange}
                value={values.subject || ''}
                className="form-control input"
                placeholder="Subject"
              />
              <ErrorMessage name="subject" component="span" />
            </div>
            <div className="form-group text_editor">
              <label className="label_form">Body</label>
              <CKEditor
                  onInit={ editor => {
                      editor.ui
                        .getEditableElement()
                        .parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.getEditableElement()
                        )
                  } }
                  onChange={ ( event, editor ) => 
                        setFieldValue('body', editor.getData())
                      }
                  editor={ DecoupledEditor }
                  data={values.body || ''}
              />
              <ErrorMessage name="body" component="span" />
            </div>
            <div className="btn_wrap">
              {/*<button type="button" onClick={handleSubmit}>Send</button>*/}
              <button 
                type="button" 
                className="btn" 
                onClick={handleSubmit} 
                disabled={this.state.buttonDisable}
              >
                {this.state.button ? 'Send' : 'Please Wait...'}
              </button>
              <p>{this.state.message}</p>
            </div>
          </Form>
            )}
          </Formik>
          </Spin>
      </Drawer>
      </div>
    )
  }
}
