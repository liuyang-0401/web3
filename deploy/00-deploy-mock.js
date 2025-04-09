const { DECIMAL, INITIAL_ANSWER } = require('../help-hardhat-config')
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { firstAccount } = await getNamedAccounts()
  const { deploy } = deployments

  await deploy('MockV3Aggregator', {
    from: firstAccount,
    args: [DECIMAL, INITIAL_ANSWER],
    log: true
  })
}
module.exports.tags = ['all', 'mock']
