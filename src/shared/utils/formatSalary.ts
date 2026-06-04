import type { PublicRecruitDetail, PublicRecruitItem } from '@/api/types'

/** 格式化薪资展示 */
export function formatSalary(item: PublicRecruitDetail | PublicRecruitItem): string {
  if (item.salaryNegotiable) return '薪资面议'
  const min = item.salaryMin ? `${(item.salaryMin / 1000).toFixed(0)}k` : ''
  const max = item.salaryMax ? `${(item.salaryMax / 1000).toFixed(0)}k` : ''
  const months = item.salaryMonths ? `${item.salaryMonths}薪` : ''
  const range = min && max ? `${min}-${max}` : min || max
  return [range, months].filter(Boolean).join(' · ')
}