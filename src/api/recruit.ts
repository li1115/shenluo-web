import request from './request'
import type {
  ApiResult,
  PageResult,
  RecruitCategory,
  PublicRecruitItem,
  PublicRecruitDetail,
  RecruitPageQuery,
} from './types'

/** 获取招聘类目 Tab */
export function getRecruitCategories(): Promise<ApiResult<RecruitCategory[]>> {
  return request.get('/api/recruit/categories').then((res) => res.data)
}

/** C 端招聘分页列表 */
export function getRecruitPage(query: RecruitPageQuery): Promise<ApiResult<PageResult<PublicRecruitItem>>> {
  return request.post('/api/recruits', query).then((res) => res.data)
}

/** C 端招聘详情 */
export function getRecruitDetail(recruitNo: string): Promise<ApiResult<PublicRecruitDetail>> {
  return request.get(`/api/recruits/${recruitNo}`).then((res) => res.data)
}

/** C 端招聘相关职位 */
export function getRecruitRelated(recruitNo: string): Promise<ApiResult<PublicRecruitItem[]>> {
  return request.get(`/api/recruits/${recruitNo}/related`).then((res) => res.data)
}