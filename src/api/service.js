import request from '@/utils/request'

export function serviceList(data) {
  return request({
    url: '/v2/test/gz',
    method: 'get',
    data
  })
}

export function serviceDelete(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
