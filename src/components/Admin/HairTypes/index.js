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

export default class HairTypesComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      title: "",
      subtitle: "",
      description: "",
      visible: false,
      HairTypeData: "",
      editHairType: false,
      editHairTypeId: "",
      current: 1,
      page: 0,
      totalPage: 0,
      text: "",
      loading: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      files: [],
      pocketPhoto: []
    };
  }

  showDrawer = id => {
    let value = id;
    const { HairTypeData } = this.state;
    if (value) {
      let HairType = _.get(HairTypeData, "value.HairTypes");
      let editData = _.filter(HairType, { _id: value });
      this.setState({
        visible: true,
        editHairType: true,
        editHairTypeId: value,
        title: editData[0].title,
        subtitle: editData[0].subtitle,
        description: editData[0].description
      });
    } else {
      this.setState({
        visible: true,
        editHairType: false,
        title: "",
        subtitle: "",
        description: ""
      });
    }
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const results = await this.props.getHairTypes({
      page: this.state.page,
      text: this.state.text
    });
    if (results.value.success === true) {
      this.setState({ HairTypeData: results, loading: false });
    }
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

  handlehairTypes = async values => {
    const { editHairType, editHairTypeId } = this.state;
    if (!editHairType) {
      const data = {
        title: _.get(values, "title", ""),
        subtitle: _.get(values, "subtitle", ""),
        description: _.get(values, "description", ""),
        image: this.state.pocketPhoto
      };

      await this.props.addHairTypes(data);
      this.setState({
        visible: false,
        title: "",
        subtitle: "",
        description: ""
      });
      this.forceUpdate();
    } else {
      const editData = {
        title: _.get(values, "title", ""),
        subtitle: _.get(values, "subtitle", ""),
        description: _.get(values, "description", ""),
        _id: editHairTypeId
      };

      // if((this.state.fileList).length !== 0){
      //   editData.image = this.state.fileList
      // }
      if (this.state.pocketPhoto.length !== 0) {
        editData.image = this.state.pocketPhoto;
      }

      // console.log(editData, 'editData')
      await this.props.editHairType(editData);
      this.setState({ visible: false });
    }
    this.componentDidMount();
  };

  async deleteHairType(id) {
    await this.props.deleteHairType(id);
    this.componentDidMount();
  }

  async changePage(pageNumber) {
    this.setState({ page: parseInt(pageNumber) });

    const payload = {
      page: pageNumber,
      text: this.state.text
    };

    const result = await this.props.getHairTypes(payload);
    this.setState({ HairTypeData: result });
  }

  async searchHairTypesData(e) {
    this.setState({ text: e.target.value });

    const payload = {
      text: e.target.value,
      page: 1
    };
    const result = await this.props.getHairTypes(payload);
    this.setState({ HairTypeData: result });
  }

  onClose = () => {
    this.setState({ visible: false });
  };

  cancel(e) {
    // message.error('Click on No')
  }

  render() {
    const { HairTypeData } = this.state;
    let hairType = _.get(HairTypeData, "value.HairTypes");
    // let totalhairType = _.get(HairTypeData, 'value.totalLength')

    // if((this.state.text).length !== 0){
    //   totalhairType = _.get(HairTypeData, 'value.HairTypes', []).length
    // }

    return (
      <div>
        {/* {this.state.loading === true ?
          <Spin /> : ''
        } */}
        <Spin spinning={this.state.loading}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="search_wrapper">
                  <form className="form-inline">
                    <div className="form-group mr-3">
                      <input
                        onChange={this.searchHairTypesData.bind(this)}
                        type="text"
                        className="form-control search_input"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>
                <ViewDrawer
                  onClose={this.onClose.bind(this)}
                  handlehairTypes={this.handlehairTypes}
                  handleCancel={this.handleCancel}
                  showDrawer={this.showDrawer}
                  handlePreview={this.handlePreview}
                  handleChangeFile={this.handleChangeFile.bind(this)}
                  beforeUpload={this.beforeUpload.bind(this)}
                  dummyRequest={this.dummyRequest.bind(this)}
                  onRemove={this.onRemove.bind(this)}
                  {...this.state}
                />

                {hairType && hairType.length === 0 ? <EmptyData /> : ""}

                <div className="hairtype_wrapper">
                  <div className="row">
                    {hairType &&
                      hairType.map((value, i) => (
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
                                title="Are you sure delete this HairType?"
                                onConfirm={this.deleteHairType.bind(
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
                                />
                              </Popconfirm>
                            ]}
                          >
                            <Meta
                              title={value.title}
                              description={value.description}
                            />
                          </Card>
                        </div>
                      ))}
                  </div>
                </div>

                {/*<div className="pagination_wrapper">
                <Pagination
                  onChange={this.changePage.bind(this)}
                  defaultCurrent={1}
                  defaultPageSize={12}
                  total={totalhairType}
                  hideOnSinglePage={true}
                />
              </div>*/}
              </div>
            </div>
          </div>
          <div className="add_content_btn">
            <Button type="primary" onClick={this.showDrawer.bind(this, null)}>
              Add
            </Button>
          </div>

          {/*<table style={{width:'50%'}} border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subtitle</th> 
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          { hairType && hairType.map((value, index)=>(
          <tr key={index}> 
            <td>{value.title}</td>
            <td>{value.subtitle}</td>
            <td>{value.description}</td>
            <td><button value={value._id} onClick={this.showDrawer}>Edit</button></td>
            <td><Popconfirm
                  title="Are you sure delete this HairType?"
                  onConfirm={this.deleteHairType.bind(this,value._id)}
                  onCancel={this.cancel}
                  okText="Yes"
                  cancelText="No"
                  value={value._id}
                ><button >Delete</button>
                </Popconfirm></td>
          </tr>
          ))}
          </tbody>
        </table>*/}
        </Spin>
      </div>
    );
  }
}
