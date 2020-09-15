const address = '0x82cebDEabB79FdFaB70649834ddD85f42b6B9464';
const ABI = [
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'sender',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'bytes',
        'name': 'data',
        'type': 'bytes'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'sentAt',
        'type': 'uint256'
      }
    ],
    'name': 'SetDocument',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'openedAt',
        'type': 'uint256'
      }
    ],
    'name': 'SetOpenedAt',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'nonce',
        'type': 'uint256'
      }
    ],
    'name': 'calculateHash',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'sender',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      },
      {
        'internalType': 'bytes',
        'name': 'data',
        'type': 'bytes'
      },
      {
        'internalType': 'uint256',
        'name': 'nonce',
        'type': 'uint256'
      }
    ],
    'name': 'calculatePreSignedDocumentHash',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'getDocument',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      },
      {
        'internalType': 'bytes',
        'name': '',
        'type': 'bytes'
      },
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      }
    ],
    'name': 'getDocumentsCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'signer',
        'type': 'address'
      },
      {
        'internalType': 'bytes32',
        'name': 'hash',
        'type': 'bytes32'
      },
      {
        'internalType': 'uint8',
        'name': 'v',
        'type': 'uint8'
      },
      {
        'internalType': 'bytes32',
        'name': 'r',
        'type': 'bytes32'
      },
      {
        'internalType': 'bytes32',
        'name': 's',
        'type': 'bytes32'
      }
    ],
    'name': 'isValidSignature',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'pure',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      },
      {
        'internalType': 'bytes',
        'name': 'data',
        'type': 'bytes'
      }
    ],
    'name': 'setDocument',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'setOpenedAt',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'sender',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      },
      {
        'internalType': 'bytes',
        'name': 'data',
        'type': 'bytes'
      },
      {
        'internalType': 'uint256',
        'name': 'nonce',
        'type': 'uint256'
      },
      {
        'internalType': 'uint8',
        'name': 'v',
        'type': 'uint8'
      },
      {
        'internalType': 'bytes32',
        'name': 'r',
        'type': 'bytes32'
      },
      {
        'internalType': 'bytes32',
        'name': 's',
        'type': 'bytes32'
      }
    ],
    'name': 'setPreSignedDocument',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'receiver',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'nonce',
        'type': 'uint256'
      },
      {
        'internalType': 'uint8',
        'name': 'v',
        'type': 'uint8'
      },
      {
        'internalType': 'bytes32',
        'name': 'r',
        'type': 'bytes32'
      },
      {
        'internalType': 'bytes32',
        'name': 's',
        'type': 'bytes32'
      }
    ],
    'name': 'setPreSignedOpenedAt',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];

export {address, ABI}
