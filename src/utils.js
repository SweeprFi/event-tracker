const { ethers } = require('ethers');
const { colors } = require('./config');

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const shortAddress = (address) => {
  if (!address) return
  return `${address.slice(0, 5)} ··· ${address.slice(-5)}`
}

const format = (value, p = 10) => {
  return Number(Number(ethers.formatUnits(value, 18)).toFixed(p));
}

const formatArgs = (name, args) => {
  switch (name) {
    case 'TokenMinted':
    case 'TokenBurned':
      return `[to: ${shortAddress(args[0])}] - [amount: ${format(args[1])}]`;
    case 'Transfer':
      return `[from: ${shortAddress(args[0])}] - [to: ${shortAddress(args[1])}] - [amount: ${format(args[2])}]`;
    default:
      return args;
  }
}

const toDate = (value) => {
  if (value === 0) return '-';
  const date = new Date(value * 1000);
  return month[date.getMonth()] + ' ' + date.getDate() + ', ' + zeroToNum(date.getHours()) + ':' + zeroToNum(date.getMinutes());
}

const zeroToNum = (val) => {
  return ('00' + val).slice(-2);
}

const displayLog = async (provider, network, data) => {
  const { transactionHash, fragment, args, blockNumber } = data;
  block = await provider.getBlock(blockNumber);
  const name = fragment.name;
  console.log(`${colors[network]}[${network}] [${toDate(block.timestamp)}] - ${name}(${transactionHash}) => ${formatArgs(name, args)}${colors.def}`);
}

module.exports = {
  displayLog,
}
