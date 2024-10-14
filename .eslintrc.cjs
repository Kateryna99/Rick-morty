module.exports = {
    root: true, // Вказуємо, що це коренева конфігурація
    overrides: [
        {
            files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Які файли перевіряти
            parser: "@typescript-eslint/parser", // Використовуємо парсер TypeScript
            parserOptions: {
                ecmaVersion: 2020, // Версія ECMAScript
                sourceType: "module", // Використання модулів
                ecmaFeatures: {
                    jsx: true, // Дозволити JSX
                },
            },
            globals: {
                browser: "readonly", // Глобальні змінні
            },
            rules: {
                "no-console": "error", // Попередження при використанні console
                "no-unused-vars": "off", // Вимкнення правила для невикористанних змінних
                "eqeqeq": "error", // Помилка при використанні не строгого рівності
                'no-unused-expressions': 'off',
                "curly": "error", // Помилка при відсутності фігурних дужок
                "indent": ["error", 2], // Два пробіли для відступів
                "max-len": ["error", { code: 100 , ignoreUrls: true, ignorePattern: '^.*(className=".*"|className=\'.*\').*$'}], // Максимальна довжина рядка
                "object-curly-spacing": ["error", "always"], // Пробіли в об'єктах
                "react/react-in-jsx-scope": "off", // Вимкнення правила для React
                "react/prop-types": "off", // Вимкнення перевірки PropTypes
                "react/jsx-uses-react": "warn", // Попередження для використання React
                "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".tsx"] }], // Розширення файлів для JSX
                "@typescript-eslint/no-explicit-any": "warn", // Попередження для явного використання any
                "@typescript-eslint/explicit-function-return-type": "off", // Вимкнення правила для повертаючих типів функцій
                "@typescript-eslint/no-inferrable-types": "warn", // Попередження для невизначених типів
                "no-undef": "off", // Вимкнення правила для невизначених змінних
                "no-trailing-spaces": "error",
                'padding-line-between-statements': [
                    2,
                    { blankLine: 'always', prev: '*', next: 'return' },
                    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                    { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
                    { blankLine: 'always', prev: 'directive', next: '*' },
                    { blankLine: 'always', prev: 'block-like', next: '*' },
                ],
                /*'@typescript-eslint/no-unused-vars': [
                    'error',
                    { argsIgnorePattern: '^_+$', varsIgnorePattern: '^_+$' },
                ],*/
            },
        },
    ],
    // Додайте конфігурації плагінів без "extends"
    // Використовуйте рекомендації плагінів напряму
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:@next/eslint-plugin-next/recommended",
        "eslint:recommended",
    ],
    settings: {
        react: {
            version: "detect", // Автоматичне визначення версії React
        },
    },
};
