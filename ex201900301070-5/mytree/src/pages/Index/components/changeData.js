import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./changeData.css";
import we from "../../../img/login-bac.jpg";
import Axios from "axios";
import qs from "qs";
import { CHANGE_USER_URL } from "../../../request";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
class ChangeData extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      imageUrl: "",
      name: "",
      u: "",
      motto: "",
      file: [],
      phone:"",
      newFile: []
    };
  }
  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  transformFile = (
    file,
    { compressThreshold = 200, isPictureCompress = true, pictureQuality = 0.6 }
  ) => {
    /**
     * 针对图片进行压缩,如果图片大小超过压缩阈值,则执行压缩,否则不压缩
     */
    let fileSize = file.size / 1024;
    // console.log('before compress, the file size is : ', fileSize + "M");
    //当开启图片压缩且图片大小大于等于压缩阈值,进行压缩
    if (fileSize >= compressThreshold && isPictureCompress) {
      //判断浏览器内核是否支持base64图片压缩
      if (typeof FileReader === "undefined") {
        message.error("您使用的浏览器不支持图片上传！");
        return file;
      } else {
        try {
          this.setState({
            spinLoading: true
          });
          return new Promise(resolve => {
            //声明FileReader文件读取对象
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              // 生成canvas画布
              const canvas = document.createElement("canvas");
              // 生成img
              const img = document.createElement("img");
              img.src = reader.result;
              img.onload = () => {
                const ctx = canvas.getContext("2d");
                //原始图片宽度、高度
                let originImageWidth = img.width,
                  originImageHeight = img.height;
                //默认最大尺度的尺寸限制在（1920 * 1080）
                let maxWidth = 1920,
                  maxHeight = 1080,
                  ratio = maxWidth / maxHeight;
                //目标尺寸
                let targetWidth = originImageWidth,
                  targetHeight = originImageHeight;
                //当图片的宽度或者高度大于指定的最大宽度或者最大高度时,进行缩放图片
                if (
                  originImageWidth > maxWidth ||
                  originImageHeight > maxHeight
                ) {
                  //超过最大宽高比例
                  if (originImageWidth / originImageHeight > ratio) {
                    //宽度取最大宽度值maxWidth,缩放高度
                    targetWidth = maxWidth;
                    targetHeight = Math.round(
                      maxWidth * (originImageHeight / originImageWidth)
                    );
                  } else {
                    //高度取最大高度值maxHeight,缩放宽度
                    targetHeight = maxHeight;
                    targetWidth = Math.round(
                      maxHeight * (originImageWidth / originImageHeight)
                    );
                  }
                }
                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                ctx.clearRect(0, 0, targetWidth, targetHeight);
                // 绘制图片
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                // quality值越小,图像越模糊,默认图片质量为0.92
                const imageDataURL = canvas.toDataURL(
                  file.type || "image/jpeg",
                  pictureQuality
                );
                // 去掉URL的头,并转换为byte
                const imageBytes = window.atob(imageDataURL.split(",")[1]);
                // 处理异常,将ascii码小于0的转换为大于0
                const arrayBuffer = new ArrayBuffer(imageBytes.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < imageBytes.length; i++) {
                  uint8Array[i] = imageBytes.charCodeAt(i);
                }
                let mimeType = imageDataURL.split(",")[0].match(/:(.*?);/)[1];
                let newFile = new File([uint8Array], file.name, {
                  type: mimeType || "image/jpeg"
                });
                // console.log('after compress, the file size is : ', (newFile.size / 1024 / 1024) + "M");
                resolve(newFile);
              };
            };
            reader.onerror = () => {
              this.setState({
                spinLoading: false
              });
              return file;
            };
          })
            .then(res => {
              this.setState({
                spinLoading: false
              });
              return res;
            })
            .catch(() => {
              this.setState({
                spinLoading: false
              });
              return file;
            });
        } catch (e) {
          this.setState({
            spinLoading: false
          });
          //压缩出错,直接返回原file对象
          return file;
        }
      }
    } else {
      //不需要压缩，直接返回原file对象
      return file;
    }
  };

  finish = () => {
   
    var data = JSON.parse(localStorage.getItem("userData"));

    const formData = new FormData();
    formData.append("image", this.state.file);
   
    formData.append("motto", this.state.motto?this.state.motto:data.motto);
    formData.append("nickname", this.state.name?this.state.name:data.nickname);
    formData.append("phone", this.state.phone?this.state.phone:data.phone);
    Axios.post(CHANGE_USER_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => res.data)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
         
          message.success('更改成功');
          data.motto= this.state.motto?this.state.motto:data.motto;
          data.nickname= this.state.name?this.state.name:data.nickname;
          data.phone=this.state.phone?this.state.phone:data.phone;
          data.headImage=this.state.imageUrl;
        } else {
     
          message.error('更改失败');
        }
      })
      .catch(err => {
    
        message.error('更改失败');
      });
  };
  handleChange = async ({ file }) => {
    var compressedFile = file;
    if (compressedFile.size / 1024 > 200)
      this.transformFile(compressedFile, { pictureQuality: 0.6 }).then(
        async resFile => {
          if (resFile.size / 1024 > 200) {
            this.transformFile(resFile, { pictureQuality: 0.8 }).then(
              res => (compressedFile = res)
            );
          } else compressedFile = resFile;
          this.setState({
            imageUrl: await this.getBase64(compressedFile),
            file: compressedFile
          });
        }
      );
    else
      this.setState({
        imageUrl: await this.getBase64(compressedFile),
        file: compressedFile
      });
  };

  writeName = e => {
    console.log(e.target.value)
    this.setState({
      name: e.target.value
    });
  };
  writePhone=(e)=>{
    this.setState({
      phone: e.target.value
    });
  }

  writeM = e => {
    this.setState({
      motto: e.target.value
    });
  };
  render() {
    var data = JSON.parse(localStorage.getItem("userData"));
    var phone =(localStorage.getItem("phone"));
    const { loading, imageUrl } = this.state;

    return (
      <div className="changeData">
        <div className="changeimg">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
       
            beforeUpload={() => false}
            onChange={this.handleChange}
          >
            {imageUrl ? (
              <img
                id="file"
                src={imageUrl}
                alt="avatar"
                style={{ width: "180px", height: "230px" }}
              />
            ) : (
              <img
                id="file"
                src={data.headImage === null
                  ? we
                  : data.headImage}
                alt="avatar"
                style={{ width: "180px", height: "210px" }}
              />
            )}
          </Upload>
          <p>照片</p>
        </div>
        <div className="changep">
          <Form
            labelCol={{
              span: 4
            }}
            wrapperCol={{
              span: 7
            }}
            layout="horizontal"
          >
            <Form.Item label="昵称" className="long">
              <Input
                placeholder={!data.nickname ||data.nickname=="undefined"? "用户" + data.id : data.nickname}
                onChange={this.writeName}
              />
            </Form.Item>
            <Form.Item label="手机号" className="long">
              <Input placeholder={!phone||phone=="undefined"? "暂未设置" : phone}  onChange={this.writePhone}/>
            </Form.Item>
            <Form.Item label="签名" className="long">
              <Input
                placeholder={!data.motto ? "暂未设置" : data.motto}
                onChange={this.writeM}
              />
            </Form.Item>

            <Button className="changebtn" onClick={this.finish}>
              确认修改
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect()(ChangeData);
