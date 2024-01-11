import db from '../dbconfig';
import Sequelize, { ModelDefined } from 'sequelize';

export interface SessionAttributes{
   SessionId: number,
   SessionName: string,
   SessionStartDate: Date,
   SessionEndDate: Date,
   maxRequestsAllowed: number,
   ProfessorId: number,

}

export interface SessionCreationAttributes extends SessionAttributes {}

const Session : ModelDefined<SessionAttributes,SessionCreationAttributes> = db.define("Session", 
{
   SessionId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
   SessionName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },


    SessionStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },

    SessionEndDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },

    maxRequestsAllowed: 
    {
        type: Sequelize.INTEGER,
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

});

export default Session;