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

export default class LashTechsComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      image: [],
      title: "",
      subtitle: "",
      description: "",
      newDrawer: false,
      visible: false,
      LashTechData: "",
      editLashTech: false,
      editLashTechId: "",
      current: 1,
      page: 0,
      totalPage: 0,
      text: "",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      files: [],
      pocketPhoto: []
    };
  }

  componentDidMount() {
    this.props.getLashTech({ page: this.state.page, text: this.state.text });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.addLashTechPhase === "success") {
      if (prevProps.addLashTechData.status === true) {
        this.setState({ loading: false, visible: false });
        message.success(_.get(prevProps, "addLashTechData.message", ""));
        this.componentDidMount();
      }
    }
    if (prevProps.getLashTechPhase === "success") {
      if (prevProps.getLashTechdata.success === true) {
        this.setState({
          LashTechData: _.get(prevProps, "getLashTechdata.lashTech", ""),
          totalLength: _.get(prevProps, "getLashTechdata.totalLength", ""),
          totalPage: _.get(prevProps, "getLashTechdata.totalPage", ""),
          loading: false,
          visible: false
        });
      }
    }
    if (prevProps.editLashTechPhase === "success") {
      if (prevProps.editLashTechdata.status === true) {
        this.setState({ loading: false, visible: false });
        message.success(_.get(prevProps, "editLashTechdata.message", ""));
        this.componentDidMount();
      }
    }
    if (prevProps.deleteLashTechPhase === "success") {
      if (prevProps.deleteLashTechdata.status === true) {
        this.setState({ loading: false, visible: false });
        message.success(_.get(prevProps, "deleteLashTechdata.message", ""));
        this.componentDidMount();
      }
    }
    this.props.adminLashTechClearPhase();
  }

  onClose() {
    this.setState({ visible: false });
  }

  handlelashtechs = async values => {
    const { editLashTech, editLashTechId } = this.state;
    if (!editLashTech) {
      this.setState({ loading: true });
      const data = {
        title: _.get(values, "title", ""),
        subtitle: _.get(values, "subtitle", ""),
        description: _.get(values, "description", ""),
        image: this.state.pocketPhoto
      };
      this.props.addLashTech(data);
    } else {
      this.setState({ loading: true });
      const editData = {
        title: _.get(values, "title", ""),
        subtitle: _.get(values, "subtitle", ""),
        description: _.get(values, "description", ""),
        _id: editLashTechId
      };
      // if ((this.state.fileList).length !== 0) {
      //   editData.image = this.state.fileList
      // }
      if (this.state.pocketPhoto.length !== 0) {
        editData.image = this.state.pocketPhoto;
      }
      this.props.editLashTech(editData);
    }
  };
  handleCancel = () => this.setState({ previewVisible: false });

  showDrawer(id) {
    let value = id;
    const { LashTechData } = this.state;
    if (value) {
      let lashtech = LashTechData;
      let editData = _.filter(lashtech, { _id: value });
      this.setState({
        visible: true,
        editLashTech: true,
        editLashTechId: value,
        image: editData[0].image,
        title: editData[0].title,
        subtitle: editData[0].subtitle,
        description: editData[0].description
      });
    } else {
      this.setState({
        visible: true,
        editLashTech: false,
        title: "",
        subtitle: "",
        description: ""
      });
    }
  }
  handleChangeFile = ({ file, fileList }) => {
    const arr = [fileList.slice(-1)[0]];
    this.setState({ fileList: arr });

    let files = [file.originFileObj];
    // let files = []
    // fileList.map((val,i)=>{
    //   return(
    //     files.push(val.originFileObj)
    //   )
    // })

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
  deleteLashTechs(id) {
    this.setState({ loading: true });
    this.props.deleteLashTech(id);
  }

  render() {
    const { LashTechData } = this.state;
    // let totalHairStyle = this.state.totalLength

    // if((this.state.text).length !== 0){
    // totalHairStyle = LashTechData.length
    // }
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
                        //onChange={this.searchHairStylistData.bind(this)}
                        type="text"
                        className="form-control search_input"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>

                <ViewDrawer
                  onClose={this.onClose.bind(this)}
                  handlelashtechs={this.handlelashtechs.bind(this)}
                  handleCancel={this.handleCancel.bind(this)}
                  showDrawer={this.showDrawer.bind(this)}
                  handleChangeFile={this.handleChangeFile.bind(this)}
                  beforeUpload={this.beforeUpload.bind(this)}
                  dummyRequest={this.dummyRequest.bind(this)}
                  {...this.state}
                />

                {LashTechData && LashTechData.length === 0 ? <EmptyData /> : ""}

                <div className="hairstylist_wrapper">
                  <div className="row">
                    {LashTechData &&
                      LashTechData.map((value, i) => (
                        <div key={i} className="col-lg-3 col-md-4 col-sm-12">
                          <Card
                            hoverable
                            className="card_hairstylist"
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
                                title="Are you sure delete this LashTech?"
                                onConfirm={this.deleteLashTechs.bind(
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
