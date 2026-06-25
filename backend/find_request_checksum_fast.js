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
  'DEPT0616',
  'emitra',
  'emitra2016',
  'test',
  ''
];

const fields = [
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

// Pre-map field names to values
const vals = fields.map(f => sample[f] || '');

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
          if (hash1 === sample.CHECKSUM) {
            console.log(`\nFOUND MATCH!`);
            console.log("Fields in order:", memo.map(idx => fields[idx]));
            console.log("Key:", key);
            console.log("Concatenated:", normalStr + key);
            found = true;
            return;
          }
          
          // Check pipe joined format
          const hash2 = crypto.createHash('md5').update(pipeStr + '|' + key).digest('hex');
          if (hash2 === sample.CHECKSUM) {
            console.log(`\nFOUND MATCH (pipe joined with trailing)!`);
            console.log("Fields in order:", memo.map(idx => fields[idx]));
            console.log("Key:", key);
            console.log("Concatenated:", pipeStr + '|' + key);
            found = true;
            return;
          }

          const hash3 = crypto.createHash('md5').update(pipeStr + key).digest('hex');
          if (hash3 === sample.CHECKSUM) {
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
