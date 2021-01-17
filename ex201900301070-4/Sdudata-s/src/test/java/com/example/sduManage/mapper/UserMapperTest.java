package com.example.sduManage.mapper;

import com.example.sduManage.DemoApplicationTests;
import com.example.sduManage.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

class UserMapperTest extends DemoApplicationTests {
    @Autowired
    private UserMapper userMapper;
    @Test
    void findAll() {
        List<User> list =userMapper.findAll();
        for(User u:list){
            System.out.println(u);
        }
    }

    @Test
    void findOne() {
       // User user =userMapper.findOne("22");
       // System.out.println(user);

    }
}