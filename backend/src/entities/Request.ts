import db from '../dbconfig';
import Sequelize, { ModelDefined } from 'sequelize';

export interface RequestAttributes{
   RequestId: number,
   ProfessorId: number,
   StudentId: number,
   RequestStatus: string,
   SignedDocument: string,

}

export interface RequestCreationAttributes extends RequestAttributes {}

const Request : ModelDefined<RequestAttributes,RequestCreationAttributes> = db.define("Request", 
{
   RequestId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    ProfessorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Professors',  
            key: 'ProfessorId'    // foreign key
        }
    },

    StudentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Students',  
            key: 'StudentId'    // foreign key
        }
    },

    RequestStatus: 
    {
        type: Sequelize.STRING,
        values: ['APPROVED', 'PENDING' , 'REJECTED'],
        allowNull: false,
        validate: {
            isIn: [['APPROVED', 'PENDING' , 'REJECTED']],
        }
    },

    SignedDocument: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

});

export default Request;