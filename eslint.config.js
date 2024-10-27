import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'

export default ts.config(
	// ignores
	{ ignores: ['build/', '.svelte-kit/', 'dist/', '*.config.js'] },
	// js
	js.configs.recommended,
	// ts
	...ts.configs.strictTypeChecked,
	...ts.configs.stylisticTypeChecked,
	{
		rules: {
			eqeqeq: ['error', 'smart'],
			'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }]
		}
	},
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	// svelte
	...svelte.configs['flat/recommended'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},
	// prettier
	prettier,
	...svelte.configs['flat/prettier']
)
