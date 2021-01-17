import React, { Component } from "react";
import { connect } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button,message } from "antd";
import "./login.css";
import Axios from "axios";
import qs from "qs";
import {LOGIN_URL} from "../../request"
class Login extends Component {
  constructor() {
    super();
    this.state = {
      u: "",
      p: ""
    };
  }
  onChangeOfU = e => {
    this.setState({
      u: e.target.value
    });
  };
  onChangeOfP = e => {
    this.setState({
      p: e.target.value
    });
  };
  login = (userId, password)  => {
   
    if(userId===""||password===""){
      message.warning('账号或密码不许为空');
      
    }
   Axios.post(LOGIN_URL, qs.stringify({ username: userId,password: password }))
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {

          message.success('登录成功');
          Axios.defaults.headers.common["token"] = res.data;
          this.props.history.push("/");
        } else {

          message.error('登录失败');
        }
      })
      .catch(err => {
   
        message.error('登录失败');
      });
  

  };
  render() {
    return (
      <div className="login">
        <div className="loginWindow">
          <p>大山坡树洞</p>
          <div className="input_p_u_All">
            <div className="input_p_u_x">
              <Input
                size="large"
                className="input_p_u"
                maxLength={12}
                placeholder="账号"
                prefix={<UserOutlined />}
                value={this.state.u}
                onChange={this.onChangeOfU.bind(this)}
              />
            </div>
            <div className="input_p_u_x">
              <Input.Password
                size="large"
                className="input_p_u"
                maxLength={16}
                placeholder="密码"
                prefix={<LockOutlined />}
                value={this.state.p}
                onChange={this.onChangeOfP.bind(this)}
              />
            </div>
            
              <Button
                className="login_bottom_Button"
                  onClick={() => {
                    this.login(this.state.u, this.state.p);
                  }}
              >
                登录
              </Button>
        

            <div className="bottom">
              <p>
                <a href="#/registe">立即注册</a>
              </p>
              <p>
                <a href="#/Forget">忘记密码？</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
