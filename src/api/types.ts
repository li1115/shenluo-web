/** 通用 API 响应包装 */
export interface ApiResult<T = unknown> {
  code: number
  message: string
  data: T
}

/** 分页响应 */
export interface PageResult<T> {
  records: T[]
  total: number
  page: number
  size: number
}

/** 分页请求参数 */
export interface PageQuery {
  page?: number
  size?: number
}

/** ==================== 新闻 ==================== */

export interface NewsCategory {
  name: string
  code: string
  sortOrder: number
}

export interface NewsTag {
  id: number
  name: string
  color: string
}

/** C 端新闻列表项 */
export interface PublicNewsItem {
  newsNo: string
  title: string
  coverUrl: string
  displayDate: string
  categoryName: string
}

/** C 端新闻列表查询 */
export interface NewsPageQuery extends PageQuery {
  categoryCode?: string
}

/** C 端新闻详情 */
export interface PublicNewsDetail {
  newsNo: string
  title: string
  coverUrl: string
  contentUrl: string
  displayDate: string
  tags: NewsTag[]
  category: NewsCategory
}

/** ==================== 招聘 ==================== */

export interface RecruitCategory {
  name: string
  code: string
  sortOrder: number
}

export interface RecruitDepartment {
  name: string
  code: string
}

export interface RecruitLocation {
  city: string
  province: string
}

/** C 端招聘列表项 */
export interface PublicRecruitItem {
  recruitNo: string
  title: string
  summary: string
  employmentType: string
  employmentTypeName: string
  educationLevel: string
  educationLevelName: string
  experienceText: string
  salaryNegotiable: number
  salaryMin: number
  salaryMax: number
  salaryMonths: number
  isUrgent: number
  isPinned: number
  city: string
  province: string
  district: string
  tags: NewsTag[]
}

/** C 端招聘列表查询 */
export interface RecruitPageQuery extends PageQuery {
  categoryCode?: string
}

/** C 端招聘详情 */
export interface PublicRecruitDetail {
  recruitNo: string
  title: string
  summary: string
  employmentType: string
  employmentTypeName: string
  educationLevel: string
  educationLevelName: string
  experienceText: string
  salaryNegotiable: number
  salaryMin: number
  salaryMax: number
  salaryMonths: number
  isUrgent: number
  isPinned: number
  category: RecruitCategory
  department: RecruitDepartment
  location: RecruitLocation
  content: string
  tags: NewsTag[]
}

/** ==================== 产品 ==================== */

export interface ProductItem {
  id: number
  productCode: string
  name: string
  description: string
}