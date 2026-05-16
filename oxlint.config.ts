import baseConfig from '@mcous/oxc-config/lint'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [baseConfig],
  settings: {
    typeCheck: true,
  },
  env: {
    node: true,
  },
})
