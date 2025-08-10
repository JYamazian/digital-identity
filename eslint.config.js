import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },
  },
  dirs: {
    src: [
      './components',
      './composables',
      './layouts',
      './middleware',
      './pages',
      './plugins',
      './server',
      './utils',
    ],
  },
})
  .append(
    // Ignore patterns
    {
      ignores: [
        'node_modules/**',
        '.output/**',
        'dist/**',
        '.nuxt/**',
        'coverage/**',
        '*.log',
        '.env*',
        'package-lock.json',
        'yarn.lock',
        'pnpm-lock.yaml',
      ],
    },
    // Your custom configs here
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
      rules: {
        // Custom rules
        'no-console': 'warn',
        'no-debugger': 'warn',
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'off', // Allow any types
        'vue/no-multiple-template-root': 'off',
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'always',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],
      },
    },
    {
      files: ['**/*.config.{js,ts}', '**/nuxt.config.{js,ts}'],
      rules: {
        'no-console': 'off',
      },
    },
  )
