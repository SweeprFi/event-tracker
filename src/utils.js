const { ethers } = require('ethers');
const { colors } = require('./config');

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

const displayLog = (network, data) => {
  const { transactionHash, fragment, args } = data;
  const name = fragment.name;
  console.log(`${colors[network]}[${network}] - ${name}(${transactionHash}) => ${formatArgs(name, args)}${colors.def}`);
}

module.exports = {
  displayLog,
}
