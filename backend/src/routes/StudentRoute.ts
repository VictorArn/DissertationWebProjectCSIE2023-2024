import express from 'express';
import {createStudent, getStudentById, getStudents, deleteStudent, updateStudent} from "../dataAccess/StudentDA"
import StudentRequestFilterDto from '../dataAccess/models/studentRequestFilterDto';

let StudentRouter = express.Router();
  
StudentRouter.route('/Student').post( async (req, res) => {
  return res.json(await createStudent(req.body));
})

StudentRouter.route('/Student').get( async (req, res) => {  
  var queryParams = new StudentRequestFilterDto(req.query) 
  return res.json(await getStudents(queryParams));
})

StudentRouter.route('/Student/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getStudentById(id));
})

StudentRouter.route('/Student/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteStudent(id));
})

StudentRouter.route('/Student/:id').put( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await updateStudent(req.body, id));
})

export default StudentRouter;