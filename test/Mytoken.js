const hre = require('hardhat')
const { expect } = require('chai')
describe('MyToken Test', async function () {
  const { ethers } = hre

  const initialSupply = 1000
  let MyTokenContract
  let account1, account2

  beforeEach(async function () {
    ;[account1, account2] = await ethers.getSigners() // 获取账户
    console.log(account1, account2)
    // const accounts = await ethers.getSigners()

    // console.log('==accounts=', accounts)

    const MyToken = await ethers.getContractFactory('MyToken') // 工厂模板
    MyTokenContract = await MyToken.connect(account2).deploy(initialSupply) // 部署合约

    MyTokenContract.waitForDeployment()

    const contractAddress = await MyTokenContract.getAddress()

    expect(contractAddress).to.length.greaterThan(0)

    console.log('==开始运行测试用例=')
  })
  it('验证合约名字，name,symble,decimal', async function () {
    const name = await MyTokenContract.name()
    const symbol = await MyTokenContract.symbol()
    const decimals = await MyTokenContract.decimals()

    expect(name).to.equal('MyToken')
    expect(symbol).to.equal('MTK')
    expect(decimals).to.equal(18)
  })

  it('测试转账', async function () {
    // const balanceOfAccount1 = await MyTokenContract.balanceOf(account1)
    // expect(balanceOfAccount1).to.equal(initialSupply)

    const res = await MyTokenContract.transfer(account1, initialSupply / 2)
    console.log(res)

    const balanceOfAccount2 = await MyTokenContract.balanceOf(account2)

    expect(balanceOfAccount2).to.equal(initialSupply / 2)
  })
})
