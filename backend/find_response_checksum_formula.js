const crypto = require('crypto');

// Response data from our own department (REMARKEDU24)
const data = {
  REQUESTID: "CR1780735803713",
  TRANSACTIONSTATUSCODE: "310",
  RECEIPTNO: "0",
  TRANSACTIONID: "0",
  TRANSAMT: "0.00",
  REMAININGWALLET: "0",
  EMITRATIMESTAMP: "20260606142003974",
  TRANSACTIONSTATUS: "FAILURE",
  MSG: "Invalid Checksum",
  CHECKSUM: "8aba7b65eed61944b06b4ab138fea60b" // Target response checksum
};

const keys = [
  'E-m!tr@2016',
  '94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315',
  'REMARKEDU24',
  ''
];

const allFields = [
  'REQUESTID',
  'TRANSACTIONSTATUSCODE',
  'RECEIPTNO',
  'TRANSACTIONID',
  'TRANSAMT',
  'REMAININGWALLET',
  'EMITRATIMESTAMP',
  'TRANSACTIONSTATUS',
  'MSG'
];

function testPermutationsOfSize(size) {
  console.log(`Checking response permutations of size ${size}...`);
  let count = 0;
  let found = false;

  function permute(arr, memo = []) {
    if (found) return;
    if (memo.length === size) {
      count++;
      const baseStr = memo.map(f => data[f] || '').join('');
      for (const key of keys) {
        const hash = crypto.createHash('md5').update(baseStr + key).digest('hex');
        if (hash === data.CHECKSUM) {
          console.log(`\nFOUND RESPONSE MATCH!`);
          console.log("Fields in order:", memo);
          console.log("Key:", key);
          console.log("Concatenated:", baseStr + key);
          console.log("MD5 Checksum:", hash);
          found = true;
          return;
        }
      }
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const curr = arr.slice();
      const next = curr.splice(i, 1);
      permute(curr, memo.concat(next));
    }
  }

  permute(allFields);
  return found;
}

function run() {
  for (let size = 3; size <= 9; size++) {
    if (testPermutationsOfSize(size)) {
      break;
    }
  }
}

run();
