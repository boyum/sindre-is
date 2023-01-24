module.exports = {
  plugins: ["stylelint-order", "stylelint-prettier"],
  extends: "stylelint-config-standard",
  rules: {
    "unit-allowed-list": ["em", "rem", "%", "vh", "vw", "s", "deg"],
    "no-empty-source": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["extends", "include", "mixin", "each"],
      },
    ],
    "value-list-comma-newline-after": null,
    "declaration-colon-newline-after": null,
    "no-descending-specificity": null,
    "order/order": ["custom-properties", "declarations"],
    "order/properties-alphabetical-order": true,
  },
};
