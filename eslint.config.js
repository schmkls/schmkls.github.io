import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{tsx,ts,jsx,js}"],
    ignores: ["dist/**", "node_modules/**"],
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
    },
  },
]);
