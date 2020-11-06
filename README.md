# bch-util

A node.js npm library with commonly used functions for working with Bitcoin Cash.
The library has 100% test coverage.

- **findBiggestUtxo()** - Find the biggest UTXO from an array of UTXOs.
- **eightDecimals()** - Round a number to 8 decimal places
- **twoDecimals()** - Round a number to 2 decimal places
- **chunk20()** - Convert a one-dimensional array into a two-dimensional array containing 20 elements each.

## Install
`npm install --save bch-util`

## Usage

### Instantiate
```javascript
  const BCHJS = require('@psf/bch-js')
  const bchjs = new BCHJS()

  const BchUtil = require('bch-util')
  const bchUtil = new BchUtil({bchjs})
```

### findBiggestUtxo()
```javascript
  const utxos = [
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

  const selectedUtxo = bchUtil.util.findBiggestUtxo(utxos)

  /*
    selectedUtxos = {
      height: 0,
      tx_hash:
        '7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b',
      tx_pos: 0,
      value: 800
    }
  */
```

### chunk20

```javascript
  const bigArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]

  const chunked = bchUtil.util.chunk20(bigArray)

  /*
    chunked = [
      [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
      [20,21,22,23,24,25,26]
    ]
  */
```

### round8

```javascript
  const num = 1.234567891111

  const result = bchUtil.util.eightDecimals(num)

  /*
    result = 1.23456789
  */
```

### round2
```javascript
  const num = 1.234567891111

  const result = bchUtil.util.eightDecimals(num)

  /*
    result = 1.23
  */
```

# Licence
[MIT](LICENSE.md)
