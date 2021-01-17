package com.example.sduManage.service;

import com.alibaba.fastjson.JSONArray;
import com.example.sduManage.entity.Mytoken;
import com.example.sduManage.entity.OutputInformation;
import com.example.sduManage.entity.Timetable;
import com.example.sduManage.entity.User;
import com.example.sduManage.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;
import sun.tools.jconsole.JConsole;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.*;
import java.util.List;

@Service
public class ApiService {
    @Value("${expireTime}")
    private long expireTime;
    @Autowired
    UserMapper userMapper;

    public OutputInformation login(String userId, String psw) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);


        JSONObject out = new JSONObject();

        User s = userMapper.login(userId, psw);
        if (s != null) {
            out.put("userData", s);
            Mytoken myToken = new Mytoken(userId.toString(), System.currentTimeMillis() + expireTime);
            out.put("token", myToken.generate());
        } else {
            outputInformation = new OutputInformation(1, "账号或密码错误");
        }

        outputInformation.setData(out);


        return outputInformation;
    }

    public OutputInformation registe(String userId, String psw, String major, String campus, String sex, String birthday, String goSchool, String name) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);


        JSONObject out = new JSONObject();
        User isRe = userMapper.isRegiste(userId);
        if (isRe != null) {
            outputInformation = new OutputInformation(1, "已注册");
        } else {
            int code = userMapper.registe(userId, psw, sex, campus, major, goSchool, birthday, name);
            //out.put("code",code);
        }

        outputInformation.setData(out);


        return outputInformation;
    }

    public OutputInformation forget(String userId, String psw) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);


        JSONObject out = new JSONObject();
        int code = userMapper.forget(userId, psw);

        if (code == 1) {
            outputInformation = new OutputInformation(0);
        } else {
            outputInformation = new OutputInformation(-1);
        }
        outputInformation.setData(out);


        return outputInformation;
    }

    public OutputInformation getUser(String token) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);


        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            out.put("userData", userMapper.isRegiste(user));
        }
        outputInformation.setData(out);


        return outputInformation;
    }

    public OutputInformation getSocail(String token) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);


        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            out.put("socialData", userMapper.getSocial(user));
        }
        outputInformation.setData(out);


        return outputInformation;
    }


    private String ifLogin(String token) {
        Mytoken myToken = Mytoken.valid(token);
        if (myToken != null) {

            return myToken.getUserId();
        } else {
            return null;
        }

    }

    public OutputInformation changeUser(String token, String userId, String sex, String campus, String major , String birthday, String goSchool, String name, MultipartFile file) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);
        byte[] imageByte= file.getBytes();
//        String base64= new BASE64Encoder().encode(imageByte);
        ByteArrayInputStream byteInputStream = new ByteArrayInputStream(imageByte);
        BufferedImage  image = ImageIO.read(new ByteArrayInputStream(imageByte));
        String path=System.getProperty("user.dir")+"/src/img/headImg"+file.getOriginalFilename();
        File outputfile = new File(path);
        ImageIO.write(image, "jpg", outputfile);
        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            int code = userMapper.changeUser(userId,sex , campus, major, birthday, goSchool, name,"http://localhost:8080/img/headImg"+file.getOriginalFilename());
            if (code == 1) {
                outputInformation = new OutputInformation(0);
            } else {
                outputInformation = new OutputInformation(-1);
            }
        }
        outputInformation.setData(out);


        return outputInformation;
    }
    public OutputInformation changeUser2(String token, String userId, String sex, String campus, String major , String birthday, String goSchool, String name, String url) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);

        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            int code = userMapper.changeUser(userId,sex , campus, major, birthday, goSchool, name,url);
            if (code == 1) {
                outputInformation = new OutputInformation(0);
            } else {
                outputInformation = new OutputInformation(-1);
            }
        }
        outputInformation.setData(out);


        return outputInformation;
    }


    public OutputInformation addSocial(String token, String title, String ashort, String along,MultipartFile file) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);
        byte[] imageByte= file.getBytes();
