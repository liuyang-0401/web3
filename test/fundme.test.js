const { ethers, deployments, getNamedAccounts } = require('hardhat')
const { assert } = require('chai')

describe('test fundme contract', async function () {
  let fundMe, firstAccount
  beforeEach(async function () {
    firstAccount = (await getNamedAccounts()).firstAccount
    await deployments.fixture(['all'])

    const fundMeDeployment = await deployments.get('FundMe')
    fundMe = await ethers.getContractAt('FundMe', fundMeDeployment.address)
  })
  it('test if the owner is msg.sender', async function () {
    await fundMe.waitForDeployment()
    assert.equal(await fundMe.owner(), firstAccount)
  })

  it('test dataFeed', async function () {
    await fundMe.waitForDeployment()
    assert.equal(await fundMe.dataFeed(), '0x694AA1769357215DE4FAC081bf1f309aDC325306')
  })
})
