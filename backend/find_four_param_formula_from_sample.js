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

const keysToPermute = ['SSOID', 'REQUESTID', 'REQTIMESTAMP', 'SSOTOKEN'];
const permutations = permute(keysToPermute);

console.log(`Checking permutations of SSOID, REQUESTID, REQTIMESTAMP, SSOTOKEN against sample CHECKSUM...`);

let found = false;
for (const p of permutations) {
    for (const key of keys) {
        // Direct concat
        const str1 = p.map(k => sample[k]).join('') + key;
        const hash1 = crypto.createHash('md5').update(str1).digest('hex');
        if (hash1 === sample.CHECKSUM) {
            console.log("\nFOUND MATCH (direct)!");
            console.log("Formula:", p.join(' + ') + (key ? ' + Key' : ''));
            console.log("Key:", key);
            console.log("Concatenated:", str1);
            console.log("Checksum:", hash1);
            found = true;
            break;
        }

        // Pipe joined trailing
        const str2 = p.map(k => sample[k]).join('|') + '|' + key;
        const hash2 = crypto.createHash('md5').update(str2).digest('hex');
        if (hash2 === sample.CHECKSUM) {
            console.log("\nFOUND MATCH (pipe joined trailing)!");
            console.log("Formula:", p.join(' | ') + '|' + (key ? 'Key' : ''));
            console.log("Key:", key);
            console.log("Concatenated:", str2);
            console.log("Checksum:", hash2);
            found = true;
            break;
        }

        // Pipe joined no trailing
        const str3 = p.map(k => sample[k]).join('|') + key;
        const hash3 = crypto.createHash('md5').update(str3).digest('hex');
        if (hash3 === sample.CHECKSUM) {
            console.log("\nFOUND MATCH (pipe joined no trailing)!");
            console.log("Formula:", p.join(' | ') + (key ? 'Key' : ''));
            console.log("Key:", key);
            console.log("Concatenated:", str3);
            console.log("Checksum:", hash3);
            found = true;
            break;
        }
    }
    if (found) break;
}

if (!found) {
    console.log("No match found for 4-parameter combinations on sample. Let's expand to include MERCHANTCODE or others...");
    // Let's test combinations of 5-8 fields that contain at least those 4 fields
    const allFields = Object.keys(sample).filter(k => k !== 'CHECKSUM');
    // We want subsets of allFields of size 5 to 8 that contain all of keysToPermute
    function getSubsets(arr, size) {
        const result = [];
        function helper(start, combo) {
            if (combo.length === size) {
                // Check if all of keysToPermute are in combo
                const containsAll = keysToPermute.every(k => combo.includes(k));
                if (containsAll) {
                    result.push([...combo]);
                }
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
        console.log(`Checking combinations of size ${size} containing SSOID, REQUESTID, REQTIMESTAMP, SSOTOKEN...`);
        const subsets = getSubsets(allFields, size);
        for (const subset of subsets) {
            const subsetPerms = permute(subset);
            for (const p of subsetPerms) {
                for (const key of keys) {
                    const str = p.map(k => sample[k]).join('') + key;
                    const hash = crypto.createHash('md5').update(str).digest('hex');
                    if (hash === sample.CHECKSUM) {
                        console.log("\nFOUND MATCH in subset of size", size);
                        console.log("Formula:", p.join(' + ') + (key ? ' + Key' : ''));
                        console.log("Key:", key);
                        console.log("Concatenated:", str);
                        console.log("Checksum:", hash);
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
        if (found) break;
    }
}
