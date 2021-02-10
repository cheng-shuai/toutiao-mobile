/**
 * 搜索相关模块
 */
import request from '@/utils/request'

/**
 * 获取联想建议
 */
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 */
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

/**
 * 获取用户搜索历史
 */
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
