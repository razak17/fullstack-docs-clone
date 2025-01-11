import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tailwind from 'eslint-plugin-tailwindcss';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const config = [
	...compat.extends('next/core-web-vitals'),
	js.configs.recommended,
	...ts.configs.recommended,
	...tailwind.configs['flat/recommended'],
	// Add more flat configs here
	{ ignores: ['.next/*'] },
];

export default config;
