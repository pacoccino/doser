const csv2json = require('csvjson-csv2json')
const fs = require('fs')

const csv = fs.readFileSync('./data/data.csv', 'utf-8')

console.log(csv)
const json = csv2json(csv, {parseNumbers: true});


json.forEach(row => {
    Object.keys(row).forEach(key => {
        if(row[key] === '') {
            delete row[key]
        }
    })
})

console.log(json);

fs.writeFileSync('./src/data.json', JSON.stringify(json, null, 2))