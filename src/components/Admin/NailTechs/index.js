import React, { PureComponent } from "react";
import _ from "lodash";
import { Card, Button, Popconfirm, Spin, message } from "antd";
import Icon from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
import ViewDrawer from "./view";
import EmptyData from "../../Emptypage";

const { Meta } = Card;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class NailTechComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      title: "",
      subtitle: "",
      description: "",
      newDrawer: false,
      visible: false,
      NailTechData: "",
      editNailTech: false,
      editNailTechId: "",
      current: 1,
      page: 0,
      totalPage: 0,
      text: "",
      loading: true,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      files: [],
      pocketPhoto: []
    };
  }

  componentDidMount() {
    this.props.getNailTechs({ page: this.state.page, text: this.state.text });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.getNailTechsPhase === "success") {
      if (prevProps.getNailTechsdata.success === true) {
        this.setState({
          NailTechData: _.get(prevProps, "getNailTechsdata.nailTechs", ""),
          totalLength: _.get(prevProps, "getNailTechsdata.totalLength", ""),
          totalPage: _.get(prevProps, "getNailTechsdata.totalPage", ""),
          loading: false,
          visible: false
        });
      }
    }
    if (prevProps.addNailTechsPhase === "success") {
      if (prevProps.addNailTechsdata.status === true) {
        this.setState({ loading: false, visible: false });
        message.success(_.get(prevProps, "addNailTechsdata.message", ""));
        this.componentDidMount();
      }
    }
    if (prevProps.editNailTechsPhase === "success") {
      if (prevProps.editNailTechsdata.status === true) {
        this.setState({ loading: false, visible: false });
        message.success(_.get(prevProps, "editNailTechsdata.message", ""));
        this.componentDidMount();
      }
    }
    if (prevProps.deleteNailTechsPhase === "success") {
      if (prevProps.deleteNailTechsdata.status === true) {
        this.setState({ loading: false, visible: false });
        message.success(_.get(prevProps, "deleteNailTechsdata.message", ""));
        this.componentDidMount();
      }
    }
    this.props.adminNailTechsClearPhase();
  }

  onClose() {
    this.setState({ visible: false });
  }

  cancel(e) {}

  dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  beforeUpload(file) {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error("You can only upload PNG file!");
      return false;
    }
  }

  onRemove() {
    this.setState({ fileList: [] });
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChangeFile = ({ file, fileList }) => {
    const arr = [fileList.slice(-1)[0]];
    this.setState({ fileList: arr });

    let files = [file.originFileObj];

    var MAX_UPLOAD_SIZE = 3145728;
    var _URL = window.URL || window.webkitURL;
    this.setState({
      files: files
    });
    let self = this;
    let pocket = [];
    files.forEach(file => {
      if (_.get(file, "type", "")) {
        if (file.type.split("/")[0] === "image") {
          if (file.size < MAX_UPLOAD_SIZE) {
            var img = new Image();
            let reader = new FileReader();
            reader.onloadend = () => {
              img.src = _URL.createObjectURL(file);
              img.onload = function() {
                //pocket.push({ name: file.name, imagePreviewUrl: reader.result })
                pocket.push({ name: file.name, Location: reader.result });
                self.setState({ pocketPhoto: pocket, pocketPhotoError: "" });
                self.forceUpdate();
              };
            };
            reader.readAsDataURL(file);
          } else {
            alert("Please insert a file less than 3 MB!");
          }
        } else {
          // toast("File Type Invalid")
        }
      } else {
        // toast("File Type Invalid")
      }
    });
  };

  searchNailTechData = e => {
    this.setState({ text: e.target.value });
    const payload = {
      text: e.target.value
    };
    this.props.getNailTechs(payload);
  };

  deleteNailTech(id) {
    this.setState({ loading: true });
    this.props.deleteNailTechs(id);
  }

  handlenailTech = async values => {
    const { editNailTech, editNailTechId } = this.state;

    if (!editNailTech) {
      this.setState({ loading: true });
      const data = {
        title: _.get(values, "title", ""),
        subtitle: _.get(values, "subtitle", ""),
        description: _.get(values, "description", ""),
        image: this.state.pocketPhoto
      };
      this.props.addNailTechs(data);
    } else {
      this.setState({ loading: true });
      const editData = {
        title: _.get(values, "title", ""),
        subtitle: _.get(values, "subtitle", ""),
        description: _.get(values, "description", ""),
        _id: editNailTechId
      };
      if (this.state.fileList.length !== 0) {
        editData.image = this.state.pocketPhoto;
      }
      this.props.editNailTechs(editData);
    }
  };

  showDrawer(id) {
    let value = id;
    const { NailTechData } = this.state;
    if (value) {
      let nailTech = NailTechData;
      let editData = _.filter(nailTech, { _id: value });
      this.setState({
        visible: true,
        editNailTech: true,
        editNailTechId: value,
        image: editData[0].image,
        title: editData[0].title,
        subtitle: editData[0].subtitle,
        description: editData[0].description
      });
    } else {
      this.setState({
        visible: true,
        editNailTech: false,
        title: "",
        subtitle: "",
        description: ""
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });
  render() {
    const { NailTechData } = this.state;
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="search_wrapper">
                  <form className="form-inline">
                    <div className="form-group mr-3">
                      <input
                        onChange={this.searchNailTechData.bind(this)}
                        type="text"
                        className="form-control search_input"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>

                <ViewDrawer
                  onClose={this.onClose.bind(this)}
                  handlenailTech={this.handlenailTech.bind(this)}
                  handleCancel={this.handleCancel.bind(this)}
                  showDrawer={this.showDrawer.bind(this)}
                  handleChangeFile={this.handleChangeFile.bind(this)}
                  beforeUpload={this.beforeUpload.bind(this)}
                  dummyRequest={this.dummyRequest.bind(this)}
                  {...this.state}
                />

                {NailTechData && NailTechData.length === 0 ? <EmptyData /> : ""}

                <div className="nailtech_wrapper">
                  <div className="row">
                    {NailTechData &&
                      NailTechData.map((value, i) => (
                        <div key={i} className="col-lg-3 col-md-4 col-sm-12">
                          <Card
                            hoverable
                            className="card_nailtech"
                            cover={
                              <img
                                alt="example"
                                src={_.get(
                                  value,
                                  "image[0].Location",
                                  "/images/User_male.png"
                                )}
                              />
                            }
                            actions={[
                              <Icon
                                onClick={this.showDrawer.bind(this, value._id)}
                                type="edit"
                                key="edit"
                                className="edit"
                              />,
                              <Popconfirm
                                title="Are you sure delete this NailTech?"
                                onConfirm={this.deleteNailTech.bind(
                                  this,
                                  value._id
                                )}
                                onCancel={this.cancel}
                                overlayClassName="popconfirm_wrapper"
                                okText="Yes"
                                cancelText="No"
                              >
                                <Icon
                                  type="delete"
                                  key="delete"
                                  className="delete"
                                ></Icon>
                              </Popconfirm>
                            ]}
                          >
                            <Meta
                              title={_.get(value, "title", "")}
                              description={_.get(value, "description", "")}
                            />
                          </Card>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="add_content_btn">
                  <Button
                    type="primary"
                    onClick={this.showDrawer.bind(this, null)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}
