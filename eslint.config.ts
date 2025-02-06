import antfu from '@antfu/eslint-config'

import { RULES as perfectionistRules } from './eslint/config/perfectionist'
import { RULES as unicornRules } from './eslint/config/unicorn'
import { IGNORES } from './eslint/globs'

export default antfu(
  { ignores: IGNORES },
  {
    rules: {
      'import/order': ['error', {
        'alphabetize': { order: 'asc' },
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
        'newlines-between': 'always',
      }],
      'node/handle-callback-err': ['error', '^(err|error)$'],
      'node/no-deprecated-api': 'error',
      'node/no-exports-assign': 'error',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
      'node/process-exit-as-throw': 'error',
      'object-shorthand': ['error', 'properties'],
      // 'perfectionist/sort-classes': ['error', { order: 'asc' }],
      'style/brace-style': ['error', '1tbs'],
      'style/no-extra-semi': 'error',
      'style/padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        { blankLine: 'always', next: ['const', 'let', 'var'], prev: '*' },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
        { blankLine: 'always', next: '*', prev: 'if' },
        { blankLine: 'always', next: 'if', prev: '*' },
      ],
      'ts/array-type': ['error', { default: 'generic' }],
      'ts/consistent-indexed-object-style': ['error', 'record'],
      'ts/consistent-type-definitions': ['error', 'type'],
      'ts/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      ...perfectionistRules,
      ...unicornRules,
    },
  },
)
