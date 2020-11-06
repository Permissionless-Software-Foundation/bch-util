/*
  An npm JavaScript library for front end web apps. Implements a minimal
  Bitcoin Cash wallet.
*/

/* eslint-disable no-async-promise-executor */

'use strict'

const Util = require('./lib/util')

let _this // local global for 'this'.

class BchUtil {
  constructor (config) {
    _this = this

    // Ensure an instance of bch-js is passed in.
    if (!config || !config.bchjs) {
      throw new Error(
        'bch-js instance must be passed in the config object when instantiating.'
      )
    }
    this.bchjs = config.bchjs

    _this.util = new Util(config)
  }
}

module.exports = BchUtil
