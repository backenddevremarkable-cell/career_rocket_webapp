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

// 1. Insertion order JSON
const payloadKeysInsertion = [
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

// 2. Alphabetical order JSON
const payloadKeysAlphabetical = [...payloadKeysInsertion].sort();

function testJSONString(keysOrder) {
  const obj = {};
  for (const k of keysOrder) {
    obj[k] = sample[k];
  }
  
  const jsonStr = JSON.stringify(obj);
  
  for (const key of keys) {
    // Try appending key to JSON string
    const str1 = jsonStr + key;
    const hash1 = crypto.createHash('md5').update(str1).digest('hex');
    if (hash1 === sample.CHECKSUM) {
      console.log("Found match with JSON string + key:", key);
      console.log("Str:", str1);
      return true;
    }

    // Try key inside JSON? Unlikely, but let's check
    const str2 = jsonStr.substring(0, jsonStr.length - 1) + `,"KEY":"${key}"}`;
    const hash2 = crypto.createHash('md5').update(str2).digest('hex');
    if (hash2 === sample.CHECKSUM) {
      console.log("Found match with JSON string containing key:", key);
      console.log("Str:", str2);
      return true;
    }
  }
  return false;
}

console.log("Testing JSON string configurations...");
if (testJSONString(payloadKeysInsertion)) {
  console.log("Success with Insertion Order!");
} else if (testJSONString(payloadKeysAlphabetical)) {
  console.log("Success with Alphabetical Order!");
} else {
  console.log("No JSON string match found.");
}
