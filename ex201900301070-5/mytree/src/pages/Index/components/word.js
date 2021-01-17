import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./music.css";
import Axios from "axios";
import qs from "qs";
import musicwordimg from "../../../img/wordbgi.jpg";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Switch
} from "antd";
import { GETALLSOUL } from "../../../request";
class Word extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      word: [],
      file: [],
      newFile: []
    };
  }

  componentDidMount() {
    Axios.post(GETALLSOUL, qs.stringify({}))
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
        
         this.setState({
            word:res.data
         })
        } else {
          message.error("获取推文失败");
        }
      })
      .catch(err => {
        message.error("获取推文失败");
      });
  }

  render() {
    var a=Math.ceil(Math.random()*this.state.word.length);
    var b=(this.state.word.length===0)?"":this.state.word[a-1].content
    return (
      <div
        className="word"
        style={{
          backgroundImage: `url(${musicwordimg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: " cover",
          backgroundPosition: "center center",
          overflow: "hidden",
          height: "100%"
        }}
      >
        <div className="sendsomewords">
          <p>
        {b}
          </p>
        </div>
      </div>
    );
  }
}

export default connect()(Word);
