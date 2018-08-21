const slugIsValid = (slug) => {
  let regex = new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  return regex.exec(slug)
}

module.exports = {
  slugIsValid
}
