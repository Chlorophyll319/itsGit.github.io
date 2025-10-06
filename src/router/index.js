// src/router/index.js
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

// 建立 router 實例並套用 layout
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// 導航完成後自動設定 document.title
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | itsGit` : 'itsGit'
})

// onError 錯誤處理，避免 dynamic import 崩潰
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('router:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('router:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

// router 初始化完成後清除錯誤 reload 記號
router.isReady().then(() => {
  localStorage.removeItem('router:dynamic-reload')
})

export default router
