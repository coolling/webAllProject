import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import we from "../../../img/login-bac.jpg";
import bzan from "../../../img/beforezan.png";
import azan from "../../../img/afterzan.png";
import com from "../../../img/xin.png";
import { List, Avatar, Space ,message} from "antd";
import Edite from "./edit.js"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {GETMYYARTICLE,AGREE,DISAGREE,DELETEMY,  HASLIKE} from "../../../request"
import Axios from "axios";
import qs from "qs";
import COMMENT from "./comment"

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
class Ten extends Component {
    constructor(props) {
        super();
        this.state = {
          listData: [
            
          ],
          like: [],
          item: {},
          visible: false,
          visible2:false
        };
      }
    
      componentDidMount() {
        this.getlike();
       this.get()
      }
      getlike = () => {
        Axios.post(HASLIKE, qs.stringify())
          .then(res => res.data)
          .then(res => {
            console.log(res);
            if (res.code === 0) {
              this.setState({
                like: JSON.parse(res.data)?JSON.parse(res.data):[]
              });
            } else {
              message.error("获取点赞情况失败");
            }
          })
          .catch(err => {
            message.error("获取点赞情况失败");
          });
      };
      get=()=>{
     
        Axios.post(GETMYYARTICLE, qs.stringify({days:this.props.day}))
        .then(res => res.data)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
    
            this.setState({
              listData:res.data
             })
          
           
          } else {
    
            message.error('获取心情失败');
          }
        })
        .catch(err => {
     
    
          message.error('获取心情失败');
        });
      }
      componentWillReceiveProps(nextProps) {
        Axios.post(GETMYYARTICLE, qs.stringify({days:nextProps.day}))
        .then(res => res.data)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
    
            this.setState({
              listData:res.data,
              visible: false,
              visible2:false
             })
          
           
          } else {
    
            message.error('获取心情失败');
          }
        })
        .catch(err => {
     
    
          message.error('获取心情失败');
        });
      }
      setVisible=(item)=>{
        this.setState({
          visible:!this.state.visible,
          item:item
        })
      }
      setVisible2=(item)=>{
        this.setState({
          visible2:!this.state.visible,
          item:item
        })
      }
      finish = () => {
        this.setState({
          visible: false,
          visible2: false,
        });
        this.get()
      };
      zan=(item)=>{
        var news = this.state.listData;
        for(var i=0;i<news.length;i++){
          if(news[i].id===item.id){
            if(news[i].like===0){
              news[i].like=1;
            }else{
              news[i].like=0;
            }
          }
        }
        if(item.like===0){
     
        Axios.post(AGREE, qs.stringify({id: item.id }))
        .then(res => res.data)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.setState({
              listData: news
            });
          
          } else {
            message.error("点赞失败");
          }
        })
        .catch(err => {
          message.error("点赞失败");
        });
        }else{
    
        Axios.post(DISAGREE, qs.stringify({id: item.id }))
        .then(res => res.data)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.setState({
              listData: news
            });
          
          } else {
            message.error("取消点赞失败");
          }
        })
        .catch(err => {
          message.error("取消点赞失败");
        });
        }
      }
      delete = id => {
        var news = this.state.listData.filter(item => {
          return item.id !== id;
        });
        Axios.post(DELETEMY, qs.stringify({id: id }))
        .then(res => res.data)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.setState({
              listData: news
            });
            message.success("删除成功");
          } else {
            message.error("删除失败");
          }
        })
        .catch(err => {
          message.error("删除失败");
        });
      };
     
      // finish = () => {
       
      //   this.componentDidMount();
      // };
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
      render() {
        return (
          
          <div className="mytree">
          {
            this.state.visible?<Edite finish={this.finish} photo={this.state.item.images} along={this.state.item.content} id={this.state.item.id}></Edite>:this.state.visible2?<COMMENT  finish={this.finish} id={this.state.item.id}></COMMENT>: <List
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
                  <div onClick={this.delete.bind(this, item.id)}>
                    <IconText icon={DeleteOutlined} key="list-vertical-message" />
                  </div>,
                  <div onClick={this.setVisible.bind(this, item)}>
                    <IconText icon={EditOutlined} key="edite" />
                  </div>,
                 <div onClick={this.state.like.filter(value => value === item.id)
                  .length === 1 ?this.diszan.bind(this, item.id):this.zan.bind(this, item.id)}>
                  {this.state.like.filter(value => value === item.id)
                    .length === 1 ? (
                    <img src={azan} width="15px"></img>
                  ) : (
                    <img src={bzan} width="15px"></img>
                  )}{" "}
                  {item.like}
                </div>,
                  <div onClick={this.setVisible2.bind(this, item)}>
                    <img src={com} width="15px"></img>
                  </div>
                ]}
                extra={
                  item.images?  <img width={272} height={162} alt="logo" src={item.images} />:null
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href={item.href}>{item.title}</a>}
                  // description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
          }
           
          </div>
        );
      }
    }
    
    // const mapStateToProps = state => {
    //   return {
    //     index: state.Social
    //   };
    // };
    // const mapDispatchToProps = dispatch => {
    //   return {
    //     deleteSocial: id => {
    //       dispatch(deleteSocial(id));
    //     },
    //     getSocial: () => {
    //       dispatch(getSocial());
    //     }
    //   };
    // };
export default connect()(Ten);
