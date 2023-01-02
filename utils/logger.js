/* eslint-disable no-console */
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('🟢', ...params)
  }
}

const error = (...params) => {
  if (console.env.NODE_ENV !== 'test') {
    console.error('🔴', ...params)
  }
}

module.exports = {
  info,
  error,
}
