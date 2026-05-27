import request from './request'
import type { ApiResult, ProductItem } from './types'

/** 产品列表 */
export function getProducts(): Promise<ApiResult<ProductItem[]>> {
  return request.get('/api/products').then((res) => res.data)
}

/** 产品详情（按 productCode） */
export function getProductDetail(productCode: string): Promise<ApiResult<ProductItem>> {
  return request.get(`/api/products/${productCode}`).then((res) => res.data)
}