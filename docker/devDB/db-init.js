const fs = require('fs')
const Sequelize = require('sequelize')

const sql_string = fs.readFileSync(__dirname + '/../../setup.sql', 'utf8');

const sequelize = new Sequelize('MySQL', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true
  }
});

sequelize.query(sql_string);
