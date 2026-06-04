import { onMounted, onUnmounted } from 'vue'

/**
 * 视口感知滚动加载动画 —— 元素进入视口时触发 reveal 动效
 * 用法：在组件 setup 中调用 useRevealOnScroll()，并将 .reveal 类添加到需要动画的元素上
 * 返回 refresh 函数，用于异步数据加载后手动触发检测
 */
export function useRevealOnScroll(): { refresh: () => void } {
  let revealOnScroll: () => void

  const refresh = () => {
    revealOnScroll?.()
  }

  onMounted(() => {
    revealOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.95
      const revealElements = document.querySelectorAll('.reveal')
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < triggerBottom) {
          el.classList.add('revealed')
        }
      })
    }
    window.addEventListener('scroll', revealOnScroll)
    revealOnScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', revealOnScroll)
  })

  return { refresh }
}