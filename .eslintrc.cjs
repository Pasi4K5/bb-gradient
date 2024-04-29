module.exports = {
	root: true,
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:svelte/recommended",
		"plugin:svelte/prettier",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"],
		project: "./tsconfig.json",
	},
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
	plugins: ["@typescript-eslint"],
	rules: {
		"svelte/no-at-html-tags": "off",
		"@typescript-eslint/consistent-type-definitions": [
			"error",
			"type",
		],
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{
				"allowExpressions": true,
			},
		],
		"@typescript-eslint/naming-convention": [
			"error",
			{
				'selector': 'default',
				'format': ['camelCase'],
				'leadingUnderscore': 'forbid',
				'trailingUnderscore': 'forbid',
			},
			{
				'selector': 'typeLike',
				'format': ['PascalCase'],
				'leadingUnderscore': 'forbid',
				'trailingUnderscore': 'forbid',
			},
			{
				'selector': 'enumMember',
				'format': ['UPPER_CASE'],
				'leadingUnderscore': 'forbid',
				'trailingUnderscore': 'forbid',
			},
			{
				'selector': 'classProperty',
				'modifiers': ['private'],
				'format': ['camelCase'],
				'leadingUnderscore': 'require',
				'trailingUnderscore': 'forbid',
			},
			{
				'selector': 'function',
				'modifiers': ['exported'],
				'format': ['camelCase', 'UPPER_CASE'],
			},
			{
				'selector': 'import',
				'format': ['camelCase', 'PascalCase'],
			},
			{
				'selector': 'parameterProperty',
				'modifiers': ['private'],
				'format': ['camelCase'],
				'leadingUnderscore': 'require',
				'trailingUnderscore': 'forbid',
			},
			{
				'selector': 'parameter',
				'modifiers': ['unused'],
				'format': ['camelCase'],
				'leadingUnderscore': 'require',
				'trailingUnderscore': 'forbid',
			},
			{
				'selector': 'objectLiteralProperty',
				'format': null,
			},
			{
				'selector': 'typeProperty',
				'format': ['camelCase', 'snake_case'],
			},
			{
				'selector': 'variable',
				'modifiers': ['const'],
				'format': ['camelCase', 'UPPER_CASE'],
			}
		],
		"@typescript-eslint/no-confusing-void-expression": [
			"error",
			{
				"ignoreArrowShorthand": true,
			},
		],
		"@typescript-eslint/no-empty-function": [
			"error",
			{
				"allow": [
					"constructors",
				],
			},
		],
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/no-throw-literal": "off",
		"@typescript-eslint/no-unsafe-argument": "error",
		"@typescript-eslint/no-unsafe-assignment": "error",
		"@typescript-eslint/no-unsafe-call": "error",
		"@typescript-eslint/no-unsafe-member-access": "error",
		"@typescript-eslint/no-unsafe-return": "error",
		"curly": [
			"error",
			"all",
		],
		"no-console": "warn",
	},
};
