import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

// 获取浏览器语言
const getBrowserLanguage = () => {
  const navigatorLang = navigator.language.toLowerCase()
  if (navigatorLang.includes('zh')) {
    return 'zh'
  }
  return 'en'
}

// 获取本地保存的语言设置或使用浏览器语言
const getLocale = () => {
  const cachedLocale = localStorage.getItem('locale')
  if (cachedLocale) {
    return cachedLocale
  }
  return getBrowserLanguage()
}

// 保存语言设置到本地
export const setLocale = (locale) => {
  localStorage.setItem('locale', locale)
}

const i18n = createI18n({
  legacy: false, // 使用composition API模式
  locale: getLocale(),
  fallbackLocale: 'zh', // 如果没有找到翻译就使用中文
  messages: {
    zh,
    en
  }
})

export default i18n 