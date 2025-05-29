// // composables/useTheme.ts
// import { onMounted } from 'vue'
// import { useRuntimeConfig } from '#app'

// export function useTheme(): void {
//   const config = useRuntimeConfig().public
//   const theme = config.theme ?? 'auto'

//   onMounted(() => {
//     const html = document.documentElement

//     if (theme === 'dark') {
//       html.classList.add('dark')
//     } else if (theme === 'light') {
//       html.classList.add('light')
//     } else {
//       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
//       if (prefersDark.matches) {
//         html.classList.add('dark')
//       } else {
//         html.classList.remove('dark')
//       }

//       prefersDark.addEventListener('change', (e: MediaQueryListEvent) => {
//         if (e.matches) {
//           html.classList.add('dark')
//         } else {
//           html.classList.remove('dark')
//         }
//       })
//     }
//   })
// }
