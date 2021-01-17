package com.example.sduManage.mapper;

import com.example.sduManage.DemoApplicationTests;
import com.example.sduManage.entity.Score;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

class ScoreMapperTest extends DemoApplicationTests {
 @Autowired
 private ScoreMapper scoreMapper;
    @Test
    void finAll() {
        List<Score> list =scoreMapper.finAll();
        for(Score a: list){
            System.out.println(a);
        }
    }
    @Test
    void findByPage(){

        //执行分页
        PageHelper.startPage(2,2);
        //执行查询
        List<Score> list =scoreMapper.finAll();
        //封装pageInfo对象
        PageInfo<Score> pageInfo =new PageInfo<>(list);
        for(Score score:pageInfo.getList()){
            System.out.println(score);
        }
    }
}