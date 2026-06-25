const crypto = require('crypto');

// Decrypted callback payload for our department
const payload = {
  SSOID: "PRACHEE.GAUR",
  SERVICEID: "14111",
  EMSESSIONID: "f64bcb11-e039-48f2-821a-992eec06645e",
  KIOSKCODE: "K11000142",
  OLDKIOSKCODE: "D97K0003",
  DISTRICTCD: "110",
  TEHSILCD: "00560",
  RETURNURL: "https://emitraapp.rajasthan.gov.in/emitra-rhocp/emitra/kiosk/availService?jsessionid=f64bcb11-e039-48f2-821a-992eec06645e&",
  EMITRATIMESTAMP: "20260606112509184",
  SSOTOKEN: "bE5PdTRuRFpXNEFVdWxuYXBNTnZXQWJiM21oV3VITGE3M3VhK1dpZEtGNzhyNkFYcjZWczhSNW1jNXJhQjZVMFVOSjQ4bFdPVmZSaVREWjRzazhFQndxZXUrVHduZm5IU0ZJZ2YvSSs5Q3BCYkNOdkt6c2pmeU9VdjdSWHJHdFdWVXJtdTlxZkdVYVFNYVhHQkpicUIrcEFyZ3FYcmdPZS8raEJHYjhhci83bVBaLzlmYUFjMHpPTHhOQXVPb1VO",
  CHECKSUM: "e6c057cb17dc7155d0eccfdeeb4ae0b1" // Target checksum
};

const keys = [
  'E-m!tr@2016',
  '94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315',
  'REMARKEDU24',
  ''
];

const allFields = [
  'SSOID',
  'SERVICEID',
  'EMSESSIONID',
  'KIOSKCODE',
  'OLDKIOSKCODE',
  'DISTRICTCD',
  'TEHSILCD',
  'RETURNURL',
  'EMITRATIMESTAMP',
  'SSOTOKEN'
];

function testPermutationsOfSize(size) {
  console.log(`Checking callback permutations of size ${size}...`);
  let found = false;

  function permute(arr, memo = []) {
    if (found) return;
    if (memo.length === size) {
      const baseStr = memo.map(f => payload[f] || '').join('');
      for (const key of keys) {
        const hash = crypto.createHash('md5').update(baseStr + key).digest('hex');
        if (hash === payload.CHECKSUM) {
          console.log(`\nFOUND CALLBACK MATCH!`);
          console.log("Fields in order:", memo);
          console.log("Key:", key);
          console.log("Concatenated:", baseStr + key);
          console.log("MD5 Checksum:", hash);
          found = true;
          return;
        }

        // Also test with pipe join
        const pipeStr = memo.map(f => payload[f] || '').join('|');
        const hashPipe = crypto.createHash('md5').update(pipeStr + '|' + key).digest('hex');
        if (hashPipe === payload.CHECKSUM) {
          console.log(`\nFOUND CALLBACK MATCH (pipe joined)!`);
          console.log("Fields in order:", memo);
          console.log("Key:", key);
          console.log("Concatenated:", pipeStr + '|' + key);
          console.log("MD5 Checksum:", hashPipe);
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
  for (let size = 2; size <= 10; size++) {
    if (testPermutationsOfSize(size)) {
      break;
    }
  }
}

run();
