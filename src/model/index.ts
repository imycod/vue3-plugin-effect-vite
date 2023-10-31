/*
 * @Description:
 * @Author: fjw
 * @Date: 2022-06-02 14:20:08
 * @LastEditors: fjw
 * @LastEditTime: 2022-07-13 14:56:28
 */
export interface BaseModel<T> {
  code: any; //后端返回码, 0=正常, 这个具体情况具体分析, 依据后端框架来决定
  msg?: string; //返回的说明信息
  errorMessage?: string; // pigx接口返回的说明信息
  result: T; //数据
  data: T; //PIGX数据
  errorCode: T; //流程引擎返回的错误码
}

export interface BaseListModel<T> {
  //分页型model
  code: any;
  msg: string;
  result: {
    current: number;
    pages: number;
    size: number;
    records: T[];
    total: number;
  };
  data: T; //PIGX数据
}

//登录的用户信息
export interface UserInfo {}
//账号密码信息
export interface AccountInfo {
  username: string;
  password: string;
}

//分页格式定义
export interface PageType {
  pageNumber: number;
  pageSize: number;
  total?: number;
}
