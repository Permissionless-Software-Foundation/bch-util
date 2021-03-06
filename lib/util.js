/*
  Contains utility functions that are commonly used when working with Bicoin.
*/

'use strict'

// Locally global variables.

class UtilLib {
  constructor (config) {
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
  // Takes a number and returns it, rounded to the nearest 8 decimal place.
  round8 (num) {
    const thisNum = Number(num)

    if (isNaN(thisNum)) throw new Error('input must be a number')

    let tempNum = thisNum * 100000000
    tempNum = Math.floor(tempNum)
    tempNum = tempNum / 100000000

    return tempNum
  }

  // round2 - round to 2 decimal places
  // Takes a number and returns it, rounded to the nearest 2 decimal place.
  round2 (num) {
    const thisNum = Number(num)

    if (isNaN(thisNum)) throw new Error('input must be a number')

    let tempNum = thisNum * 100
    tempNum = Math.floor(tempNum)
    tempNum = tempNum / 100

    return tempNum
  }

  // chunk20 - chunk up an array into multiple arrays of 20 elements each.
  // Input: arrayToSlice - a one-dimensional array of elements.
  // Returns a two-dimensional array. An array of 20-element arrays.
  chunk20 (arrayToSlice) {
    try {
      // Validate inputs
      if (!Array.isArray(arrayToSlice)) {
        throw new Error('input must be an array')
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
