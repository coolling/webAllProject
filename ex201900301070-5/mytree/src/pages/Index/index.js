import React, { Component } from "react";
import "./index.css";
import icon from "../../img/xiaohui.png";
import { Menu, Button } from "antd";
import { connect } from "react-redux";
import DataForm from "./components/dataForm";
import ChangeData from "./components/changeData";
import MyTreehole from "./components/myTreehole";
import OTreehole from "./components/othersTreehole";
import Music from "./components/music";
import Write from "./components/write";
import Word from "./components/word";
import shudong from "../../img/shudong.png";
import ChangePass from "./components/changepass"
import Game from "./components/game"
import {
  PieChartOutlined,
  ExperimentOutlined,
  DesktopOutlined,
  ContainerOutlined,
  PoweroffOutlined
} from "@ant-design/icons";
import Seven from "./components/seven"
import Ten from "./components/ten"
const { SubMenu } = Menu;
class Index extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      key: 1
    };
  }
  changeKey = v => {
    this.setState(
      {
        key: v
      },
      () => {
        console.log(this.state.key);
      }
    );
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  switchWhat = () => {
    // return <ChangeData></ChangeData>;
    switch (this.state.key) {
      case 1:
        return <DataForm></DataForm>;
      case 2:
        return <ChangeData></ChangeData>;
      case 3:
        return <MyTreehole day="3"></MyTreehole>;
      case 4:
        return <Seven day="7"></Seven>;
      case 5:
        return <Ten day="10"></Ten>;
      case 7:
        return <OTreehole></OTreehole>;
        case 8:
          return <Word></Word>;
      case 6:
        return <Write></Write>;
      case 9:
        return <Music></Music>;
        case 11:
          return <ChangePass></ChangePass>;
          case 10:
            return <Game></Game>;
      default:
        return <DataForm></DataForm>;
    }
  };

  componentDidUpdate() {

  }
  out = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="index">
        <div className="index-head">
          <img alt="校徽" src={shudong}></img>
          {/* <p>SDUTREEHOLE</p> */}

          <PoweroffOutlined
            onClick={this.out}
            className="out"
            style={{ marginBottom: "30px" }}
          />
        </div>
        <div className="index-body">
          <div style={!this.state.collapsed ? { width: 256 } : null}>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="light"
              inlineCollapsed={this.state.collapsed}
              className="menu"
            >
              <SubMenu key="sub1" icon={<ContainerOutlined />} title="个人信息">
                <Menu.Item key="1" onClick={this.changeKey.bind(this, 1)}>
                  查看信息
                </Menu.Item>
                <Menu.Item key="2" onClick={this.changeKey.bind(this, 2)}>
                  修改信息
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub2"
                icon={<ExperimentOutlined />}
                title="我的心情"
              >
                <Menu.Item key="3" onClick={this.changeKey.bind(this, 3)}>
                  最近三天的心情
                </Menu.Item>
                <Menu.Item key="4" onClick={this.changeKey.bind(this, 4)}>
                  最近七天的心情
                </Menu.Item>
                <Menu.Item key="5" onClick={this.changeKey.bind(this, 5)}>
                  最近十天的心情
                </Menu.Item>
                <Menu.Item key="9" onClick={this.changeKey.bind(this, 6)}>
                  发布心情
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="6"
                icon={<PieChartOutlined />}
                onClick={this.changeKey.bind(this, 7)}
              >
                别人的心情
              </Menu.Item>
              <SubMenu
                key="sub3"
                icon={<ExperimentOutlined />}
                title="放松心情"
              >
                <Menu.Item key="8" onClick={this.changeKey.bind(this, 8)}>
                  暖心短句
                </Menu.Item>
                <Menu.Item key="9" onClick={this.changeKey.bind(this, 9)}>
                  轻松歌曲
                </Menu.Item>
                <Menu.Item key="10" onClick={this.changeKey.bind(this, 10)}>
                  轻松游戏
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="11"
                icon={<DesktopOutlined />}
                onClick={this.changeKey.bind(this, 11)}
              >
               修改密码
              </Menu.Item>
            </Menu>
          </div>
          <div className="index-center">{this.switchWhat()}</div>
        </div>
      </div>
    );
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     out: () => {
//       dispatch(outLogin());
//     }
//   };
// };
const mapStateToProps = state => {
  return {
    index: state
  };
};
export default connect(mapStateToProps)(Index);
