//https://eth-ropsten.alchemyapi.io/v2/kKrm1UosD49Uh9vWDwpuqGgPejGh2FzC

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/kKrm1UosD49Uh9vWDwpuqGgPejGh2FzC',
      accounts: ['99ec52f8d3255f5636a215f60b550590d3c4e4472abf9b66e5411b17577010bd']
    }
}
}