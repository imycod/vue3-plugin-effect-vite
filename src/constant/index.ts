/*
 * @Description:
 * @Author: fjw
 * @Date: 2022-05-16 09:18:29
 * @LastEditors: fjw
 * @LastEditTime: 2022-06-15 10:15:46
 */
/**
 * 是否记住密码
 */
export enum RememberEnum {
  Yes = '1',
  No = '0'
}

/**
 * http content-type类型
 */
export enum HttpType {
  Json = 'application/json',
  Formdata = 'application/x-www-form-urlencoded',
  File = 'multipart/form-data'
}

/**
 * http请求类型
 */
export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
  PATCH = 'patch'
}

/** 后端微服务服务名 */
export enum NameSpace {
  EHR = '/service-pc',
  BASE = '/auth',
  PLATFORM = '/platform',
  PUBLIC = '/document',
  ADMIN = '/admin',
  empty = '',
  MOCK= '/mock',
}

