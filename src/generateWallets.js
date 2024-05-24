const { MnemonicKey } = require('@initia/initia.js');
const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

async function generateWallets(numWallets) {
    const resultsDir = path.join(__dirname, '..', 'results');

    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir);
    }

    let addresses = '';
    let privateKeys = '';
    let seedPhrases = '';
    let publicKeys = '';

    const workbook = xlsx.utils.book_new();
    const worksheetData = [['Address', 'Private Key', 'Seed Phrase', 'Public Key']];

    for (let i = 0; i < numWallets; i++) {
        const key = new MnemonicKey({
            account: 0, // (optional) BIP44 account number. default = 0
            index: i,  // (optional) BIP44 index number. default = 0
            coinType: 118, // (optional) BIP44 coinType. default = 118
        });

        addresses += `${key.accAddress}\n`;
        privateKeys += `${key.privateKey.toString('hex')}\n`;
        seedPhrases += `${key.mnemonic}\n`;
        publicKeys += `${key.publicKey.key}\n`;

        worksheetData.push([key.accAddress, key.privateKey.toString('hex'), key.mnemonic, key.publicKey.key]);
    }

    fs.writeFileSync(path.join(resultsDir, 'addresses.txt'), addresses);
    fs.writeFileSync(path.join(resultsDir, 'private_keys.txt'), privateKeys);
    fs.writeFileSync(path.join(resultsDir, 'seed_phrases.txt'), seedPhrases);
    fs.writeFileSync(path.join(resultsDir, 'public_keys.txt'), publicKeys);

    const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Wallets');
    xlsx.writeFile(workbook, path.join(resultsDir, 'result.xlsx'));

    console.log('Wallet data successfully saved to the results folder.');
}

module.exports = { generateWallets };
