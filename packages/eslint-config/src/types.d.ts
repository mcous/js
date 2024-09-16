declare module 'eslint-config-prettier' {
  import type { ConfigWithExtends } from 'typescript-eslint'

  const config: ConfigWithExtends

  export default config
}

declare module 'eslint-plugin-promise' {
  import type { ConfigWithExtends } from 'typescript-eslint'

  const plugin: {
    configs: {
      'flat/recommended': ConfigWithExtends
    }
  }

  export default plugin
}
