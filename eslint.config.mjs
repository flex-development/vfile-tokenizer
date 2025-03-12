/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * Root eslint configuration object.
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...(await import('./eslint.base.config.mjs')).default,
  {
    ignores: [
      '!**/__fixtures__/**/dist/',
      '!**/__fixtures__/node_modules/',
      '!**/typings/**/dist/',
      '**/*config.*.timestamp*',
      '**/.vitest-reports/',
      '**/.yarn/',
      '**/CHANGELOG.md',
      '**/LICENSE.md',
      '**/RELEASE_NOTES.md',
      '**/__tests__/reports/',
      '**/coverage/',
      '**/dist/',
      '**/tsconfig*temp.json'
    ]
  },
  {
    files: ['__fixtures__/constructs/*.mts'],
    rules: {
      'unicorn/no-this-assignment': 0
    }
  },
  {
    files: ['__fixtures__/markdown/*.md'],
    rules: {
      'mdx/remark': 0
    }
  },
  {
    files: ['src/enums/codes.mts'],
    rules: {
      'sort-keys': 0
    }
  },
  {
    files: [
      'src/types/__tests__/encoding.spec-d.mts',
      'src/types/encoding.mts'
    ],
    rules: {
      'unicorn/text-encoding-identifier-case': 0
    }
  }
]
