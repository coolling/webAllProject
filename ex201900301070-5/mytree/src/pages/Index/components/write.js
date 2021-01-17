import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import shudong from "../../../img/shudong.png";
import { Input, Upload, message, Button } from "antd";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./write.css";
import Axios from "axios";
import qs from "qs";
import { UPARTICLE,UPIMAGE} from "../../../request";
const { TextArea } = Input;
class Write extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      imageUrl: "",
      title: "",
      ashort: "",
      along: "",
      file: [],
      newFile: [],
      url:""
    };
  }
  componentDidMount() {
    console.log(this.props.index);
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

    if(this.state.file.length!==0){
      const formDatas = new FormData();
      formDatas.append("image", this.state.file);
      Axios.post(UPIMAGE, formDatas, {
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => res.data)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.up(res.data)
           
          } else {
  
  
          
          }
        })
        .catch(err => {
         console.log(err)
        });
    }else{
      this.up("")
    }

  
   
  };
up=(img)=>{
  
  const formData = new FormData();
  if(img!==""){
    formData.append("images", img);
  }


  formData.append("emotion", "是个无用的参数");
  formData.append("content", this.state.along);
  Axios.post(UPARTICLE, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(res => res.data)
    .then(res => {
      console.log(res);
      if (res.code === 0) {

        message.success('添加成功');
      } else {


        message.error('添加失败');
      }
    })
    .catch(err => {

      message.error('添加失败');
    });
}
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
  writeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  writeAshort = e => {
    this.setState({
      ashort: e.target.value
    });
  };
  writeAlong = e => {
    this.setState(
      {
        along: e.target.value
      },
      () => {
        console.log(this.state);
      }
    );
  };
  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className="socialRes">
        <div className="resForm">
          
          <div className="writeT">
          {/* <img src={shudong}></img> */}
            <h1> 写下心情忘记烦恼</h1>
            </div>
            <div className="soType"></div>

            <TextArea
              rows={10}
              style={{ width: 550 }}
              onChange={this.writeAlong}
              placeholder="说点什么吧～"
              autoSize={{ minRows: 10, maxRows: 10 }}
            />
        
          <div className="soType" style={{ marginTop: "20px" }}>
            <p className="socialrep">添加一张图片吧</p>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={() => false}
              onChange={this.handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>

          <Button
            className="primary"
            type="primary"
            onClick={() => {
              this.finish();
            }}
          >
            提交
          </Button>
        </div>
      </div>
    );
  }
}

export default connect()(Write);
