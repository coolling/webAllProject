package com.example.sduManage.config;

import com.example.sduManage.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
//，@Configuration用于定义配置类，可替换xml配置文件，被注解的类内部包含有一个或多个被@Bean注解的方法，这些方法将会被AnnotationConfigApplicationContext或AnnotationConfigWebApplicationContext类进行扫描，并用于构建bean定义，初始化Spring容器
public class UserConfig {
    @Bean //产生一个Bean对象，然后这个Bean对象交给Spring管理 这些bean都需要在@Configuration注解下进行创建
    public User user() {
        User user = new User();

        return user;
    }
}
