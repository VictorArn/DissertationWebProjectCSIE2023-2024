import express from 'express';
import RequestFilterDto from '../dataAccess/models/RequestFilterDto';
import {  getRequestById, getRequest,
    createRequest,
    getFilteredRequests,
    deleteRequests,
    getRequestByStudentId,
    getProfessor,
    getRequestByProfessorId,
    updateRequest } from '../dataAccess/RequestDA';



let RequestRoute = express.Router();
  
RequestRoute.route('/Request').post( async (req, res) => {
  return res.json(await createRequest(req.body));
})

RequestRoute.route('/Request').get( async (req, res) => {  
  var queryParams = new RequestFilterDto(req.query) 
  return res.json(await getFilteredRequests(queryParams));
})

RequestRoute.route('/Professor').get(async (req,res) => {
  return res.json(await getProfessor());
})

RequestRoute.route('/Request/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getRequestById(id));
})

RequestRoute.route('/Request/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteRequests(id));
})

RequestRoute.route('/Professor/:id').get( async (req, res) => {
  let id = parseInt(req.params.id)
  return res.json(await getRequestByProfessorId(id));
});

RequestRoute.route('/Student/:id').get( async (req, res) => {
    let id = parseInt(req.params.id)
    return res.json(await getRequestByStudentId(id));
  });

  RequestRoute.route('/events').get(async (req,res) => {
    return res.json(await getRequest());
  })

  RequestRoute.route('/Request/:id').put( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await updateRequest(req.body, id));
  })
export default RequestRoute;