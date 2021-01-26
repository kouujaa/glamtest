import React, { PureComponent } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Drawer, Upload, Modal } from "antd";
import Icon from "@ant-design/icons";
import "antd/dist/antd.css";
import { LashTechSchema } from "../../../utils/validations";
import "./styles.scss";

export default class ViewDrawer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      title: this.props.title,
      subtitle: this.props.subtitle,
      description: this.props.description,
      visible: this.props.visible,
      handlelashtechs: this.props.handlelashtechs,
      editLashTech: this.props.editLashTech,
      editLashTechId: this.props.editLashTechId,
      selectedFile: this.props.selectedFile,
      url: this.props.pocketPhoto
    };
  }

  onClose = () => {
    this.setState({ visible: false });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps) {
      return {
        image: nextProps.image,
        title: nextProps.title,
        subtitle: nextProps.subtitle,
        description: nextProps.description,
        visible: nextProps.visible,
        LashTechData: nextProps.LashTechData,
        editLashTech: nextProps.editLashTech,
        editLashTechId: nextProps.editLashTechId,
        previewVisible: nextProps.previewVisible,
        previewImage: nextProps.previewImage,
        fileList: nextProps.fileList,
        url: nextProps.pocketPhoto
      };
    } else {
      return null;
    }
  }

  showDrawer() {
    this.props.showDrawer("2");
  }

  render() {
    const { editLashTech } = this.state;
    if (editLashTech === false) {
      this.setState({
        image: "",
        title: "",
        subtitle: "",
        description: ""
      });
    }
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Drawer
          title="LashTech Form"
          placement="right"
          closable={true}
          onClose={this.props.onClose}
          visible={this.props.visible}
          width={500}
          className="drawer_add_dashboard"
        >
          <Formik
            initialValues={{
              image: this.state.image,
              title: this.state.title,
              subtitle: this.state.subtitle,
              description: this.state.description
            }}
            enableReinitialize
            validationSchema={LashTechSchema}
            onSubmit={this.props.handlelashtechs}
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
                  <label className="label_form">Image</label>
                  <Upload
                    multiple={false}
                    listType="picture-card"
                    className="avatar-uploader img_uploader"
                    fileList={this.props.fileList}
                    onPreview={this.props.handlePreview}
                    onChange={this.props.handleChangeFile}
                    customRequest={this.props.dummyRequest}
                  >
                    {this.props.fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={this.props.previewVisible}
                    footer={null}
                    onCancel={this.props.handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={this.props.previewImage}
                    />
                  </Modal>
                  <ErrorMessage name="image" component="span" />
                </div>
                <div className="form-group">
                  <label className="label_form">Title</label>
                  <Field
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={values.title || ""}
                    className="form-control input"
                    placeholder="Title"
                  />
                  <ErrorMessage name="title" component="span" />
                </div>
                <div className="form-group">
                  <label className="label_form">Subtitle [Optional]</label>
                  <Field
                    name="subtitle"
                    type="text"
                    onChange={handleChange}
                    value={values.subtitle || ""}
                    className="form-control input"
                    placeholder="Subtitle"
                  />
                  <ErrorMessage name="subtitle" component="span" />
                </div>
                <div className="form-group">
                  <label className="label_form">Description</label>
                  <Field
                    name="description"
                    type="text"
                    onChange={handleChange}
                    value={values.description || ""}
                    className="form-control input"
                    placeholder="Description"
                  />
                  <ErrorMessage name="description" component="span" />
                </div>
                <div className="btn_wrap">
                  <button type="button" className="btn" onClick={handleSubmit}>
                    {editLashTech ? "Edit" : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Drawer>
      </div>
    );
  }
}
