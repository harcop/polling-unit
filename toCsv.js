const { Parser } = require('json2csv');
const fs = require('fs');


const fields = ['STATE', 'LG', 'WARD', 'POLLING_UNIT_ID', 'POLLING_UNIT_NAME', 'REMARK'];
const dirs = fs.readdirSync('./unitData')
const json2csvParser = new Parser({ fields });
for(const dir of dirs) {
  const file = JSON.parse(fs.readFileSync(`./unitData/${dir}`));
  const csv = json2csvParser.parse(file);
  fs.writeFileSync(`./csvData/${dir}.csv`, csv)
}
// console.log(csv)
