import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["projects/**/*", "**/*.spec.ts", "**/environments/**/*"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@angular-eslint/recommended",
    "plugin:@angular-eslint/template/process-inline-templates",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:unicorn/recommended",
).map(config => ({
    ...config,
    files: ["**/*.ts"],
})), {
    files: ["**/*.ts"],

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["tsconfig.json"],
            createDefaultProgram: true,
        },
    },

    rules: {
        "@angular-eslint/directive-selector": ["error", {
            type: "attribute",
            style: "camelCase",
        }],

        "@angular-eslint/component-selector": ["error", {
            type: "element",
            style: "kebab-case",
        }],

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            ignoreRestSiblings: true,
        }],

        "@typescript-eslint/unbound-method": ["error", {
            ignoreStatic: true,
        }],

        "@angular-eslint/use-lifecycle-interface": "error",
        "unicorn/no-null": "warn",
        "@typescript-eslint/no-explicit-any": "error",
        "unicorn/empty-brace-spaces": "warn",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-inferrable-types": "warn",

        "@typescript-eslint/typedef": ["error", {
            variableDeclaration: true,
        }],

        "unicorn/prevent-abbreviations": "warn",

        "no-console": ["error", {
            allow: ["info", "warn", "error"],
        }],
    },
}, ...compat.extends(
    "plugin:@angular-eslint/template/recommended",
    "plugin:@angular-eslint/template/accessibility",
).map(config => ({
    ...config,
    files: ["**/*.html"],
})), {
    files: ["**/*.html"],
    rules: {},
}];