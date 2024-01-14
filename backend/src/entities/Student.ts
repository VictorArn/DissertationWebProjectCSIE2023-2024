import db from'../dbConfig'
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import { RequestAttributes } from './Request';

export interface StudentAttributes{
    StudentId : number,
    StudentName: string,
    StudentLastName: string,
    StudentYear: number,
    Requests: RequestAttributes[]
   
}


export interface StudentCreationAttributes extends StudentAttributes {
}

const Student : ModelDefined<StudentAttributes,StudentCreationAttributes> = db.define("Student",  
{
    StudentId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    StudentFirstName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    StudentLastName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    StudentYear: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    
});

export default Student;