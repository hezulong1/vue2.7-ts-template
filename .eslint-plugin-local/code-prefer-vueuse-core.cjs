const messageId = 'perfer-vueuse-core';

module.exports = {
  meta: {
    fixable: 'code',
    messages: {
      [messageId]: 'Import from \'@vueuse/core\' instead of \'@vueuse/shared\'.',
    },
  },
  /**
   * @param { import('eslint').Rule.RuleContext } context
   * @return { import('eslint').Rule.RuleListener }
   */
  create(context) {
    function verifySource(source) {
      if (!source) return;
      if (source.value !== '@vueuse/shared') return;

      context.report({
        node: source,
        messageId,
        fix: fixer => fixer.replaceTextRange([source.range[0] + 1, source.range[1] - 1], '@vueuse/core'),
      });
    }

    return {
      ImportDeclaration(node) {
        // Skip imports without specifiers in `.d.ts` files
        if (
          node.specifiers.length === 0 &&
          context.filename.endsWith('.d.ts')
        ) return;

        verifySource(node.source);
      },
      ExportNamedDeclaration(node) {
        verifySource(node.source);
      },
      ExportAllDeclaration(node) {
        verifySource(node.source);
      },
    };
  },
};
