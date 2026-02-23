// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "curly": "error",
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["typeProperty", "objectLiteralProperty"],
          format: ["camelCase"],
          leadingUnderscore: "allow",
          filter: {
            regex: "^(CPT|BHR-G|BHR-GT)$",
            match: false,
          },
        },
      ],
    },
  },
  {
    files: ["src/reference-codes/**/*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
    },
  },
);
