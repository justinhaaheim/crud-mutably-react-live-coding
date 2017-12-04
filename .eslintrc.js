module.exports = {
  "extends": "airbnb",
  "rules": {
    "max-len": [1, 100],
    "semi": [1, "never"],
    "prefer-arrow-callback": 1,
    "quotes": 1,
    "prefer-destructuring": 1,
    "func-names": 0,
    "react/jsx-filename-extension": 0,
    "class-methods-use-this": 0,
    "comma-dangle": ["error", {
      "functions": "never",
      "objects": "always-multiline",
      "arrays": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline"
    }],
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "root": true
}
