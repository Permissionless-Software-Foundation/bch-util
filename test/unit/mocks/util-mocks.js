/*
  A mocking library for util.js unit tests.
  A mocking library contains data to use in place of the data that would come
  from an external dependency.
*/

'use strict'

const electrumxUtxos = {
  success: true,
  utxos: [
    {
      height: 0,
      tx_hash:
        '192f5037bb3822afd92d6b6ab51842a5dcfbe6bff783290057342da1f27ed414',
      tx_pos: 0,
      value: 600
    },
    {
      height: 0,
      tx_hash:
        'f913646f7c180f8de020cb1387951272e8a3f764a0f88e68f7fc1145a0bf02e9',
      tx_pos: 0,
      value: 700
    },
    {
      height: 0,
      tx_hash:
        '7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b',
      tx_pos: 0,
      value: 800
    }
  ]
}

const blockbookUtxos = [
  {
    txid: '7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b',
    vout: 0,
    value: '800',
    confirmations: 0,
    satoshis: 800
  },
  {
    txid: 'f913646f7c180f8de020cb1387951272e8a3f764a0f88e68f7fc1145a0bf02e9',
    vout: 0,
    value: '700',
    confirmations: 0,
    satoshis: 700
  },
  {
    txid: '192f5037bb3822afd92d6b6ab51842a5dcfbe6bff783290057342da1f27ed414',
    vout: 0,
    value: '600',
    confirmations: 0,
    satoshis: 600
  }
]

const thirtyFiveElements = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34
]

module.exports = {
  electrumxUtxos,
  blockbookUtxos,
  thirtyFiveElements
}
