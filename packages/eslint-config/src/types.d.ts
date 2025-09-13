declare module 'eslint-plugin-promise' {
  import type ESLint from 'eslint'

  const plugin: {
    configs: {
      'flat/recommended': ESLint.Linter.Config[]
    }
  }

  export default plugin
}