//        String base64= new BASE64Encoder().encode(imageByte);
        ByteArrayInputStream byteInputStream = new ByteArrayInputStream(imageByte);
        BufferedImage  image = ImageIO.read(new ByteArrayInputStream(imageByte));
        String path=System.getProperty("user.dir")+"/src/img/socialProduct"+file.getOriginalFilename();
        File outputfile = new File(path);
        ImageIO.write(image, "jpg", outputfile);
        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            int code = userMapper.addSocial(user, title, ashort, along,"http://localhost:8080/img/socialProduct"+file.getOriginalFilename());
            if (code == 1) {
                outputInformation = new OutputInformation(0);
            } else {
                outputInformation = new OutputInformation(-1);
            }
        }
        outputInformation.setData(out);


        return outputInformation;
    }

    public OutputInformation chooseClass(String token, String classes, int year) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);

        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            int code;
            code = userMapper.refreshClass(user, year);

            JSONArray classs = JSON.parseObject(classes).getJSONArray("classes");
            System.out.println(classs);
            for (int i = 0; i < classs.size(); i++) {


                code = userMapper.addClass(classs.getJSONObject(i).getString("teacher"), classs.getJSONObject(i).getString("name"), classs.getJSONObject(i).getIntValue("score"), classs.getJSONObject(i).getString("time"), user, year);
                if (code == 1) {
                    outputInformation = new OutputInformation(0);
                } else {
                    outputInformation = new OutputInformation(-1);
                    break;
                }
            }


        }
        outputInformation.setData(out);


        return outputInformation;
    }

    public OutputInformation getClasses(String token) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);

        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            JSONObject out2 = new JSONObject();

            out2.put("classData1", userMapper.getClasss(user, 1));
            out2.put("classData2", userMapper.getClasss(user, 2));
            out2.put("classData3", userMapper.getClasss(user, 3));
            out2.put("classData4", userMapper.getClasss(user, 4));
            out.put("classData", out2);
        }
        outputInformation.setData(out);


        return outputInformation;
    }

    public OutputInformation writeResult(String token, int score, int classId) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);

        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            int code = userMapper.writeResult(score, classId);
            if (code == 1) {
                outputInformation = new OutputInformation(0);
            } else {
                outputInformation = new OutputInformation(-1);

            }
        }
        outputInformation.setData(out);


        return outputInformation;
    }



    public OutputInformation deleteSocial(String token, int  socailId) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);

        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            int code = userMapper.deleteSocial(socailId);
            if (code == 1) {
                outputInformation = new OutputInformation(0);
            } else {
                outputInformation = new OutputInformation(-1);

            }
        }
        outputInformation.setData(out);


        return outputInformation;
    }
    public OutputInformation editeSocial2(String token, int  socailId,String title,String ashort,String along,  String url) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);

        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            int code = userMapper.editeSocials(socailId,title,ashort,along,url);
            if (code == 1) {
                outputInformation = new OutputInformation(0);
            } else {
                outputInformation = new OutputInformation(-1);

            }
        }
        outputInformation.setData(out);


        return outputInformation;
    }

    public OutputInformation editeSocial(String token, int  socailId,String title,String ashort,String along,  MultipartFile file) throws IOException {
        OutputInformation outputInformation = new OutputInformation(0);
        byte[] imageByte= file.getBytes();
//        String base64= new BASE64Encoder().encode(imageByte);
        ByteArrayInputStream byteInputStream = new ByteArrayInputStream(imageByte);
        BufferedImage  image = ImageIO.read(new ByteArrayInputStream(imageByte));
        String path=System.getProperty("user.dir")+"/src/img/socialProduct"+file.getOriginalFilename();
        File outputfile = new File(path);
        ImageIO.write(image, "jpg", outputfile);
        JSONObject out = new JSONObject();
        String user = ifLogin(token);
        if (user == null) {
            return new OutputInformation(601);
        } else {
            int code = userMapper.editeSocials(socailId,title,ashort,along,"http://localhost:8080/img/socialProduct"+file.getOriginalFilename());
            if (code == 1) {
                outputInformation = new OutputInformation(0);
            } else {
                outputInformation = new OutputInformation(-1);

            }
        }
        outputInformation.setData(out);


        return outputInformation;
    }



}