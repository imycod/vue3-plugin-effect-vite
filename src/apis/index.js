import http from "@/utils/http"

export function exportRecruitment(id) {
    return http.request({
        url: `/service-pc/recruitment/exportTemplate/${id}`,
        method: 'get',
        responseType: 'blob',
        Authorization:'Bearera3a0c184-420f-4c95-b8a2-e7375004e181'
    })
}