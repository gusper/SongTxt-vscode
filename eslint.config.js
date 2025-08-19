import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.ts'],
        rules: {
            '@typescript-eslint/naming-convention': 'warn',
            'curly': 'warn',
            'eqeqeq': 'warn',
            'no-throw-literal': 'warn',
            'semi': 'off',
        },
    },
    {
        ignores: ['out/**', 'dist/**', '**/*.d.ts'],
    },
];