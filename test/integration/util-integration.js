/*
  Integration tests for the util.js utility library.
*/

// npm libraries
const chai = require('chai')

// Locally global variables.
const assert = chai.assert

const BCHJS = require('@psf/bch-js')
const bchjs = new BCHJS()

// Unit under test
const UtilLib = require('../../lib/util')
const uut = new UtilLib({ bchjs })

describe('#util.js', () => {
  describe('#findBiggestUtxo', () => {
    it('should sort UTXOs from Electrumx', async () => {
      const addr = 'bitcoincash:qq54fgjn3hz0357n8a6guy4demw9xfkjk5jcj0xr0z'

      const electrumxUtxos = await uut.bchjs.Electrumx.utxo(addr)
      // console.log(`Electrumx utxos: ${JSON.stringify(electrumxUtxos, null, 2)}`)

      const result = uut.findBiggestUtxo(electrumxUtxos.utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'satoshis')
      assert.equal(result.satoshis, 800)
    })
  })

  // describe('#getBchData', () => {
  //   it('should get BCH data on an address', async () => {
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
