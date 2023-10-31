import axios from "@/utils/request"
import { HttpMethod, NameSpace } from '@/constant';
import { BaseListModel, BaseModel } from '@/model';

// 岗位管理
export function getJobList(params: any) {
  return axios.request<BaseModel<any>>({
    url: '/hrm/job/findPage',
    params,
    method: HttpMethod.GET,
    namespace: NameSpace.MOCK
  })
}
// 删除岗位
export function deleteJob(id: any) {
  return axios.request<BaseModel<any>>({
    url: '/hrm/job/delete/' + id,
    method: HttpMethod.DELETE,
    namespace: NameSpace.MOCK
  })
}
// 获取岗位管理tree
export function getJobTree() {
  return axios.request<BaseModel<any>>({
    url: '/hrm/job/findTree',
    method: HttpMethod.GET,
    namespace: NameSpace.MOCK
  })
}

// 新增职务
export function addJob(data: any) {
  return axios.request<BaseModel<any>>({
    url: '/hrm/job/add',
    data,
    method: HttpMethod.POST,
    namespace: NameSpace.MOCK
  })
}