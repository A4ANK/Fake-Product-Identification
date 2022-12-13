# Fake Product Identification using Blockchain

# Packages Required :
- Truffle v5.6.7 (core: 5.6.7)
- Ganache v7.5.0
- Solidity v0.5.16 (solc-js)
- Node v15.8.0
- Web3.js v1.7.4
- npm 7.5.1

# Other Requirements:
    1. any chromium based browser i.e. Chrome 
    2. Metamask browser extension
    
# setup process 

    1. clone the project
    2. go to the project folder, open terminal there and run following command:
        $ npm install 
    3. to compile the solidity smart contract file run following command:
        $ truffle compile
    4. Open Ganache, (to setup local blockchain)
        crerate new workspace
        add truffle-config.js  in truffle project 
        change port to 7545 in server settings (same as port in truffle-config.js)
    5. In chrome, open metamask 
        add new test network using  
            NETWORK ID (i.e. 5777 ,from Ganache Server settings) 
            RPC SERVER (i.e HTTP://127.0.0.1:8545 ,from Ganache Server settings)
            CHIAIN CODE (i.e. 1337)
        import account using privte key of any account from local blockchain
    6. In terminal, run following commands:
        $ truffle migrate
        $ npm run dev , this will open index.html file in browser
    7. Login to metamask ,and connect the added account to local blockchain (i.e.localhost:3000)
    8. Interact with website