const IPFS = require("ipfs-api");

//using the infura.io node
const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

//run with local daemon
// const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});

export default ipfs;
