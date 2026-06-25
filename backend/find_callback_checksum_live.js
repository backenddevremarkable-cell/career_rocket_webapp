const crypto = require('crypto');

const payload = {
  SSOID: "PRACHEE.GAUR",
  SERVICEID: "14111",
  EMSESSIONID: "9c0dbc2a-25b8-414b-bcab-b5cf691e605b",
  KIOSKCODE: "K11000142",
  OLDKIOSKCODE: "D97K0003",
  DISTRICTCD: "110",
  TEHSILCD: "00560",
  RETURNURL: "https://emitraapp.rajasthan.gov.in/emitra-rhocp/emitra/kiosk/availService?jsessionid=9c0dbc2a-25b8-414b-bcab-b5cf691e605b&",
  EMITRATIMESTAMP: "20260606163342002",
  SSOTOKEN: "MzlmU215bmVHOXJiaFVtS1Y1Njh6L29zZXlBcUJpcmpVSGpDLzRLT28rWkR4UjlKTUdya0VnOU1odVZCbDZoZWFhejRqNnhUWE43bVY0MHZ4OUlFZ1JhZ0Y1MWN0YU5Nb29kcHhEeTladzJhTGhjMGs1YXpvbXhKTTVuUXdoSUxHV2piWXdwYkpjbnNWNjNzVmFUdzg0SDhyWHdDOWZZeVE0VmZhbWJCejVTaE1CVVR4ZjBGRGJyVzI4YS82THFX",
  CHECKSUM: "4736f3cc0c51b00dae0d3f01c6dfa3d3" // Actual callback checksum
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
  console.log("Searching for callback checksum formula...");
  let found = false;

  // Since we suspect the checksum might be on a subset of fields, let's check subsets of size 2 to 10
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

  for (let size = 2; size <= 10; size++) {
    console.log(`Checking combinations of size ${size}...`);
    const subsets = getSubsets(allFields, size);
    
    for (const subset of subsets) {
      const perms = permute(subset);
      for (const p of perms) {
        for (const key of keys) {
          // Direct concatenation
          const str1 = p.map(f => payload[f] || '').join('') + key;
          const hash1 = crypto.createHash('md5').update(str1).digest('hex');
          if (hash1 === payload.CHECKSUM) {
            console.log("\n=============================================");
            console.log("FOUND CALLBACK MATCH!");
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
          const str2 = p.map(f => payload[f] || '').join('|') + '|' + key;
          const hash2 = crypto.createHash('md5').update(str2).digest('hex');
          if (hash2 === payload.CHECKSUM) {
            console.log("\n=============================================");
            console.log("FOUND CALLBACK MATCH!");
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
          const str3 = p.map(f => payload[f] || '').join('|') + key;
          const hash3 = crypto.createHash('md5').update(str3).digest('hex');
          if (hash3 === payload.CHECKSUM) {
            console.log("\n=============================================");
            console.log("FOUND CALLBACK MATCH!");
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
    console.log("No callback match found.");
  }
}

run();
