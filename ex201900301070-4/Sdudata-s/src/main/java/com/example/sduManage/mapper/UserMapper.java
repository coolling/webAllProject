package com.example.sduManage.mapper;

import com.example.sduManage.entity.Social;
import com.example.sduManage.entity.Timetable;
import com.example.sduManage.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper

@Repository
public interface UserMapper {
    @Select("Select * from user")
    List<User> findAll();

    @Select("Select * from user where userName = #{id} and password = #{pass}")
    User login(@Param("id") String id, @Param("pass") String pass);

    @Select("Select * from user where userName = #{id}")
    User isRegiste(@Param("id") String id);

    @Insert("Insert  Into user (`userName`,`password`,`sex`,`campus`,`major`,`goSchool`,`birthday`,`name`) VALUES (#{userId},#{psw},#{sex},#{campus},#{major},#{goSchool},#{birthday},#{name})")
    int registe(@Param("userId") String userId, @Param("psw") String psw, @Param("sex") String sex, @Param("campus") String campus, @Param("major") String major, @Param("goSchool") String goSchool, @Param("birthday") String birthday, @Param("name") String name);

    @Update("Update user SET password = #{psw} WHERE userName=#{userId}")
    int forget(@Param("userId") String userId, @Param("psw") String psw);

    @Select("Select * from social where userName = #{id}")
    List<Social> getSocial(@Param("id") String id);

//    @Select("Select * from score where userName = #{id} and year = #{year}")
//    List<Score> getScore(@Param("id") String id, @Param("year") int year);

    @Update("Update user SET sex=#{sex},campus =#{campus},headImg =#{path},goSchool= #{goSchool},userName=#{userId},headImg=#{path},major=#{major},birthday=#{birthday},name=#{name} WHERE userName=#{userId}")
    int changeUser(@Param("userId") String userId, @Param("sex") String sex, @Param("campus") String campus, @Param("major") String major, @Param("birthday") String birthday, @Param("goSchool") String goSchool, @Param("name") String name, @Param("path") String path);

    @Insert("Insert  Into social (`title`,`ashort`,`along`,`userName`,`Photo`) VALUES (#{title},#{ashort},#{along},#{userId},#{path})")
    int addSocial(@Param("userId") String userId, @Param("title") String title, @Param("ashort") String ashort, @Param("along") String along, @Param("path") String path);

    @Insert("Insert  Into timetable (`teacher`,`name`,`spend`,`time`,`userName`,`year`) VALUES (#{teacher},#{name},#{spend},#{time},#{userName},#{year})")
    int addClass(@Param("teacher") String teacher, @Param("name") String name, @Param("spend") int spend, @Param("time") String time, @Param("userName") String userName, @Param("year") int year);

    @Select("Select * from timetable where userName = #{id} and year =#{year}")
    List<Timetable> getClasss(@Param("id") String id, @Param("year") int year);

    @Delete("delete from timetable where userName = #{id} and year =#{year}")
    int refreshClass(@Param("id") String id, @Param("year") int year);

    @Delete("delete from social where socailId =#{socailId}")
    int deleteSocial(@Param("socailId") int socailId);

    @Update("Update social SET title=#{title},ashort =#{ashort},along= #{along},Photo=#{path} WHERE socailId=#{socailId}")
    int editeSocials(@Param("socailId") int socailId, @Param("title") String title, @Param("ashort") String ashort, @Param("along") String along, @Param("path") String path);

    @Update("Update timetable SET result=#{result} WHERE classId=#{classId}")
    int writeResult(@Param("result") int result, @Param("classId") int classId);
    @Select("Select * from social ")
    List<Social> getAllSocial();
}
