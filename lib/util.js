/*
  An example of a typical utility library. Things to notice:
  - This library is exported as a Class.
  - External dependencies are embedded into the class 'this' object: this.bitbox
  - `_this` maintains top-level context for `this`.
*/

'use strict'

// npm libraries
const BCHJS = require('@psf/bch-js')

// Locally global variables.

class UtilLib {
  constructor (config) {
    // Default to new instance of bch-js
    this.bchjs = new BCHJS()
    // Overwrite default if an instance of bch-js is passed in.
    if (config && config.bchjs) this.bchjs = config.bchjs
  }

  // Returns the utxo with the biggest balance from an array of utxos.
  findBiggestUtxo (utxos) {
    let largestAmount = 0
    let largestIndex = 0

    if (!Array.isArray(utxos)) {
      throw new Error('utxos input to findBiggestUtxo() must be an array')
    }

    for (var i = 0; i < utxos.length; i++) {
      const thisUtxo = utxos[i]

      // Give Elecrumx utxos a satoshis property.
      if (thisUtxo.value) {
        if (!thisUtxo.satoshis) thisUtxo.satoshis = Number(thisUtxo.value)
      }

      if (!thisUtxo.satoshis) {
        throw new Error(
          'Utxos require a satoshis or value property for findBiggestUtxo()'
        )
      }

      if (thisUtxo.satoshis > largestAmount) {
        largestAmount = thisUtxo.satoshis
        largestIndex = i
      }
    }

    return utxos[largestIndex]
  }

  // round8 - round to 8 decimal places

  // round2 - round to 2 decimal places

  // chunk20 - chunk up an array into multiple arrays of 20 elements each.
  // Input: arrayToSlice - a one-dimensional array of elements.
  // Returns a two-dimensional array. An array of 20-element arrays.
  chunk20 (arrayToSlice) {
    try {
      // Validate inputs
      if (!Array.isArray(arrayToSlice)) {
        throw new Error('arrayToSlice must be an array')
      }

      let offset = 0
      const result = []

      // Loop over the array and slice off chunks of 20 elements.
      while (offset < arrayToSlice.length) {
        const chunk = arrayToSlice.slice(offset, offset + 20)
        result.push(chunk)
        offset = offset + 20
      }

      return result
    } catch (err) {
      console.error('Error in chunk20()')
      throw err
    }
  }
}

module.exports = UtilLib
