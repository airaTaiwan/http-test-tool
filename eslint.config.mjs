// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import nuxt from './packages/web/.nuxt/eslint.config.mjs'

export default nuxt(
  antfu(
    {
      unocss: true,
      formatters: true,
    },
  ),
)
