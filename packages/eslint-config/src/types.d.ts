declare module 'eslint-plugin-promise' {
  import type { ConfigWithExtends } from 'typescript-eslint'

  const plugin: {
    configs: {
      'flat/recommended': ConfigWithExtends
    }
  }

  export default plugin
}
