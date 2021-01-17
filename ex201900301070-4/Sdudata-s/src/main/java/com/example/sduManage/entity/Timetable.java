package com.example.sduManage.entity;

public class Timetable {

  private long classId;
  private String teacher;
  private String name;
  private long spend;
  private String time;
  private String userName;
  private long year;
  private long result;


  public long getClassId() {
    return classId;
  }

  public void setClassId(long classId) {
    this.classId = classId;
  }


  public String getTeacher() {
    return teacher;
  }

  public void setTeacher(String teacher) {
    this.teacher = teacher;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public long getSpend() {
    return spend;
  }

  public void setSpend(long spend) {
    this.spend = spend;
  }


  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
  }


  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }


  public long getYear() {
    return year;
  }

  public void setYear(long year) {
    this.year = year;
  }


  public long getResult() {
    return result;
  }

  public void setResult(long result) {
    this.result = result;
  }

}
