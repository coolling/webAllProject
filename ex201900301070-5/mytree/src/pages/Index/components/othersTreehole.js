import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import we from "../../../img/login-bac.jpg";
import bzan from "../../../img/beforezan.png";
import com from "../../../img/xin.png";
import { List, Avatar, Space, Input, Button, message } from "antd";
import { DatePicker } from "antd";
import azan from "../../../img/afterzan.png";
import Axios from "axios";
import qs from "qs";
import {
  GETALLARTICLE,
  SEARCH,
  HASLIKE,
  AGREE,
  DISAGREE,
  CHOOSE
} from "../../../request";
import Comment from "./comment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
class OTreehole extends Component {
  constructor() {
    super();
    this.state = {
      listData: [],
      item: {},
      visible: false,
      like: []
    };
  }

  componentDidMount() {
    this.getlike();
    Axios.post(GETALLARTICLE, qs.stringify({}))
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          this.setState(
            {
              listData: res.data
            },
            () => {}
          );
        } else {
          message.error("获取心情失败");
        }
      })
      .catch(err => {
        message.error("获取心情失败");
      });
  }
  getlike = () => {
    Axios.post(HASLIKE, qs.stringify())
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          if(JSON.parse(res.data)){
            this.setState({
              like: JSON.parse(res.data)
            });
          }
         
        } else {
          message.error("获取点赞情况失败");
        }
      })
      .catch(err => {
        message.error("获取点赞情况失败");
      });
  };
  delete = item => {};
  edite = item => {
    this.setState({
      visible: !this.state.visible,
      item: item
    });
  };
  finish = () => {
    this.setState({
      visible: false
    });
    
  };
  search = () => {
    Axios.post(
      SEARCH,
      qs.stringify({ key: document.getElementById("search").value })
    )
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          this.setState({
            listData: res.data
          });
        } else {
          message.error("获取心情失败");
        }
      })
      .catch(err => {
        message.error("获取心情登录失败");
      });
  };
  havelikes = id => {
    for (var i = 0; i < this.state.like.length; i++) {
      console.log(i);
      if (id === this.state.like.length[i]) {
        return 1;
      }
    }
    return 0;
  };
  zan = id => {
    // var b = this.state.listData;
    // var c=b.like;
    // for (var i = 0; i < b.length; b++) {
    //   if (b[i].id === id) {
    //     c++;
    //     b[i].like=c;
    //   }
    // }
   
    // this.setState({
    //   listData:b
    // })
    var b= this.state.listData;
    b.map((value,index)=>{
      if(value.id===id){
        value.like++;
      }
    })
    Axios.post(AGREE, qs.stringify({ id: id }))
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          message.success("点赞成功");
          var a = this.state.like;
          a.push(id);
          this.setState({
            like: a,
            listData: b
          });

         
        } else {
          message.error("点赞失败");
        }
      })
      .catch(err => {
        message.error("点赞失败");
      });
  };
  diszan = id => {
    var b= this.state.listData;
    b.map((value,index)=>{
      if(value.id===id){
        value.like--;
      }
    })
    Axios.post(DISAGREE, qs.stringify({ id: id }))
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
        
          var a = this.state.like;
       
          this.setState({
            like:  a.filter((value)=>value!==id),
            listData: b
          });

         
        } else {
          message.error("取消点赞失败");
        }
      })
      .catch(err => {
        message.error("取消点赞失败");
      });
  };
  sai=(e)=>{
    if(e){
      if(e[0]._d&&e[1]._d){
        var d = new Date(e[0]._d);
        var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() ;
        console.log(datetime);
         d = new Date(e[1]._d);
        var datetime1=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        console.log(datetime1);
        Axios.post(
          CHOOSE,
          qs.stringify({ startTime: datetime,endTime:datetime1 })
        )
          .then(res => res.data)
          .then(res => {
            console.log(res);
            if (res.code === 0) {
              this.setState({
                listData: res.data
              });
            } else {
              message.error("获取心情失败");
            }
          })
          .catch(err => {
            message.error("获取心情登录失败");
          });
      }
    }
    

  }
  render() {
    return (
      // <Comment></Comment>
      <div className="mytree">
        {this.state.visible ? (
          <Comment id={this.state.item.id} finish={this.finish}></Comment>
        ) : (
          <div>
            {" "}
            <RangePicker style={{ margin: "20px" }} onChange={this.sai}/>
            <div className="coms">
              <Input className="comI" id="search"></Input>
              <Button
                type="primary"
                className="commenting"
                onClick={this.search}
              >
                搜索
              </Button>
            </div>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3
              }}
              dataSource={this.state.listData}
              renderItem={item => (
                <List.Item
                  key={item.key}
                  actions={[
                    <div onClick={(this.state.like&&this.state.like.length!==0)?this.state.like.filter(value => value === item.id)
                      .length === 1 ?this.diszan.bind(this, item.id):this.zan.bind(this, item.id):null}>
                      {this.state.like.filter(value => value === item.id)
                        .length === 1 ? (
                        <img src={azan} width="15px"></img>
                      ) : (
                        <img src={bzan} width="15px"></img>
                      )}{" "}
                      {item.like}
                    </div>,
                    <div onClick={this.edite.bind(this, item)}>
                      <img src={com} width="15px"></img>
                    </div>
                  ]}
                  extra={
                    item.images ? (
                      <img
                        width={272}
                        height={162}
                        alt="logo"
                        src={item.images}
                      />
                    ) : null
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
    );
  }
}
export default connect()(OTreehole);
