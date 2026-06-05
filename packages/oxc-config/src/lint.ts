import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['oxc', 'promise', 'typescript', 'unicorn'],
  options: {
    typeAware: true,
  },
  env: {
    builtin: true,
    es2026: true,
  },
  categories: {
    correctness: 'error',
    perf: 'error',
    suspicious: 'error',
    pedantic: 'error',
  },
  rules: {
    // correctness
    'typescript/restrict-template-expressions': [
      'error',
      {
        allowAny: false,
        allowBoolean: true,
        allowNullish: false,
        allowNumber: true,
        allowRegExp: false,
        allowNever: false,
      },
    ],

    // perf
    'no-await-in-loop': 'off', // sequential awaits are often intentional

    // suspicious
    'no-underscore-dangle': 'off', // underscore prefixes are conventional

    // pedantic
    // arbitrary size limits, not quality signals
    'max-classes-per-file': 'off',
    'max-depth': 'off',
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-nested-callbacks': 'off',
    'no-inline-comments': 'off', // trailing comments are useful
    'no-throw-literal': 'off', // use typescript/only-throw-error
    'no-warning-comments': 'off', // TODO/FIXME comments are fine
    'require-await': 'off', // use typescript/require-await
    'typescript/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true },
    ],
    'typescript/prefer-readonly-parameter-types': 'off', // impractical on most signatures
    // optional booleans are intentionally falsy; nullable strings still aren't
    'typescript/strict-boolean-expressions': [
      'error',
      { allowNullableBoolean: true },
    ],
    'unicorn/no-array-callback-reference': 'off', // false positives on named callbacks
    'unicorn/no-useless-undefined': 'off', // explicit undefined is often clearer

    // style
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'typescript/adjacent-overload-signatures': 'error',
    'typescript/array-type': 'error',
    'typescript/ban-tslint-comment': 'error',
    'typescript/class-literal-property-style': 'error',
    'typescript/consistent-generic-constructors': 'error',
    'typescript/consistent-indexed-object-style': 'error',
    'typescript/consistent-type-assertions': 'error',
    'typescript/consistent-type-definitions': 'error',
    'typescript/dot-notation': 'error',
    'typescript/no-inferrable-types': 'error',
    'typescript/prefer-find': 'error',
    'typescript/prefer-for-of': 'error',
    'typescript/prefer-function-type': 'error',
    'typescript/prefer-reduce-type-parameter': 'error',
    'typescript/prefer-regexp-exec': 'error',
    'typescript/prefer-return-this-type': 'error',
    'typescript/prefer-string-starts-ends-with': 'error',
    'typescript/unified-signatures': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/consistent-date-clone': 'error',
    'unicorn/consistent-existence-index-check': 'error',
    'unicorn/consistent-template-literal-escape': 'error',
    'unicorn/error-message': 'error',
    'unicorn/filename-case': 'error',
    'unicorn/no-array-method-this-argument': 'error',
    'unicorn/no-await-expression-member': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-null': 'error',
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-useless-collection-argument': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/numeric-separators-style': 'error',
    'unicorn/prefer-array-index-of': 'error',
    'unicorn/prefer-bigint-literals': 'error',
    'unicorn/prefer-class-fields': 'error',
    'unicorn/prefer-classlist-toggle': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-global-this': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-logical-operator-over-ternary': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-object-from-entries': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-response-static-json': 'error',
    'unicorn/prefer-spread': 'error',
    'unicorn/prefer-string-raw': 'error',
    'unicorn/prefer-string-trim-start-end': 'error',
    'unicorn/prefer-structured-clone': 'error',
    'unicorn/prefer-ternary': 'error',
    'unicorn/relative-url-style': 'error',
    'unicorn/require-array-join-separator': 'error',
    'unicorn/require-module-attributes': 'error',
    'unicorn/switch-case-braces': 'error',
    'unicorn/switch-case-break-position': 'error',
    'unicorn/text-encoding-identifier-case': 'error',
    'unicorn/throw-new-error': 'error',

    // restriction
    'no-empty': 'error',
    'no-empty-function': 'error',
    'no-regex-spaces': 'error',
    'no-var': 'error',
    'typescript/no-dynamic-delete': 'error',
    'typescript/no-empty-object-type': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-invalid-void-type': 'error',
    'typescript/no-namespace': 'error',
    'typescript/no-non-null-asserted-nullish-coalescing': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/non-nullable-type-assertion-style': 'error',
    'typescript/prefer-literal-enum-member': 'error',
    'typescript/use-unknown-in-catch-callback-variable': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-anonymous-default-export': 'error',
    'unicorn/no-array-for-each': 'error',
    'unicorn/no-array-reduce': 'error',
    'unicorn/no-document-cookie': 'error',
    'unicorn/no-magic-array-flat-depth': 'error',
    'unicorn/no-process-exit': 'error',
    'unicorn/no-useless-error-capture-stack-trace': 'error',
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-module': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-number-properties': 'error',

    // nursery
    'no-useless-assignment': 'error',
    'typescript/no-unnecessary-condition': 'error',
    'typescript/prefer-optional-chain': 'error',
    'unicorn/no-useless-iterator-to-array': 'error',
  },
  overrides: [
    {
      files: ['**/{__tests__,tests,test}/**'],
      plugins: ['vitest'],
      rules: {
        'vitest/no-identical-title': 'error',
        'vitest/no-import-node-test': 'error',
        'vitest/no-interpolation-in-snapshots': 'error',
        'vitest/no-mocks-import': 'error',
        'vitest/no-unneeded-async-expect-function': 'error',
        'vitest/prefer-called-exactly-once-with': 'error',
        'vitest/prefer-describe-function-title': 'error',
        // allow function describe titles (else valid-title demands strings)
        'vitest/valid-title': ['error', { ignoreTypeOfDescribeName: true }],
        // strict type rules relaxed for test scaffolding
        'typescript/no-non-null-assertion': 'off',
        'typescript/no-unsafe-argument': 'off',
        'typescript/no-unsafe-assignment': 'off',
        'typescript/no-unsafe-type-assertion': 'off',
      },
    },
  ],
})
