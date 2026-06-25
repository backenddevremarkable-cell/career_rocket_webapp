const crypto = require('crypto');

const sample = {
  MERCHANTCODE: "DEPT0616",
  REQUESTID: "1234453",
  REQTIMESTAMP: "20160430013622123",
  SERVICEID: "1419",
  SUBSERVICEID: "1111",
  REVENUEHEAD: "355-200.00|354-5.00",
  CONSUMERKEY: "123456-3342-Y-332-2-ADDED",
  CONSUMERNAME: "xyz",
  COMMTYPE: "1",
  SSOID: "SSOTESTKIOSK",
  OFFICECODE: "OFFIC0001",
  SSOTOKEN: "687541",
  CHECKSUM: "2c5970121d7e576c82baaf32d85da5db" // Target checksum
};

const keys = [
  'E-m!tr@2016',
  '94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315',
  'DEPT0616',
  'emitra',
  ''
];

const allFields = [
  'MERCHANTCODE',
  'REQUESTID',
  'REQTIMESTAMP',
  'SERVICEID',
  'SUBSERVICEID',
  'REVENUEHEAD',
  'CONSUMERKEY',
  'CONSUMERNAME',
  'COMMTYPE',
  'SSOID',
  'OFFICECODE',
  'SSOTOKEN'
];

function testPermutationsOfSize(size) {
  console.log(`Checking permutations of size ${size}...`);
  let count = 0;
  let found = false;

  function permute(arr, memo = []) {
    if (found) return;
    if (memo.length === size) {
      count++;
      const baseStr = memo.map(f => sample[f] || '').join('');
      for (const key of keys) {
        const hash = crypto.createHash('md5').update(baseStr + key).digest('hex');
        if (hash === sample.CHECKSUM) {
          console.log(`\nFOUND MATCH!`);
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
