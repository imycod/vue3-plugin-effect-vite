import request from "@/utils/request"

export function getTableList() {
    return request({
        // url: `/posts`,
        url: `/api/v1/users`,
        method: 'get',
        scope: '/mockapi'
    })
}
export function putTableList(body) {
    const id = body.id
    return request({
        // url: `/posts/${id}`,
        url: `/api/v1/users/${id}`,
        body:JSON.stringify(body),
        method: 'put',
        scope: '/mockapi'
    })
}
export function postTableList(body) {
    return request({
        // url: `/posts`,
        url: `/api/v1/users`,
        body,
        method: 'post',
        scope: '/mockapi'
    })
}
export function deleteTableList() {
    return request({
        // url: `/posts`,
        url: `/api/v1/users`,
        method: 'delete',
        scope: '/mockapi'
    })
}

