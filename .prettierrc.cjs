/** @type {import("prettier").Config} */
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 80, // or whatever width you prefer
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid',
  tabWidth: 2,
  overrides: [
    {
      files: '*.jsx',
      options: {
        parser: 'babel',
        proseWrap: 'preserve',
      },
    },
    {
      files: '*.tsx',
      options: {
        parser: 'typescript',
        proseWrap: 'preserve',
      },
    },
  ],
};
