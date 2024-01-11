import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import Professor from './Professor';
import Request from './Request';
import Session from './Session';
import Student from './Student';

env.config();

function createDatabase(){   
    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {   
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })    
    .catch((err) => {
    console.warn(err.stack)
    })
}

function fkConfig()
 {
//     Student.hasMany(Teacher, {as : Teacher, foreignKey: "StudentId"});
//     Teacher.belongsTo(Student, { foreignKey: "StudentId"})    

        Professor.hasMany(Session, {as : "Sessions", foreignKey : "ProfessorId"});
        Session.belongsTo(Professor, {foreignKey : "ProfessorId"});

        Student.hasMany(Request, {as : "Requests", foreignKey : "StudentId"});
        Request.belongsTo(Student, {foreignKey : "StudentId"});

        Professor.hasMany(Request, {as : "Requests", foreignKey : "ProfessorId"});
        Request.belongsTo(Student, {foreignKey : "ProfessorId"});

        


 }

function db_init(){
    createDatabase();
    fkConfig();    
}

export default db_init;