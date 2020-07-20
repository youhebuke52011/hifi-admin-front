import request from '@/utils/request'

export function serviceList(data) {
  return request({
    url: '/v2/singer/list',
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

export function serviceAddHttp(data) {
  return request({
    url: '/v2/singer/add',
    method: 'post',
    data
  })
}

export function serviceUpdateHttp(data) {
  return request({
    url: '/v2/singer/update',
    method: 'post',
    data
  })
}

export function serviceDetail(query) {
  return request({
    url: '/v2/singer/detail',
    method: 'get',
    params: query
  })
}
