module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        node: true, 
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        // Make sure the jest testing functions are visible and recognised
        "plugin:jest/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    // To omit the missing props validation errors
    "react/prop-types": "off"
    }
}
