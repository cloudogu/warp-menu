module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:storybook/recommended",
        "plugin:storybook/recommended"
    ],
    "overrides": [
        {
            "files": ["src/components/*.tsx", "src/components/*.tsx"],
            "excludedFiles": "*.spec.tsx",
            "rules": {
                "quotes": ["error", "double"]
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "autofix",
        "react-hooks",
        "import"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/react-in-jsx-scope": "off",
        "react/no-children-prop": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-function": "off",
        "arrow-body-style": ["error", "as-needed"],
        "react/self-closing-comp": [
            "error", {
                "component": true,
                "html": true
            }
        ],
        "autofix/no-unused-vars": [
            "error",
            {
                "argsIgnorePattern": "^_",
                "ignoreRestSiblings": true,
                "destructuredArrayIgnorePattern": "^_"
            }
        ],
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                "prefer": "type-imports",
            }
        ],
        "import/order": [
            "error",
            {
                "groups": [
                    "builtin",
                    "external",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type"
                ],
                "pathGroups": [
                    {
                        "pattern": "@/**/**",
                        "group": "parent",
                        "position": "before"
                    }
                ],
                "alphabetize": {"order": "asc"}
            }
        ],
        "import/no-unresolved": "off",
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};
