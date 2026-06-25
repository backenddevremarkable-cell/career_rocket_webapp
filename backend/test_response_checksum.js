const crypto = require('crypto');

// Actual data from Case 1 response:
const data1 = {
  REQUESTID: "CR1780735803713",
  TRANSACTIONSTATUSCODE: "310",
  RECEIPTNO: "0",
  TRANSACTIONID: "0",
  TRANSAMT: "0.00",
  REMAININGWALLET: "0",
  EMITRATIMESTAMP: "20260606142003974",
  TRANSACTIONSTATUS: "FAILURE",
  MSG: "Invalid Checksum",
  CHECKSUM: "8aba7b65eed61944b06b4ab138fea60b" // Returned checksum
};

const keys = [
  'E-m!tr@2016',
  '94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315',
  'REMARKEDU24',
  ''
];

// Let's test standard concatenation orders of response fields
const fieldPermutations = [
  // Order 1: Standard transaction status fields
  ['REQUESTID', 'TRANSACTIONSTATUSCODE', 'RECEIPTNO', 'TRANSACTIONID', 'TRANSAMT', 'TRANSACTIONSTATUS'],
  // Order 2: Add MSG
  ['REQUESTID', 'TRANSACTIONSTATUSCODE', 'RECEIPTNO', 'TRANSACTIONID', 'TRANSAMT', 'TRANSACTIONSTATUS', 'MSG'],
  // Order 3: Alphabetical of all keys (excluding CHECKSUM)
  ['EMITRATIMESTAMP', 'MSG', 'RECEIPTNO', 'REMAININGWALLET', 'REQUESTID', 'TRANSAMT', 'TRANSACTIONID', 'TRANSACTIONSTATUS', 'TRANSACTIONSTATUSCODE'],
  // Order 4: Standard without status code
  ['REQUESTID', 'RECEIPTNO', 'TRANSACTIONID', 'TRANSAMT', 'TRANSACTIONSTATUS'],
  // Order 5: Simple status and msg
  ['REQUESTID', 'TRANSACTIONSTATUSCODE', 'MSG'],
  // Order 6: All fields in insertion order
  ['REQUESTID', 'TRANSACTIONSTATUSCODE', 'RECEIPTNO', 'TRANSACTIONID', 'TRANSAMT', 'REMAININGWALLET', 'EMITRATIMESTAMP', 'TRANSACTIONSTATUS', 'MSG'],
];

console.log("Searching for matching response checksum...");

let found = false;
for (const fields of fieldPermutations) {
  for (const key of keys) {
    const concatenatedStr = fields.map(f => data1[f] || '').join('') + key;
    const hash = crypto.createHash('md5').update(concatenatedStr).digest('hex');
    if (hash === data1.CHECKSUM) {
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
  console.log("No match found using standard combinations. Trying without join or custom formats...");
}
