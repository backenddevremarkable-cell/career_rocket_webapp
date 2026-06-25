const crypto = require('crypto');

// Sample payload from user prompt
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

// Candidate keys/salts (including typical legacy E-Mitra keys or sample salts)
const keys = [
  'E-m!tr@2016',
  '94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315',
  'REMARKEDU24',
  'emitra',
  'test',
  ''
];

// Let's test standard concatenation orders of request fields
const fieldPermutations = [
  // 1. MERCHANTCODE + SERVICEID + REQUESTID + REVENUEHEAD + CONSUMERKEY + CONSUMERNAME + SSOTOKEN
  ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'],
  // 2. MERCHANTCODE + REQUESTID + SERVICEID + REVENUEHEAD + CONSUMERKEY + CONSUMERNAME + SSOTOKEN
  ['MERCHANTCODE', 'REQUESTID', 'SERVICEID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'],
  // 3. MERCHANTCODE + SERVICEID + REQUESTID + REVENUEHEAD + CONSUMERKEY + CONSUMERNAME + SSOID + SSOTOKEN
  ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOID', 'SSOTOKEN'],
  // 4. MERCHANTCODE + SERVICEID + REQUESTID + REVENUEHEAD + CONSUMERKEY + CONSUMERNAME + SSOID + OFFICECODE + SSOTOKEN
  ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOID', 'OFFICECODE', 'SSOTOKEN'],
  // 5. MERCHANTCODE + SERVICEID + REQUESTID + REVENUEHEAD + CONSUMERKEY + CONSUMERNAME + SSOID
  ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOID'],
  // 6. MERCHANTCODE + REQUESTID + REVENUEHEAD + CONSUMERKEY + CONSUMERNAME + SSOID + SSOTOKEN
  ['MERCHANTCODE', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOID', 'SSOTOKEN'],
  // 7. MERCHANTCODE + SERVICEID + REQUESTID + REVENUEHEAD + CONSUMERKEY + CONSUMERNAME + SSOTOKEN (lowercase keys check)
  ['merchantcode', 'serviceid', 'requestid', 'revenuehead', 'consumerkey', 'consumername', 'ssotoken'],
  // 8. All fields in alphabetical order
  ['COMMTYPE', 'CONSUMERKEY', 'CONSUMERNAME', 'MERCHANTCODE', 'OFFICECODE', 'REQUESTID', 'REQTIMESTAMP', 'REVENUEHEAD', 'SERVICEID', 'SSOID', 'SSOTOKEN', 'SUBSERVICEID'],
  // 9. All fields in insertion order
  ['MERCHANTCODE', 'REQUESTID', 'REQTIMESTAMP', 'SERVICEID', 'SUBSERVICEID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'COMMTYPE', 'SSOID', 'OFFICECODE', 'SSOTOKEN'],
];

console.log("Searching for matching request checksum...");

let found = false;
for (const fields of fieldPermutations) {
  for (const key of keys) {
    const concatenatedStr = fields.map(f => sample[f] || '').join('') + key;
    const hash = crypto.createHash('md5').update(concatenatedStr).digest('hex');
    if (hash === sample.CHECKSUM) {
      console.log("\nFOUND MATCH!");
      console.log("Fields:", fields);
      console.log("Key:", key);
      console.log("Concatenated string:", concatenatedStr);
      console.log("Hash:", hash);
      found = true;
      break;
    }
  }
  if (found) break;
}

if (!found) {
  console.log("No match found yet. Trying sub-permutations or different key additions...");
  
  // Let's try to search if there's any subset of fields that matches with standard key E-m!tr@2016
  const standardKey = 'E-m!tr@2016';
  // Let's test combinations programmatically
  const allFields = Object.keys(sample).filter(k => k !== 'CHECKSUM');
  
  // Try all subsets of length 5 to 8
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

  for (let size = 5; size <= 8; size++) {
    console.log(`Checking combinations of size ${size}...`);
    const subsets = getSubsets(allFields, size);
    for (const subset of subsets) {
      const concatenatedStr = subset.map(f => sample[f] || '').join('') + standardKey;
      const hash = crypto.createHash('md5').update(concatenatedStr).digest('hex');
      if (hash === sample.CHECKSUM) {
        console.log("\nFOUND MATCH via subset programmatically!");
        console.log("Fields:", subset);
        console.log("Key:", standardKey);
        console.log("Concatenated string:", concatenatedStr);
        console.log("Hash:", hash);
        found = true;
        break;
      }
    }
    if (found) break;
  }
}
