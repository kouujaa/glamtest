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

export default class MakeupArtistComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      title: "",
      subtitle: "",
      description: "",
      newDrawer: false,
      visible: false,
      MakeupArtistData: "",
      editMakeupArtist: false,
      editMakeupArtistId: "",
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
    this.props.getMakeupArtist({
      page: this.state.page,
      text: this.state.text
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.getMakeupArtistPhase === "success") {
      if (prevProps.getMakeupArtistdata.success === true) {
        this.setState({
          MakeupArtistData: _.get(
            prevProps,
            "getMakeupArtistdata.makeupArtist",
            ""
          ),
          totalLength: _.get(prevProps, "getMakeupArtistdata.totalLength", ""),
          totalPage: _.get(prevProps, "getMakeupArtistdata.totalPage", ""),
          loading: false,
          visible: false
        });
      }
    }
    if (prevProps.addMakeupArtistPhase === "success") {
      if (prevProps.addMakeupArtistdata.status === true) {
        this.setState({ loading: false, visible: false });
        message.success(_.get(prevProps, "addMakeupArtistdata.message", ""));
        this.componentDidMount();
      }
    }
    if (prevProps.editMakeupArtistPhase === "success") {
      if (prevProps.editMakeupArtistdata.status === true) {
        this.setState({ loading: false, visible: false });
        message.success(_.get(prevProps, "editMakeupArtistdata.message", ""));
        this.componentDidMount();
      }
    }
    if (prevProps.deleteMakeupArtistPhase === "success") {
      if (prevProps.deleteMakeupArtistdata.status === true) {
        this.setState({ loading: false, visible: false });
        message.success(_.get(prevProps, "deleteMakeupArtistdata.message", ""));
        this.componentDidMount();
      }
    }
    this.props.adminMakeupArtistClearPhase();
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

  searchMakeupArtistData = e => {
    this.setState({ text: e.target.value });
    const payload = {
      text: e.target.value
    };
    this.props.getMakeupArtist(payload);
  };

  handlemakeupArtist = async values => {
    const { editMakeupArtist, editMakeupArtistId } = this.state;

    if (!editMakeupArtist) {
      this.setState({ loading: true });
      const data = {
        title: _.get(values, "title", ""),
        subtitle: _.get(values, "subtitle", ""),
        description: _.get(values, "description", ""),
        image: this.state.pocketPhoto
      };
      this.props.addMakeupArtist(data);
    } else {
      this.setState({ loading: true });
      const editData = {
        title: _.get(values, "title", ""),
        subtitle: _.get(values, "subtitle", ""),
        description: _.get(values, "description", ""),
        _id: editMakeupArtistId
      };
      // if ((this.state.fileList).length !== 0) {
      //     editData.image = this.state.fileList
      // }
      if (this.state.pocketPhoto.length !== 0) {
        editData.image = this.state.pocketPhoto;
      }
      this.props.editMakeupArtist(editData);
    }
  };

  showDrawer(id) {
    let value = id;
    const { MakeupArtistData } = this.state;
    if (value) {
      let makeupArtist = MakeupArtistData;
      let editData = _.filter(makeupArtist, { _id: value });
      this.setState({
        visible: true,
        editMakeupArtist: true,
        editMakeupArtistId: value,
        image: editData[0].image,
        title: editData[0].title,
        subtitle: editData[0].subtitle,
        description: editData[0].description
      });
    } else {
      this.setState({
        visible: true,
        editMakeupArtist: false,
        title: "",
        subtitle: "",
        description: ""
      });
    }
  }
  deleteMakeupArtist(id) {
    this.setState({ loading: true });
    this.props.deleteMakeupArtist(id);
  }

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { MakeupArtistData } = this.state;
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
                        onChange={this.searchMakeupArtistData.bind(this)}
                        type="text"
                        className="form-control search_input"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>

                <ViewDrawer
                  onClose={this.onClose.bind(this)}
                  handlemakeupArtist={this.handlemakeupArtist.bind(this)}
                  handleCancel={this.handleCancel.bind(this)}
                  showDrawer={this.showDrawer.bind(this)}
                  handleChangeFile={this.handleChangeFile.bind(this)}
                  beforeUpload={this.beforeUpload.bind(this)}
                  dummyRequest={this.dummyRequest.bind(this)}
                  {...this.state}
                />

                {MakeupArtistData && MakeupArtistData.length === 0 ? (
                  <EmptyData />
                ) : (
                  ""
                )}

                <div className="makeupartist_wrapper">
                  <div className="row">
                    {MakeupArtistData &&
                      MakeupArtistData.map((value, i) => (
                        <div key={i} className="col-lg-3 col-md-4 col-sm-12">
                          <Card
                            hoverable
                            className="card_makeupartist"
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
                                title="Are you sure delete this MakeupArtist?"
                                onConfirm={this.deleteMakeupArtist.bind(
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
