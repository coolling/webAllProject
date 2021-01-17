import React, { Component } from "react";
import { connect } from "react-redux";
import "./dataForm.css";
import { message } from "antd";
import predata from "../../../img/xiaohui.png";
import we from "../../../img/login-bac.jpg";
import Axios from "axios";
import qs from "qs";
import {CHANGEPASS_URL} from "../../../request"
import { Form, Input, Button } from "antd";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
const onFinish = values => {
  console.log("Success:", values);
};

const onFinishFailed = errorInfo => {
  console.log("Failed:", errorInfo);
};
class ChangePass extends Component {
  constructor() {
    super();
    this.state = {
        username:"",
        password:""
      };
    }
    getP=(e)=>{
         this.setState({
           password:e.target.value
         },()=>{
           console.log(this.state.password)
         })
    }
  
    getU=(e)=>{
      this.setState({
        username:e.target.value
      },()=>{
        console.log(this.state.username)
      })
  }
  changePass=(old,news)=>{
    if(old===""||news===""){
        message.warning('不许为空');
        
      }
     Axios.post(CHANGEPASS_URL, qs.stringify({ oldPassword: old,newPassword: news }))
        .then(res => res.data)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
  
            message.success('修改成功');
         
          } else {
  
            message.error('修改失败');
          }
        })
        .catch(err => {
     
          message.error('修改失败');
        });
  }
  render() {
    return (
        <div className="forgetwin">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="旧密码"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your old password !"
              }
            ]}
          >
            <Input.Password onChange={this.getU}/>
          </Form.Item>

          <Form.Item
            label="新密码"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" }
            ]}
          >
            <Input.Password onChange={this.getP}/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit"  onClick={() => {
              this.changePass(this.state.username, this.state.password);
            }}>
              
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* <div className="fortitle">
          <p>贴心小提示：</p>
          <p>请同学们好好记住自己的密码哟</p>
        </div> */}
      </div>
    );
  }
}

export default connect()(ChangePass);
