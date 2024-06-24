const pkg = require('./package.json');

const restricted = [
  {
    name: '@vueuse/core',
    importNames: ['isIOS', 'hasOwn'],
  },
];

const dependencies = Object.keys(pkg.dependencies)
  .filter(pattern => ['vue', 'vue-router', 'pinia', 'vuex', '@vueuse/core'].includes(pattern))
  .map(pattern => ({ pattern, group: 'external', position: 'after' }));

module.exports = {
  root: true,
  plugins: ['local'],
  extends: 'h21/ts-vue2',
  rules: {
    'local/code-no-native-private': 2,
    'local/code-perfer-dayjs': 2,
    'local/code-prefer-vueuse-core': 2,
    'no-restricted-imports': [2, { paths: restricted }],
    'unicorn/no-lonely-if': 0,
    'import/order': [2, {
      groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      pathGroups: [
        { pattern: 'vue', group: 'external', position: 'before' },
        { pattern: 'vue-router', group: 'external', position: 'before' },
        { pattern: 'vuex', group: 'external', position: 'before' },
        { pattern: 'pinia', group: 'external', position: 'before' },
        { pattern: '@vue/**', group: 'external', position: 'before' },
        { pattern: '@vueuse/**', group: 'external', position: 'before' },
        { pattern: '@element-plus/icons-vue', group: 'external', position: 'before' },
        ...dependencies,
        { pattern: '@/**', group: 'internal', position: 'after' },
      ],
      pathGroupsExcludedImportTypes: ['type'],
    }],
  },
  overrides: [
    {
      files: ['**/*.md', '**/*.md/*.*', 'scripts/*.js', 'vite.config.js'],
      rules: {
        'no-alert': 0,
        'no-console': 0,
        'no-restricted-imports': 0,
      },
    },
  ],
};
