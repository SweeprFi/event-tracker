const { ethers } = require('ethers');
const { displayLog } = require('./src/utils');
const { supportedNetworks } = require('./src/config');

const sweepABI = require('./src/abi.json');
const sweepAddress = "0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574"
const eventsToTrack = ['TokenMinted', 'TokenBurned', 'Transfer'];

async function getPastEvents(network) {
    const provider = new ethers.WebSocketProvider(network.url);
    const contract = new ethers.Contract(sweepAddress, sweepABI, provider);

    const filters = eventsToTrack.map(eventName => contract.filters[eventName]());

    filters.forEach(async (filter) => {
        const pastEvents = await contract.queryFilter(filter, 0, 'latest');
        pastEvents.forEach(event => {
            displayLog(network.name, event)
        });
    });
}

async function subscribeToEvents(network) {
  const provider = new ethers.WebSocketProvider(network.url);
  const contract = new ethers.Contract(sweepAddress, sweepABI, provider);
  const filters = eventsToTrack.map(eventName => contract.filters[eventName]());

  filters.forEach((filter, index) => {
    contract.on(filter, (from, to, value, event) => {
        displayLog(network.name, event);
    })
    .then((listener) => {
      console.log(`[${network.name}] Listen event ${eventsToTrack[index]}...`);
    })
    .catch((error) => {
      console.error(`[${network.name}] Error:`, error);
    });
  });
}

async function events() {
    await Promise.all(supportedNetworks.map(async (network) => {
        await getPastEvents(network);
        await subscribeToEvents(network);
    }))
}

events();
