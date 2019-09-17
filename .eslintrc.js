const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'prettier/react'],
    plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y', 'flowtype'],

    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true,
    },

    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },

    rules: {

        // ESLint: Off
        'max-len': 'off',
        'indent': 'off',
        'one-var': 'off',
        'no-plusplus': 'off',
        'prefer-spread': 'off',
        'require-jsdoc': 'off',
        'require-yield': 'off',
        'global-require': 'off',
        'spaced-comment': 'off',
        'no-unused-vars': 'off',
        'object-shorthand': 'off',
        'arrow-body-style': 'off',
        'consistent-return': 'off',
        'no-confusing-arrow': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'prefer-destructuring': 'off',
        'no-prototype-builtins': 'off',
        'no-useless-constructor': 'off',
        'class-methods-use-this': 'off',
        'newline-per-chained-call': 'off',
        'no-template-curly-in-string': 'off',
        'prefer-promise-reject-errors': 'off',

        // ESLint: Warnings
        'no-console': 1,

        // ESLint: Errors
        'prefer-template': 'error',
        'func-names': ['error', 'never'],
        // 'indent': [2, 4, {
        //         SwitchCase: 1,
        //         MemberExpression: 1,
        //         VariableDeclarator: 1
        //     },
        // ],

        // Plugin: Prettier
        'prettier/prettier': ['off', { prettierOptions }],


        // Plugin: Import
        'import/imports-first': 0,
        'import/newline-after-import': 0,
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/no-unresolved': 2,
        'import/no-webpack-loader-syntax': 0,
        'import/prefer-default-export': 0,
        'import/no-unresolved': 0,
        'import/export': 0,
        'import/no-cycle': 0,
        'import/no-useless-path-segments': 0,


        // Plugin: jsx-a11y
        'jsx-a11y/label-has-for': 0,
        'jsx-a11y/heading-has-content': 0,
        'jsx-a11y/alt-text': 0,
        'jsx-a11y/no-access-key': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/aria-props': 2,
        'jsx-a11y/mouse-events-have-key-events': 2,
        'jsx-a11y/role-has-required-aria-props': 2,
        'jsx-a11y/role-supports-aria-props': 2,


        // Plugin: React
        'react/prop-types': 0,
        'react/sort-comp': 0,
        'react/forbid-prop-types': 0,
        'react/require-extension': 0,
        'react/self-closing-comp': 0,
        'react/jsx-no-target-blank': 0,
        'react/require-default-props': 0,
        'react/jsx-filename-extension': 0,
        'react/prefer-stateless-function': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-closing-tag-location': 0,
        'react/jsx-child-element-spacing': 'off',
        'react/jsx-closing-bracket-location': 'off',
        'react/jsx-closing-tag-location': 'off',
        'react/jsx-curly-spacing': 'off',
        'react/jsx-equals-spacing': 'off',
        'react/jsx-first-prop-new-line': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-max-props-per-line': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-multi-spaces': 'off',
        'react/jsx-space-before-closing': 'off',
        'react/jsx-tag-spacing': 'off',
        'react/jsx-wrap-multilines': 'off',
        'react/self-closing-comp': 'off',
        'react/jsx-uses-vars': 2,


        // Plugin: React-Hooks
        'react-hooks/rules-of-hooks': 'error',

        // Plugin: Flowtype
        'flowtype/boolean-style': 'off',
        'flowtype/delimiter-dangle': 'off',
        'flowtype/generic-spacing': 'off',
        'flowtype/object-type-delimiter': 'off',
        'flowtype/semi': 'off',
        'flowtype/space-after-type-colon': 'off',
        'flowtype/space-before-generic-bracket': 'off',
        'flowtype/space-before-type-colon': 'off',
        'flowtype/union-intersection-spacing': 'off'
    },

    settings: {
        'import/resolver': {
            webpack: {
                config: './internals/webpack/webpack.prod.babel.js',
            },
        },
    },
};