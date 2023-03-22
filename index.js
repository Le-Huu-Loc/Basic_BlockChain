const hash = require("crypto-js/sha256");

class Block {
    constructor(prevHash, data) {
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = new Date();
        this.hash = this.calculateHash();
        this.mineVar = 0;
    }

    calculateHash() {
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar).toString();
    }
    mine(difficulty) {
        while (!this.hash.startsWith('0'.repeat(difficulty))) {
            this.mineVar++;
            this.hash = this.calculateHash();
        }
    }
}

class BlockChain {
    constructor(difficulty) {
        const genesisBlock = new Block("00", {
            isGenesis: true,
        });

        this.difficulty = difficulty;
        this.chain = [genesisBlock];
    }

    getLastBlock() {
        {
            return this.chain[this.chain.length - 1];
        }
    }
    addBlock(data) {
        const lastBlock = this.getLastBlock();
        const newBlock = new Block(lastBlock.hash, data);

        console.log('start');
        newBlock.mine(this.difficulty);
        console.log('end', newBlock)

        this.chain.push(newBlock);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.prevHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

const demoChain = new BlockChain(5);

demoChain.addBlock({
    coin: 0,
});
demoChain.addBlock({
    coin: 1,
});

//Hash
// demoChain.chain[1].data = {
//     coin: 50,
// }
// demoChain.chain[1].hash = demoChain.chain[1].calculateHash();

// console.log(demoChain.chain);
// console.log(demoChain.isValid())