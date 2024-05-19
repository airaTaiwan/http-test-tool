import type { HighlighterCore } from 'shiki/core'
import { getHighlighterCore } from 'shiki/core'

const color = useColorMode()

export const shiki = shallowRef<HighlighterCore>()

getHighlighterCore({
  themes: [
    import('shiki/themes/vitesse-light.mjs'),
    import('shiki/themes/vitesse-dark.mjs'),
  ],
  langs: [
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/typescript.mjs'),
  ],
  loadWasm: import('shiki/wasm'),
}).then((highlighter) => {
  shiki.value = highlighter
})

export function useHighlightedGlob(code: () => string) {
  return computed(() => {
    if (!shiki.value)
      return sanitizeHtml(code())
    return shiki.value.codeToHtml(code(), {
      lang: 'glob',
      theme: color.value ? 'vitesse-dark' : 'vitesse-light',
      structure: 'inline',
    })
  })
}

export function sanitizeHtml(html: string) {
  return html.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
