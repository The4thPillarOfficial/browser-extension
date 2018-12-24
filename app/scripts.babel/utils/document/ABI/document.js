const address = '0x18Bbc3B586508ce74a430aFb1B1B7F62815594FA';
const ABI = [
    {
        'constant': false,
        'inputs': [
            {
                'name': 'receiver',
                'type': 'address'
            },
            {
                'name': 'index',
                'type': 'uint256'
            }
        ],
        'name': 'deleteDocument',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'receiver',
                'type': 'address'
            },
            {
                'name': 'index',
                'type': 'uint256'
            },
            {
                'name': 'nonce',
                'type': 'uint256'
            },
            {
                'name': 'v',
                'type': 'uint8'
            },
            {
                'name': 'r',
                'type': 'bytes32'
            },
            {
                'name': 's',
                'type': 'bytes32'
            }
        ],
        'name': 'deletePreSignedDocument',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'receiver',
                'type': 'address'
            },
            {
                'name': 'link',
                'type': 'string'
            },
            {
                'name': 'name',
                'type': 'string'
            },
            {
                'name': 'description',
                'type': 'string'
            },
            {
                'name': 'docType',
                'type': 'uint256'
            }
        ],
        'name': 'setDocument',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'receiver',
                'type': 'address'
            },
            {
                'name': 'index',
                'type': 'uint256'
            }
        ],
        'name': 'setOpenedAt',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'sender',
                'type': 'address'
            },
            {
                'name': 'receiver',
                'type': 'address'
            },
            {
                'name': 'link',
                'type': 'string'
            },
            {
                'name': 'name',
                'type': 'string'
            },
            {
                'name': 'description',
                'type': 'string'
            },
            {
                'name': 'docType',
                'type': 'uint256'
            },
            {
                'name': 'nonce',
                'type': 'uint256'
            },
            {
                'name': 'v',
                'type': 'uint8'
            },
            {
                'name': 'r',
                'type': 'bytes32'
            },
            {
                'name': 's',
                'type': 'bytes32'
            }
        ],
        'name': 'setPreSignedDocument',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'receiver',
                'type': 'address'
            },
            {
                'name': 'index',
                'type': 'uint256'
            },
            {
                'name': 'nonce',
                'type': 'uint256'
            },
            {
                'name': 'v',
                'type': 'uint8'
            },
            {
                'name': 'r',
                'type': 'bytes32'
            },
            {
                'name': 's',
                'type': 'bytes32'
            }
        ],
        'name': 'setPreSignedOpenedAt',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'sender',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'receiver',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'link',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'name',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'description',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'docType',
                'type': 'uint256'
            }
        ],
        'name': 'SetPreSignedDocument',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'sender',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'receiver',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'link',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'name',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'description',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'docType',
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
                'name': 'receiver',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'index',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'openedAt',
                'type': 'uint256'
            }
        ],
        'name': 'SetOpenedAt',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'sender',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'receiver',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'index',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'name',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'link',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'description',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'docType',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'openedAt',
                'type': 'uint256'
            }
        ],
        'name': 'DeleteDocument',
        'type': 'event'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'receiver',
                'type': 'address'
            },
            {
                'name': 'index',
                'type': 'uint256'
            },
            {
                'name': 'nonce',
                'type': 'uint256'
            }
        ],
        'name': 'calculateHash',
        'outputs': [
            {
                'name': '',
                'type': 'bytes32'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'sender',
                'type': 'address'
            },
            {
                'name': 'receiver',
                'type': 'address'
            },
            {
                'name': 'link',
                'type': 'string'
            },
            {
                'name': 'name',
                'type': 'string'
            },
            {
                'name': 'description',
                'type': 'string'
            },
            {
                'name': 'docType',
                'type': 'uint256'
            },
            {
                'name': 'nonce',
                'type': 'uint256'
            }
        ],
        'name': 'calculatePreSignedDocumentHash',
        'outputs': [
            {
                'name': '',
                'type': 'bytes32'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'receiver',
                'type': 'address'
            },
            {
                'name': 'index',
                'type': 'uint256'
            }
        ],
        'name': 'getDocument',
        'outputs': [
            {
                'name': '',
                'type': 'address'
            },
            {
                'name': '',
                'type': 'string'
            },
            {
                'name': '',
                'type': 'string'
            },
            {
                'name': '',
                'type': 'string'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'receiver',
                'type': 'address'
            }
        ],
        'name': 'getLastDocumentIndex',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'signer',
                'type': 'address'
            },
            {
                'name': 'hash',
                'type': 'bytes32'
            },
            {
                'name': 'v',
                'type': 'uint8'
            },
            {
                'name': 'r',
                'type': 'bytes32'
            },
            {
                'name': 's',
                'type': 'bytes32'
            }
        ],
        'name': 'isValidSignature',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'pure',
        'type': 'function'
    }
];

export {address, ABI}
