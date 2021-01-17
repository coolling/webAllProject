import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./comment.css";

import bzan from "../../../img/beforezan.png";
import com from "../../../img/xin.png";
import we from "../../../img/login-bac.jpg";


import { Comment, Tooltip, List, Avatar,Input ,Button,message} from 'antd';
import moment from 'moment';
import {GETARTICLEDETAIL ,GETCOMMEMT,MAKECOMMEMT} from "../../../request"
import Axios from "axios";
import qs from "qs";
class Comments extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
   item:{},
      listData:[{
        key:1,
     
    }],
    data:[
       
      ]
    };
  }
  componentDidMount() {
    Axios.post(GETARTICLEDETAIL , qs.stringify({ id:this.props.id }))
    .then(res => res.data)
    .then(res => {
      console.log(res);
      if (res.code === 0) {
     
       this.setState({
        item:res.data
       })
      } else {

        message.error('服务器错误');
      }
    })
    .catch(err => {
 
      message.error('服务器错误');
    });
   this.getCom()
  }
getCom=()=>{
  Axios.post(GETCOMMEMT , qs.stringify({ articleId:this.props.id }))
  .then(res => res.data)
  .then(res => {
    console.log(res);
    if (res.code === 0) {
   
     this.setState({
       data:res.data
     })
    } else {

      message.error('服务器错误');
    }
  })
  .catch(err => {

    message.error('服务器错误');
  });
}
make=()=>{
  Axios.post(MAKECOMMEMT, qs.stringify({ articleId:this.props.id,content:document.getElementById("mycom").value }))
  .then(res => res.data)
  .then(res => {
    console.log(res);
    if (res.code === 0) {
   
      message.success('评论成功');
      this.getCom()
    } else {

      message.error('服务器错误');
    }
  })
  .catch(err => {

    message.error('服务器错误');
  });
}
  render() {
    return (
      <div className="comment">
        <Button type="primary"   onClick={() => {
              this.props.finish();
            }}>返回</Button>
      <List
            itemLayout="vertical"
            size="large"
           
            dataSource={this.state.listData}
           
            renderItem={item => (
              <List.Item
                key={this.state.item.id}
                actions={[
                    <div >
                    <img src={bzan} width="15px"></img>{this.state.item.like}
                  </div>,
                  <div >
                    <img src={com} width="15px"></img>
                  </div>
                ]}
                extra={
                  this.state.item.images?<img width={272} height={162} alt="logo" src={this.state.item.images} />:null
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
               
                //   description={item.description}
                />
                {this.state.item.content}
              </List.Item>
            )}
          />
           <List
    className="comment-list"
    header={`${this.state.data.length} replies`}
    itemLayout="horizontal"
    dataSource={this.state.data}
    renderItem={item => (
      <li>
        <Comment
         
          avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          content={item.content}
          datetime={item.createTime}
        />
      </li>
    )}
  />
  <div className="coms">
  <Input className="comI" id="mycom"></Input><Button  type="primary" className="commenting" onClick={this.make}>评论</Button>
  </div>
  
      </div>
    );
  }
}

export default connect()(Comments);
