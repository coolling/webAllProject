import React, { Component } from "react";
import { connect } from "react-redux";
import icon from "../../img/xiaohui.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Switch,message
} from "antd";
import "./registe.css";
import Axios from "axios";
import qs from "qs";
import {REGISTE_URL} from "../../request"
class Registe extends Component {
  constructor() {
    super();
    this.state = {
      u: "",
      isOK:false,
      p: ""
    };
  }
  registe = (userId, password)  => {
   
    if(userId===""||password===""){
      message.warning('账号或密码不许为空');
      
    }else{
      if(!this.state.isOK){
        message.warning('请确认');
      }else{
        Axios.post(REGISTE_URL, qs.stringify({ username: userId,password: password }))
        .then(res => res.data)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
  
            message.success('注册成功');
          } else {
  
            message.error('注册失败');
          }
        })
        .catch(err => {
     
          message.error('注册失败');
        });
      }
    }
 
  

  };
  writeU=(e)=>{
    this.setState({
     u:e.target.value
    })
}
writeP=(e)=>{
  this.setState({
   p:e.target.value
  })
}
writeIsok=(e)=>{
  this.setState({
    isOK:e
   },()=>{
     console.log(this.state)
   })
}
  render() {
    return (
      <div className="registe">
        <div className="index-head">
          <img alt="校徽" src={icon}></img>
          <p>SDUWEB</p>
          <p >
            <a href="#/login" style={{fontSize:"22px" ,marginLeft:"1150px"}}>登录</a>
          </p>
        </div>
        <p className="welcome">Welcome！</p>
     
        <Form
          labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 7
          }}
          layout="horizontal"

 
        >
     
          <Form.Item label="账号" className="long">
            <Input onChange={this.writeU} />
          </Form.Item>
          <Form.Item label="密码" className="long">
            <Input onChange={this.writeP} />
          </Form.Item>

          <Form.Item label="我已确认">
            <Switch className="switch" onChange={this.writeIsok} />
          </Form.Item>

          <Button
            className="registin"
            onClick={() => {
              this.registe(
          
                this.state.u,
        
                this.state.p,
     
              );
            }}
          >
            注册
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect()(Registe);
