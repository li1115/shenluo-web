import request from './request'
import type {
  ApiResult,
  PageResult,
  NewsCategory,
  PublicNewsItem,
  PublicNewsDetail,
  NewsPageQuery,
} from './types'

/** 获取新闻分类 Tab 列表 */
export function getNewsCategories(): Promise<ApiResult<NewsCategory[]>> {
  return request.get('/api/news/categories').then((res) => res.data)
}

/** 获取各 首页新闻列表 Tab（除 ALL）下 Top N */
export function getNewsCategoriesTop(limit = 20): Promise<ApiResult<PublicNewsItem[]>> {
  return request.get('/api/news/categories/top', { params: { limit } }).then((res) => res.data)
}

/** 获取单分类 Top N */
export function getNewsCategoryTop(categoryCode: string, limit = 5): Promise<ApiResult<PublicNewsItem[]>> {
  return request.get(`/api/news/categories/${categoryCode}/top`, { params: { limit } }).then((res) => res.data)
}

/** C 端新闻分页列表 */
export function getNewsPage(query: NewsPageQuery): Promise<ApiResult<PageResult<PublicNewsItem>>> {
  return request.post('/api/news', query).then((res) => res.data)
}

/** C 端新闻详情 */
export function getNewsDetail(newsNo: string): Promise<ApiResult<PublicNewsDetail>> {
  return request.get(`/api/news/${newsNo}`).then((res) => res.data)
}

/** C 端新闻相关推荐 */
export function getNewsRelated(newsNo: string, limit = 5): Promise<ApiResult<PublicNewsItem[]>> {
  return request.get(`/api/news/${newsNo}/related`, { params: { limit } }).then((res) => res.data)
}