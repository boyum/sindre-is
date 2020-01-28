module.exports = {
  plugins: [
    'stylelint-order',
  ],
  extends: 'stylelint-config-standard',
  rules: {
    'unit-whitelist': ['em', 'rem', '%', 'vh', 'vw', 's', 'deg'],
    'no-empty-source': null,
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': [
        'extends',
        'include',
        'mixin',
        'each',
      ],
    }],
    'no-descending-specificity': null,
    'order/order': [
      'custom-properties',
      'declarations',
    ],
    'order/properties-alphabetical-order': true,
  },
}
