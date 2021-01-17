import React, { Component } from "react";
import { connect } from "react-redux";
import icon from "../../img/xiaohui.png";
import "./forget.css";
// import {forget} from "../../redux/request"
import { Form, Input, Button ,message} from "antd";
import Axios from "axios";
import qs from "qs";
import {FORGRT} from "../../request"
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
class Forget extends Component {
  constructor() {
    super();
    this.state = {
      username:"",
      password:"",
      user:""
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
getUser=(e)=>{
  this.setState({
    user:e.target.value
  })
}
forget=(user,phone,password)=>{
  Axios.post(FORGRT, qs.stringify({ username: user,phone:phone,password: password }))
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
      <div>
        {" "}
        <div className="index-head">
          <img src={icon} alt="校徽"></img>
          <p >大山坡安全中心|重置密码</p>
          <p >
            <a href="#/login">登录</a>
          </p>
        </div>
        <div className="forgetwin">
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
              <Form.Item
              label="帐号"
              name="user"
              rules={[
                {
                  required: true,
                  message: "Please input your user number !"
                }
              ]}
            >
              <Input onChange={this.getUser}/>
            </Form.Item>
            <Form.Item
              label="手机号"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your student number !"
                }
              ]}
            >
              <Input onChange={this.getU}/>
            </Form.Item>

            <Form.Item
              label="新密码"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password onChange={this.getP}/>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit"  onClick={() => {
                this.forget(this.state.user,this.state.username, this.state.password);
              }}>
                
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div className="fortitle">
            <p>贴心小提示：</p>
            <p>请同学们好好记住自己的密码哟</p>
          </div>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     index: state
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     forget: (u, p) => {
//       dispatch(forget(u, p));
//     }
//   };
// };
export default connect()(Forget);
