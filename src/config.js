require('dotenv').config();

const supportedNetworks = [
  {
    name: 'mainnet',
    url: `wss://eth-mainnet.g.alchemy.com/v2/${process.env.MAINNET_KEY}`,
  },
  {
    name: 'arbitrum',
    url: `wss://arb-mainnet.g.alchemy.com/v2/${process.env.ARBITRUM_KEY}`,
  },
  {
    name: 'optimism',
    url: `wss://opt-mainnet.g.alchemy.com/v2/${process.env.OPTIMISTIC_KEY}`
  },
];

const colors = {
  mainnet: '\x1b[32m',
  arbitrum: '\x1b[34m',
  optimism: '\x1b[35m',
  def: '\x1b[0m'
}

module.exports = {
  colors,
  supportedNetworks
}
