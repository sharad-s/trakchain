# Trakchain v0.0.1
Trakchain is Invite-only beat marketplace for independent artists and producers.
Built on the blockchain.

## Installation

1. Install Truffle, IPFS and Ganache-CLI globally.
    ```javascript
    npm install -g truffle ipfs ganache-cli
    ```

2. Install Dependencies.
    ```javascript
    npm install
    ```

3. Compile and migrate the smart contracts.
    ```javascript
    truffle compile
    truffle migrate
    ```

5. Spin up a local Ethereum RPC node in a separate window using Ganache-CLI.  
    ```javascript
    // In a separate shell window
    ganache-cli
    ```

5. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run start
    ```
