module.exports = {
  plugins: [
    require('postcss-import')(),
    require('tailwindcss')('./resources/tailwind/tailwind.js'),
    require('autoprefixer')
  ]
}
