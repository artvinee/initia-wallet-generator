const readline = require('readline');
const figlet = require("figlet");
const { generateWallets } = require('./src/generateWallets');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

(async () => {
    const banner = await figlet.text("Initia Gen");
    console.log(banner, "\nGithub: https://github.com/Tnodes (modded by artvinee)\n");

    const numWallets = parseInt(await askQuestion('How many wallets do you want to generate?'));
    if (isNaN(numWallets) || numWallets <= 0) {
        console.log('Please enter a valid number of wallets.');
    } else {
        await generateWallets(numWallets);
    }

    rl.close();
})();
