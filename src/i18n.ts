import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'

/**
 * 获取浏览器语言
 * @returns 浏览器语言 目前只保留中文--英文注意样式
 */
function getBrowserLanguage(): string {
  const lang = navigator.language
  if (lang.startsWith('zh')) return 'zh-CN'
  // return 'en-US'
  return 'zh-CN'
}

function getSavedLanguage(): string | null {
  try {
    return localStorage.getItem('app-lang')
  } catch {
    return null
  }
}

const initialLocale = getSavedLanguage() || getBrowserLanguage()

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export function setLanguage(lang: 'zh-CN' | 'en-US') {
  i18n.global.locale.value = lang
  try {
    localStorage.setItem('app-lang', lang)
  } catch {
    // ignore
  }
}

export function getLanguage(): string {
  return i18n.global.locale.value
}

export default i18n