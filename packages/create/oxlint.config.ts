import { defineConfig } from 'oxlint'

import baseConfig from '../../oxlint.config.ts'

export default defineConfig({
  extends: [baseConfig],
  rules: {
    'typescript/no-unsafe-type-assertion': 'off',
  },
})
