const { Crypto } = require("@peculiar/webcrypto")
const Environment = require('jest-environment-jsdom')

module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup()
    this.global.crypto = new Crypto()

    if (typeof this.global.TextEncoder === 'undefined') {
      const { TextEncoder } = require('util')
      this.global.TextEncoder = TextEncoder
    }
  }
}
