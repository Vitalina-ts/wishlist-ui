import vue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';

export default [
    ...vue.configs['flat/essential'],

    {
        files: ['**/*.{js,ts}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        }
    },

    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tsParser,
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        }
    },

    {
        rules: {
            'vue/multi-word-component-names': 'off'
        }
    },

    {
        ignores: ['dist/**', 'node_modules/**']
    }
];