package com.example.sduManage.controller;

import com.example.sduManage.entity.OutputInformation;
import com.example.sduManage.entity.User;
import com.example.sduManage.properties.aliyun;
import com.example.sduManage.service.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
@CrossOrigin
@RestController
public class TestController {
    @Autowired
    private ApiService apiService;
    @Resource//找bean
    private  User user;
   @PostMapping(value = "/login")
    public OutputInformation login(String userId, String psw) throws IOException {
        return apiService.login(userId,psw);
    }

    @PostMapping(value ="/registe")
    public OutputInformation registe(String userId, String psw,String major,String campus ,String sex, String birthday,String goSchool,String name
    ) throws IOException {
        return apiService.registe(userId, psw,major,campus , sex, birthday,goSchool,name);
    }
    @PostMapping(value = "/forget")
    public OutputInformation forget(String userId, String psw) throws IOException {
        return apiService.forget(userId,psw);
    }
    @PostMapping("/getUser")
    public OutputInformation getUser(@RequestHeader(value = "token")String token) throws IOException {
        return apiService.getUser(token);
    }
    @PostMapping("/getSocial")
    public OutputInformation getSocail(@RequestHeader(value = "token")String token) throws IOException {
        return apiService.getSocail(token);
    }
//    @PostMapping("/getResult")
//    public OutputInformation getResult(@RequestHeader(value = "token")String token,int year) throws IOException {
//        return apiService.getResult(token,year);
//    }
    @PostMapping("/changeUser")
    public OutputInformation changeUser(@RequestHeader(value = "token")String token, @RequestParam(required = false) MultipartFile pic, String userId, String major, String campus , String sex, String birthday, String goSchool, String name,String url) throws IOException {
        if(pic==null){
            return apiService.changeUser2(token,userId,sex ,campus ,major , birthday,goSchool,name,url);
        }else{
            return apiService.changeUser(token,userId,sex ,campus ,major , birthday,goSchool,name,pic);
        }

    }
    @PostMapping("/addSocial")
    public OutputInformation addSocial(@RequestHeader(value = "token")String token,@RequestParam MultipartFile pic,String title,String ashort,String along ) throws IOException {
        return apiService.addSocial(token, title,ashort,along,pic);
    }
    @PostMapping("/chooseClass")
    public OutputInformation chooseClass(@RequestHeader(value = "token")String token,String classes,int year ) throws IOException {
        return apiService.chooseClass(token, classes,year);
    }
    @PostMapping("/getClass")
    public OutputInformation getClass(@RequestHeader(value = "token")String token ) throws IOException {
        return apiService.getClasses(token);
    }

    @PostMapping("/writeResult")
    public OutputInformation  writeResult(@RequestHeader(value = "token")String token,int score ,int classId) throws IOException {
        return apiService.writeResult(token,score,classId);
    }
    @PostMapping("/deleteSocial")
    public OutputInformation  deleteSocial(@RequestHeader(value = "token")String token,@RequestParam(value = "socialId") int socialId) throws IOException {
        return apiService.deleteSocial(token,socialId);
    }
    @PostMapping("/editeSocial")
    public OutputInformation  editeSocial(@RequestHeader(value = "token")String token, @RequestParam(required = false) MultipartFile pic,@RequestParam(value = "socialId") int socialId,String title,String ashort,String along,String url) throws IOException {

       if(pic==null){
           return apiService.editeSocial2(token,socialId,title,ashort,along,url);
       }else{
           return apiService.editeSocial(token,socialId,title,ashort,along,pic);
       }

    }
    @Value("${picPath}")//为了简化从properties里取配置
    private String picPath;
    @GetMapping("/picPath")
    public String getPath(){
        return  picPath;
    }
    @Autowired//@Resource的作用相当于@Autowired,只不过@Autowired按byType自动注入,而@Resource默认按 byName自动注入罢了。

    private aliyun a;
    @GetMapping("/aliyun")
    public  aliyun getPro(){
        return  a;
    }
}
