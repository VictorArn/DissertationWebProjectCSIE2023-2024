import db from '../dbconfig';
import Sequelize, { ModelDefined } from 'sequelize';

export interface ProfessorAttributes{
    ProfessorId: number,
    ProfessorName: string,
    ProfessorEmail: string,
   
}

export interface ProfessorCreationAttributes extends ProfessorAttributes {}

const Professor : ModelDefined<ProfessorAttributes, ProfessorCreationAttributes> = db.define("Professor", 
{
    ProfessorId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ProfessorName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    ProfessorEmail:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

});

export default Professor;