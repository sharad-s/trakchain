# Trakchain v0.0.1
Trakchain is Invite-only beat marketplace for independent artists and producers.
Built on the blockchain.

## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle ipfs
    ```

2. Install Dependencies.
    ```javascript
    npm install
    ```

3. Run the development console.
    ```javascript
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

5. Spin up an IPFS daemon in a separate window.  
    ```javascript
    // In a separate window
    ipfs daemon
    ```

5. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run start
    ```
