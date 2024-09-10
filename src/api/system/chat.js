import request from '@/utils/request'

// 查询聊天列表
export function listChat(query) {
  return request({
    url: '/system/chat/list',
    method: 'get',
    params: query
  })
}

// 查询聊天详细
export function getChat(logsId) {
  return request({
    url: '/system/chat/' + logsId,
    method: 'get'
  })
}

// 新增聊天
export function addChat(data) {
  return request({
    url: '/system/chat',
    method: 'post',
    data: data
  })
}

// 修改聊天
export function updateChat(data) {
  return request({
    url: '/system/chat',
    method: 'put',
    data: data
  })
}

// 删除聊天
export function delChat(logsId) {
  return request({
    url: '/system/chat/' + logsId,
    method: 'delete'
  })
}
