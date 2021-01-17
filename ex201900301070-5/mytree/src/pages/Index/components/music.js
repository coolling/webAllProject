import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./music.css";
import we from "../../../img/login-bac.jpg";
import music from "../../../img/music.png";
import start from "../../../img/start.png";
import pause from "../../../img/pause.png";
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
import Axios from "axios";
import qs from "qs";
import { GETALLSOUL, GETALLMUSIC } from "../../../request";
class Music extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      music: [],
      isplay: true
    };
  }

  componentDidMount() {
    Axios.post(GETALLMUSIC, qs.stringify({}))
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          this.setState({
            music: res.data
          });
        } else {
          message.error("获取推歌失败");
        }
      })
      .catch(err => {
        message.error("获取推歌失败");
      });
  }
  playsmusic = () => {
    this.setState({
      isplay: !this.state.isplay
    });
    var audio = document.getElementById("autoplay");
    if (audio !== null) {
      if (this.state.isplay) {
        audio.play(); // 播放
      } else {
        audio.pause(); // 暂停
      }
    }
  };
  render() {
    var a = Math.ceil(Math.random() * this.state.music.length);
    var b = this.state.music.length === 0 ? null : this.state.music[a - 1];
    console.log(this.state.music[a - 1] + "!!");
    return (
      <div
        className="Music"
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
        <div>
          <audio src={b ? b.file : null} id="autoplay"></audio>
        </div>
        <div className="sendsomewords">
          <p >歌曲介绍</p>
          <br></br>
          <p>{b ? b.content : ""}</p>
        </div>

        <div className="playmusic">
          <img
            src={music}
            alt="歌"
            className="ge"
            style={{ overflow: "hidden" }}
          ></img>
          <p>{b ? b.title : ""}</p>
          <div className="startorpause">
            <img
              src={this.state.isplay === true ? pause : start}
              alt="起止"
              onClick={this.playsmusic}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Music);
