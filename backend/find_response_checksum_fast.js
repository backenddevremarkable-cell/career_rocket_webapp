const crypto = require('crypto');

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

const fields = [
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

// Pre-map field names to values
const vals = fields.map(f => data[f] || '');

function run() {
  console.log("Starting optimized search...");
  
  let found = false;
  
  function search(size) {
    console.log(`Checking permutations of size ${size}...`);
    
    function permute(indices, memo = []) {
      if (found) return;
      if (memo.length === size) {
        // Direct string concatenation
        let normalStr = '';
        let pipeStr = '';
        for (let i = 0; i < size; i++) {
          const val = vals[memo[i]];
          normalStr += val;
          pipeStr += (i === 0 ? val : '|' + val);
        }
        
        for (const key of keys) {
          // Check standard format
          const hash1 = crypto.createHash('md5').update(normalStr + key).digest('hex');
          if (hash1 === data.CHECKSUM) {
            console.log(`\nFOUND MATCH!`);
            console.log("Fields in order:", memo.map(idx => fields[idx]));
            console.log("Key:", key);
            console.log("Concatenated:", normalStr + key);
            found = true;
            return;
          }
          
          // Check pipe joined format
          const hash2 = crypto.createHash('md5').update(pipeStr + '|' + key).digest('hex');
          if (hash2 === data.CHECKSUM) {
            console.log(`\nFOUND MATCH (pipe joined with trailing)!`);
            console.log("Fields in order:", memo.map(idx => fields[idx]));
            console.log("Key:", key);
            console.log("Concatenated:", pipeStr + '|' + key);
            found = true;
            return;
          }

          const hash3 = crypto.createHash('md5').update(pipeStr + key).digest('hex');
          if (hash3 === data.CHECKSUM) {
            console.log(`\nFOUND MATCH (pipe joined no trailing)!`);
            console.log("Fields in order:", memo.map(idx => fields[idx]));
            console.log("Key:", key);
            console.log("Concatenated:", pipeStr + key);
            found = true;
            return;
          }
        }
        return;
      }
      
      for (let i = 0; i < indices.length; i++) {
        const curr = indices.slice();
        const next = curr.splice(i, 1);
        permute(curr, memo.concat(next));
      }
    }
    
    permute(Array.from({ length: fields.length }, (_, i) => i));
  }
  
  for (let size = 2; size <= fields.length; size++) {
    search(size);
    if (found) break;
  }
  
  if (!found) {
    console.log("No match found in all permutations.");
  }
}

run();
