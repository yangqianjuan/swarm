import request from '@/utils/request'
import fetch from "@/config/fetch";

/**
 * 登陆
 */

export const login = data => fetch("/user/login", data);

/**
 * 退出
 */

export const signout = () => fetch("/user/signout");

/**
 * 获取用户信息
 */
export const getAdminInfo = () => fetch("/user/info");
/**
 * 获取节点list
 */

export const getNodeList = data => request({
  url: "/api/node/list",
  method: 'get',
  params: data
})
/**
 * 获取节点详情
 */

export const getNodeDetail = data => request({
  url: "/api/node/detail",
  method: 'get',
  params: data
})

/**
 * 获取支票list
 */

export const getChequeList = data => request({
  url: "/api/cheque/list",
  method: 'get',
  params: data
})
/**
 * 获取支票详情
 */

export const getChequeDetail = data => request({
  url: "/api/cheque/detail",
  method: 'get',
  params: data
})
