import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import tailwindPaletteGuard from "eslint-plugin-tailwind-palette-guard";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{tsx,ts,jsx,js}"],
    ignores: ["dist/**", "node_modules/**", "prettier.config.js"],
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ["src/**/*.{tsx,ts}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactHooksPlugin.configs.flat.recommended,
      reactRefreshPlugin.configs.recommended,
      // @ts-expect-error type mismatch
      reactPlugin.configs.flat.recommended,
      // @ts-expect-error type mismatch
      reactPlugin.configs.flat["jsx-runtime"],
      // @ts-expect-error type mismatch
      tailwindPaletteGuard.configs.strict,
    ],
    rules: {
      "react/prop-types": "off",
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never", propElementValues: "always" },
      ],
      "tailwind-palette-guard/no-palette-colors": [
        "warn",
        {
          checkAllStrings: true,
          allowedFiles: ["**/*Demo*/**", "**/*Demo*"],
        },
      ],
    },
  },
  {
    files: ["src/**/*.{tsx,ts}"],
    plugins: { "better-tailwindcss": betterTailwindcss },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/index.css",
      },
    },
    rules: {
      "better-tailwindcss/no-unknown-classes": [
        "warn",
        { detectComponentClasses: true },
      ],
      "better-tailwindcss/no-conflicting-classes": "warn",
      "better-tailwindcss/enforce-shorthand-classes": "warn",
      "better-tailwindcss/no-duplicate-classes": "warn",
      "better-tailwindcss/no-deprecated-classes": "warn",
      "better-tailwindcss/no-unnecessary-whitespace": "warn",
    },
  },
]);
