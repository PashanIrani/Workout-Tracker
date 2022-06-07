const csv = require('csvtojson');
const path = require('path');

module.exports = app => {
  app.get('/getAllExercises', (req, res) => {
    csv()
    .fromFile(path.join(__dirname, '../../../public/data/exercises.csv'))
    .then((data)=>{
        res.json(data)
    })
  });
}