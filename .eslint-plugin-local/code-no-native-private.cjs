// from 'vscode'

/**
 * @implements { import('eslint').Rule.RuleModule }
 */
module.exports = new class ApiProviderNaming {
  constructor() {
    /**
     * @readonly
     * @type { import('eslint').Rule.RuleMetaData }
     */
    this.meta = {
      messages: {
        slow: 'Native private fields are much slower and should only be used when needed. Ignore this warning if you know what you are doing, use compile-time private otherwise. See https://github.com/microsoft/vscode/issues/185991#issuecomment-1614468158 for details',
      },
    };
  }

  /**
   * @param { import('eslint').Rule.RuleContext } context
   * @return { import('eslint').Rule.RuleListener }
   */
  create(context) {
    return {
      ['PropertyDefinition PrivateIdentifier']: (node) => {
        context.report({
          node,
          messageId: 'slow',
        });
      },
      ['MethodDefinition PrivateIdentifier']: (node) => {
        context.report({
          node,
          messageId: 'slow',
        });
      },
    };
  }
}();
