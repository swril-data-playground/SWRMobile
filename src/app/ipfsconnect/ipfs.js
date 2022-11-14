const fs = require("fs");
const { CID } = import("ipfs-http-client");
const ipfsCluster = require('ipfs-cluster-api');
const { syncBuiltinESMExports } = require("module");


// connenctIpfs() => IPFS client
// Sample Use => const client = async () => await connectIpfs();
//            => const client = await conncectipfs()  [this will only work inside an async function]

async function unpinThread(cluster, cid) {
        // fetch from blockchain
        var listCID = [cid]
        listCID.forEach(async CID => {
            await cluster.pin.rm(CID, (err) => {
                console.log("reached here")
                err ? console.error(err) : console.log(`pin removed - ${CID}`)
            })
        });
        // break;
        // await new Promise(resolve => setTimeout(resolve, 3000))

}

async function connectCluster() {
    const cluster = ipfsCluster('/ip4/34.196.111.188/tcp/9094');
    console.log("this worked");
    // await unpinThread(cluster);
    return cluster
}

async function connectIpfs() {
    const { create } = await import('ipfs-http-client')
    const client = create({ url: process.env.IPFS_ENDPOINT });
    return client
}


// uploadFile() => CID

async function uploadFile(fileBuffer) {
    const client = await connectIpfs();
    const data = fs.readFileSync(fileBuffer[0]['path'])
    const blob = new Blob([data])
    const { cid } = await client.add(blob);
    const cluster = await connectCluster()
    var options = new Object();
    options.replication = 2;
    await cluster.pin.add(cid, (err) => {
        err ? console.error(err) : console.log('pin added')
    })
    // await cluster.pin.rm(cid, (err) => {
    //     console.log("reached here")
    //     err ? console.error(err) : console.log(`pin removed - ${cid}`)
    // })
    // await unpinThread(cluster,cid);

    // await cluster.pin.ls({filter: 'pin'}, (err, pins) => {
    //     err ? console.error(err) : console.log(pins)
    // })
    // retrieveFile(cid);

    // fs.readFile(fileBuffer[0]['path'], async (error, data) => {
    //     if (error) {
    //         throw error;
    //     }
    //     console.log(data)
    //     const blob = new Blob([data])
    //     const { cid } = await client.add(blob);
    //     // Uncomment this function while testing
    //     console.log(cid)
    //     retrieveFile(cid);
    //     return cid;
    // })
    // console.log("program reached here");
    return cid;
}

async function unpinFile(cid) {
    const cluster = await connectCluster()
    await cluster.pin.rm(cid, (err) => {
        console.log("reached here")
        err ? console.error(err) : console.log(`pin removed - ${cid}`)
    })
}
// retrieveFile(cid) => booolean

async function retrieveFile(cid) {
    const client = await connectIpfs();
    const fileName = "./files/is.txt";
    const file = fs.createWriteStream(fileName);

    for await (const chunk of client.cat(`/ipfs/${cid}`)) {
        const buffer = Buffer.from(chunk.buffer)
        file.write(buffer);
    }
    console.log("File writing done")
    return fileName;
}


module.exports = { uploadFile, retrieveFile, unpinFile}