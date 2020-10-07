/*
  Unit tests for the util.js utility library.
*/

// npm libraries
const chai = require('chai')
const sinon = require('sinon')
const BCHJS = require('@psf/bch-js')

// Locally global variables.
const assert = chai.assert

// Mocking data libraries.
const mockData = require('./mocks/util-mocks')

// Unit under test
const UtilLib = require('../../lib/util')
const uut = new UtilLib()

describe('#util.js', () => {
  let sandbox

  // Restore the sandbox before each test.
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe('#constructor', () => {
    it('should accept an injected instance of bch-js', () => {
      const bchjs = new BCHJS()
      const config = { bchjs }

      const testUut = new UtilLib(config)
      assert.property(testUut, 'bchjs')
    })
  })

  describe('#findBiggestUtxo', () => {
    it('should throw error for non-array input', async () => {
      try {
        await uut.findBiggestUtxo({})

        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.include(
          err.message,
          'utxos input to findBiggestUtxo() must be an array'
        )
      }
    })

    it('should throw an error if input does not have a value or satoshis property', async () => {
      try {
        const badUtxos = [
          {
            height: 0,
            tx_hash:
              '192f5037bb3822afd92d6b6ab51842a5dcfbe6bff783290057342da1f27ed414',
            tx_pos: 0
          }
        ]

        await uut.findBiggestUtxo(badUtxos)
      } catch (err) {
        assert.include(
          err.message,
          'Utxos require a satoshis or value property for findBiggestUtxo()'
        )
      }
    })

    it('should sort UTXOs from Electrumx', async () => {
      const result = uut.findBiggestUtxo(mockData.electrumxUtxos.utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'satoshis')
      assert.equal(result.satoshis, 800)
    })

    it('should sort UTXOs from Blockbook', async () => {
      const result = uut.findBiggestUtxo(mockData.blockbookUtxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'satoshis')
      assert.equal(result.satoshis, 800)
    })
  })

  describe('#chunk20', () => {
    it('should split 35 elements into 2 arrays', () => {
      const result = uut.chunk20(mockData.thirtyFiveElements)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isArray(result[0])
      assert.equal(result.length, 2)
      assert.equal(result[0].length, 20)
    })

    it('should return accurately with an array of less than 20 elements', () => {
      const elems = [0, 1, 2, 3, 4, 5]

      const result = uut.chunk20(elems)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isArray(result[0])
      assert.equal(result.length, 1)
      assert.equal(result[0].length, 6)
    })

    it('should throw an error for non-array input', () => {
      try {
        uut.chunk20('string')

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(err)
        assert.include(err.message, 'input must be an array')
      }
    })
  })

  describe('#round8', () => {
    it('should round a number to 8 decimals', () => {
      const num = 1.234567891111

      const result = uut.eightDecimals(num)
      // console.log(result)

      assert.equal(result, 1.23456789)
    })

    it('should throw an error for non-number input', () => {
      try {
        const num = 'string'

        uut.eightDecimals(num)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(err)
        assert.include(err.message, 'input must be a number')
      }
    })

    it('should not effect a number with less than 8 decimals', () => {
      const num = 1.23

      const result = uut.eightDecimals(num)
      // console.log(result)

      assert.equal(result, 1.23)
    })
  })

  describe('#round2', () => {
    it('should round a number to 2 decimals', () => {
      const num = 1.234567891111

      const result = uut.twoDecimals(num)
      // console.log(result)

      assert.equal(result, 1.23)
    })

    it('should throw an error for non-number input', () => {
      try {
        const num = 'string'

        uut.twoDecimals(num)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(err)
        assert.include(err.message, 'input must be a number')
      }
    })

    it('should not effect a number with less than 8 decimals', () => {
      const num = 1.2

      const result = uut.twoDecimals(num)
      // console.log(result)

      assert.equal(result, 1.2)
    })
  })
})
