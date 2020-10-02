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

  // describe('#getBchData', () => {
  //   it('should throw error if address is not a string', async () => {
  //     try {
  //       const addr = 1234
  //
  //       await uut.getBchData(addr)
  //
  //       assert.equal(true, false, 'unexpected result')
  //     } catch (err) {
  //       assert.include(err.message, 'Address must be a string')
  //     }
  //   })
  //
  //   it('should get BCH data on an address', async () => {
  //     // Mock external dependencies.
  //     sandbox
  //       .stub(uut.bchjs.Blockbook, 'balance')
  //       .resolves(mockData.mockBalance)
  //     sandbox.stub(uut.bchjs.Blockbook, 'utxo').resolves(mockData.mockUtxos)
  //
  //     const addr = 'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7'
  //
  //     const bchData = await uut.getBchData(addr)
  //
  //     // Assert that top-level properties exist.
  //     assert.property(bchData, 'balance')
  //     assert.property(bchData, 'utxos')
  //
  //     // Assert essential UTXOs properties exist.
  //     assert.isArray(bchData.utxos)
  //     assert.property(bchData.utxos[0], 'txid')
  //     assert.property(bchData.utxos[0], 'vout')
  //     assert.property(bchData.utxos[0], 'satoshis')
  //   })
  // })
})
