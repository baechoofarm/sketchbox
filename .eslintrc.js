module.exports = {
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "extends": ["airbnb", "airbnb/hooks", "plugin:@typescript-eslint/recommended"],
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".ts", ".tsx"]
            }
        }
    },
    "ignorePatterns": [
        "**/*.js",
        "**/hrp-widget/lib/*",
        "**/hrp-client-web/dist/*"
    ],
    "rules": {
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "import/extensions": ["error", "ignorePackages", {"ts": 'never', "tsx": 'never'}],
        "import/no-unresolved": "off",
        "import/export": "off",

        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-types": ["error", {
            "types": {
                "{}": false
            }
        }],
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/type-annotation-spacing": "error",

        "@typescript-eslint/no-use-before-define": ["warn"],
        "no-use-before-define": "off",

        "@typescript-eslint/no-useless-constructor": ["error"],
        "no-useless-constructor": "off",

        "@typescript-eslint/no-shadow": "error",
        "no-shadow": "off", // replaced by ts-eslint rule below

        "@typescript-eslint/member-delimiter-style": ["error", {
            "multiline": {
                "delimiter": 'semi',
                "requireLast": true
            },
            "singleline": {
                "delimiter": 'comma',
                "requireLast": false
            },
        }],

        "indent": ["error", 4, {"SwitchCase": 1}],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/prop-types": "off",

        "react/button-has-type": "off",
        "react/destructuring-assignment": ["warn"],
        "react/jsx-props-no-spreading": "off",
        "react/jsx-curly-brace-presence": "off",
        "react/jsx-filename-extension": [2, {"extensions": [".js", ".jsx", ".ts", ".tsx"]}],
        "react/jsx-tag-spacing": ["error", {"beforeSelfClosing": "never"}],
        "react/sort-comp": "off",
        "react/require-default-props": "off",
        "react/no-unused-prop-types": ["warn"],
        "react/jsx-key": "error",
        "react/jsx-one-expression-per-line": "off",
        "react-hooks/exhaustive-deps": ["warn"],

        "jsx-a11y/no-static-element-interactions": "warn",
        "jsx-a11y/click-events-have-key-events": "warn",

        "quotes": "off",
        "quote-props": ["error", "consistent"],
        "comma-dangle": "off",
        "linebreak-style": ["error", "windows"],
        "max-len": ["error", 180],
        "arrow-body-style": "off",
        "object-curly-spacing": ["error", "never"],
        "object-curly-newline": ["error", {"consistent": true}],
        "lines-between-class-members": ["error", "always", {"exceptAfterSingleLine": true}],
        "padded-blocks": "off",
        "arrow-parens": ["error", "as-needed"],
        "prefer-destructuring": ["warn"],
        "camelcase": "off",
        "no-underscore-dangle": "off",
        "no-inner-declarations": "off",
        "brace-style": "off",

        "class-methods-use-this": "off",
        "default-case": "off",
        "no-useless-escape": "warn",
        "no-console": ["error", {"allow": ["warn", "error"]}],
        "no-plusplus": "off",
        "no-param-reassign": ["error", {"props": false}],
        "no-return-await": "off",
        "max-classes-per-file": ["warn", 4],
        "prefer-template": "off",
    }
};
