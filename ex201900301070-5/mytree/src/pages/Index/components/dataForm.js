import React, { Component } from "react";
import { connect } from "react-redux";
import "./dataForm.css";
import { message } from "antd";
import predata from "../../../img/xiaohui.png";
import we from "../../../img/login-bac.jpg";
import Axios from "axios";
import qs from "qs";
import { GET_USERDATA_URL ,GETPHONE} from "../../../request";
class DataForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      phone:""
    };
  }
  componentDidMount() {
    // console.log(this.props.index);
  }
  getData = () => {
    Axios.post(GETPHONE, qs.stringify({}))
    .then(res => res.data)
    .then(res => {
      console.log(res);
      if (res.code === 0) {
        this.setState({
          phone: res.data
        });
        localStorage.setItem("phone", res.data);
      } else {
        message.error("服务器错误");
      }
    })
    .catch(err => {
      message.error("服务器错误");
    });
    Axios.post(GET_USERDATA_URL, qs.stringify({}))
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          this.setState({
            data: res.data
          });
          localStorage.setItem("userData", JSON.stringify(res.data));
        } else {
          message.error("服务器错误");
        }
      })
      .catch(err => {
        message.error("服务器错误");
      });
  };
  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <div className="dataform">
        <div className="dataformhead">
          <img alt="大山坡个人信息" src={predata}></img> <p>大山坡个人信息</p>
        </div>
        <div className="dataformbody">
          <div className="dataimg">
            <img
              alt="照片"
              src={
                this.state.data.headImage === null
                  ? we
                  : this.state.data.headImage
              }
            ></img>
          </div>

          <div className="datap">
            <p>
              昵称：
              {!this.state.data.nickname ||
              this.state.data.nickname == "undefined"
                ? "用户" + this.state.data.id
                : this.state.data.nickname}
            </p>
            <p>手机号：{!this.state.phone||this.state.phone=="undefined"? "暂未设置" : this.state.phone}</p>
            <p>
              签名：
              {!this.state.data.motto ? "暂未设置" : this.state.data.motto}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    index: state
  };
};
export default connect(mapStateToProps)(DataForm);
