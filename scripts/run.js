const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    // const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // const waveContract = await waveContractFactory.deploy();
    // await waveContract.deployed();

    // console.log("Contract deployed to:", waveContract.address);
    // console.log("Contract deployed by:", owner.address);

    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();

    // let waveTxn = await waveContract.wave("My first message");
    // await waveTxn.wait();

    // waveCount = await waveContract.getTotalWaves();

    // waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    // await waveTxn.wait();

    // waveCount = await waveContract.getTotalWaves();

    // await waveContract.addtionalInfo();

    // // array of waves

    // const [_, randommPerson] = await hre.ethers.getSigners();
    // waveTxn = await waveContract.connect(randommPerson).wave("And Another message!");
    // await waveTxn.wait();

    // let allWaves = await waveContract.getAllWaves();
    // console.log(allWaves);

    // prize money and stuff
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("contract address: ", waveContract.address);

    // get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address,
    );
    console.log("Contract Balance:? ", hre.ethers.utils.formatEther(contractBalance));

    // wave 1
    const waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait();
  
    // wave 2
    const waveTxn2 = await waveContract.wave("This is wave #2");
    await waveTxn2.wait();

    // again get contract balance
    contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
      );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();