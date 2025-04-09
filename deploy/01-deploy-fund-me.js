module.exports = async function ({ getNamedAccounts, deployments }) {
  const { firstAccount } = await getNamedAccounts()
  const { deploy } = deployments

  await deploy('FundMe', {
    from: firstAccount,
    args: [180],
    log: true
  })

  console.log('firstAccount is:', firstAccount)
  console.log('this is deployFunctiion')
}
module.exports.tags = ['all', 'fundme']
