const messageId = 'perfer-dayjs';

module.exports = {
  meta: {
    fixable: 'code',
    messages: {
      [messageId]: 'Import from \'{{replacement}}\' instead of \'{{identifier}}\'.',
    },
  },
  /**
   * @param { import('eslint').Rule.RuleContext } context
   * @return { import('eslint').Rule.RuleListener }
   */
  create(context) {
    function verifySource(source) {
      if (!source) return;
      if (!source.value.startsWith('dayjs/esm')) return;

      const removedToken = '/esm';
      const beginLength = 'dayjs'.length;

      context.report({
        node: source,
        messageId,
        data: {
          replacement: source.value.replace(new RegExp(removedToken, 'g'), ''),
          identifier: source.value,
        },
        fix(fixer) {
          const startIndex = source.range[0] + 1 + beginLength;
          return fixer.replaceTextRange([startIndex, startIndex + removedToken.length], '');
        },
      });
    }

    return {
      ImportDeclaration(node) {
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
