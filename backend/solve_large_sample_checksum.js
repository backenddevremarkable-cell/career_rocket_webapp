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

// All fields in insertion order
const fieldsInsertion = [
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

// All fields in alphabetical order
const fieldsAlphabetical = [...fieldsInsertion].sort();

function getSubsequences(arr, size) {
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

function run() {
  console.log("Solving large sample checksum using sub-sequences...");
  let found = false;

  const orders = [
    { name: "Insertion Order", fields: fieldsInsertion },
    { name: "Alphabetical Order", fields: fieldsAlphabetical }
  ];

  for (const order of orders) {
    for (let size = 2; size <= 12; size++) {
      const subsequences = getSubsequences(order.fields, size);
      
      for (const sub of subsequences) {
        for (const key of keys) {
          // Direct concat
          const str1 = sub.map(f => sample[f]).join('') + key;
          const hash1 = crypto.createHash('md5').update(str1).digest('hex');
          if (hash1 === sample.CHECKSUM) {
            console.log(`\nFOUND MATCH!`);
            console.log("Order:", order.name);
            console.log("Fields:", sub);
            console.log("Key:", key);
            console.log("Format: Direct");
            console.log("Concatenated:", str1);
            found = true;
            return;
          }

          // Pipe joined trailing
          const str2 = sub.map(f => sample[f]).join('|') + '|' + key;
          const hash2 = crypto.createHash('md5').update(str2).digest('hex');
          if (hash2 === sample.CHECKSUM) {
            console.log(`\nFOUND MATCH!`);
            console.log("Order:", order.name);
            console.log("Fields:", sub);
            console.log("Key:", key);
            console.log("Format: Pipe trailing");
            console.log("Concatenated:", str2);
            found = true;
            return;
          }

          // Pipe joined direct
          const str3 = sub.map(f => sample[f]).join('|') + key;
          const hash3 = crypto.createHash('md5').update(str3).digest('hex');
          if (hash3 === sample.CHECKSUM) {
            console.log(`\nFOUND MATCH!`);
            console.log("Order:", order.name);
            console.log("Fields:", sub);
            console.log("Key:", key);
            console.log("Format: Pipe direct");
            console.log("Concatenated:", str3);
            found = true;
            return;
          }
        }
      }
    }
  }

  if (!found) {
    console.log("No sub-sequence match found for sample.");
  }
}

run();
