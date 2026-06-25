const crypto = require('crypto');

const data = {
  REQUESTID: "CR1780838786092",
  TRANSACTIONSTATUSCODE: "310",
  RECEIPTNO: "0",
  TRANSACTIONID: "0",
  TRANSAMT: "0.00",
  REMAININGWALLET: "0",
  EMITRATIMESTAMP: "20260607185625779",
  TRANSACTIONSTATUS: "FAILURE",
  MSG: "Invalid Checksum",
  CHECKSUM: "021996da1c1adc1f2c5d004f25750d13" // Actual response checksum
};

const keys = [
  'E-m!tr@2016',
  '94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315',
  'REMARKEDU24',
  'REMARKEDUHQ',
  'emitra',
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

function permute(arr) {
    let result = [];
    function helper(m = []) {
        if (m.length === arr.length) {
            result.push(m);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (m.includes(arr[i])) continue;
            helper(m.concat(arr[i]));
        }
    }
    helper();
    return result;
}

function run() {
  console.log("Searching for live response checksum formula...");
  let found = false;

  function getSubsets(arr, size) {
    const result = [];
    function helper(start, combo) {
      if (combo.length === size) {
        result.push([...combo]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        combo.push(arr[i]);
        helper(i + 1, combo);
        combo.pop();
      }
    }
    helper(0, []);
    return result;
  }

  for (let size = 2; size <= 9; size++) {
    console.log(`Checking combinations of size ${size}...`);
    const subsets = getSubsets(allFields, size);
    
    for (const subset of subsets) {
      const perms = permute(subset);
      for (const p of perms) {
        for (const key of keys) {
          // Direct concatenation
          const str1 = p.map(f => data[f] || '').join('') + key;
          const hash1 = crypto.createHash('md5').update(str1).digest('hex');
          if (hash1 === data.CHECKSUM) {
            console.log("\n=============================================");
            console.log("FOUND RESPONSE MATCH!");
            console.log("Fields:", p);
            console.log("Key:", key);
            console.log("Format: Direct");
            console.log("Concatenated Str:", str1);
            console.log("Hash:", hash1);
            console.log("=============================================\n");
            found = true;
            return;
          }

          // Pipe joined trailing
          const str2 = p.map(f => data[f] || '').join('|') + '|' + key;
          const hash2 = crypto.createHash('md5').update(str2).digest('hex');
          if (hash2 === data.CHECKSUM) {
            console.log("\n=============================================");
            console.log("FOUND RESPONSE MATCH!");
            console.log("Fields:", p);
            console.log("Key:", key);
            console.log("Format: Pipe trailing");
            console.log("Concatenated Str:", str2);
            console.log("Hash:", hash2);
            console.log("=============================================\n");
            found = true;
            return;
          }

          // Pipe joined direct
          const str3 = p.map(f => data[f] || '').join('|') + key;
          const hash3 = crypto.createHash('md5').update(str3).digest('hex');
          if (hash3 === data.CHECKSUM) {
            console.log("\n=============================================");
            console.log("FOUND RESPONSE MATCH!");
            console.log("Fields:", p);
            console.log("Key:", key);
            console.log("Format: Pipe direct");
            console.log("Concatenated Str:", str3);
            console.log("Hash:", hash3);
            console.log("=============================================\n");
            found = true;
            return;
          }
        }
      }
    }
  }

  if (!found) {
    console.log("No response match found.");
  }
}

run();
