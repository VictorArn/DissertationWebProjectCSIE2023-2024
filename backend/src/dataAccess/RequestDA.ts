import db from "../dbConfig";
import Professor, { ProfessorCreationAttributes } from "../entities/Professor";
import Request, { RequestCreationAttributes } from "../entities/Request";
import RequestFilterDto from "./models/requestFilterDto";
import { Like } from "./operators";

async function getRequest() {
  return await Request.findAll({ include: ["Requests"] })
}


async function getProfessor() {
  return await Professor.findAll();
}

async function getRequestById(id: number) {
  return await Request.findByPk(id, { include: ["Requests"] })
}

async function createRequest(professor: RequestCreationAttributes) {
  return await Request.create(professor, { include: [{ model: Professor, as: "Request" }] });

}


async function getProfessorByEmail(professorEmail: string) {
  try {
    
    return await Professor.findAll({ where: { ProfessorEmail: professorEmail } });

  } catch (error) {
    console.error('Error in getProfessorByRequest(:', error);
    throw new Error('Error fetching Professor by request');
  }
};

async function getRequestByProfessorId(ProfessorId: number) {

  try {
    return await Request.findAll({ where: { ProfessorId: ProfessorId } });
  } catch (error) {
    console.error('Error in getRequestByProfessorId:', error);
    throw new Error('Error fetching request by Professor ID');
  }
}

async function getRequestByStudentId(StudentId: number) {

    try {
      return await Request.findAll({ where: { StudentId: StudentId } });
    } catch (error) {
      console.error('Error in getRequestByStudentId:', error);
      throw new Error('Error fetching request by Student ID');
    }
  }

async function getFilteredRequests(RequestFilter: RequestFilterDto) {

  if (!RequestFilter.take)
    RequestFilter.take = 10;

  if (!RequestFilter.skip)
    RequestFilter.skip = 0;

  let whereClause: any = {};
  if (RequestFilter.RequestId)
    whereClause.RequestId = { [Like]: `%${RequestFilter.RequestId}%` };


  return await Request.findAndCountAll(
    {
      distinct: true,
      where: whereClause,
      limit: RequestFilter.take,
      offset: RequestFilter.skip * RequestFilter.take,
    });

}

async function deleteRequests(id: number) {
  let deleteElem = await Request.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateRequest(request: RequestCreationAttributes, id: number) {
    const findRequest = await getRequestById(request.RequestId);
  
    if (!findRequest) {
      console.log("This request does not exist");
      return;
    }
  
    const t = await db.transaction()
    try {
      await findRequest.update(request);
  
      // deleted
      const existProfessor = await Professor.findAll({
        where: {
          ProfessorId: request.ProfessorId,
        },
      });
  
      if (existProfessor.length > 0) {
        let ProfessorIds = existProfessor.map(a => a.dataValues.ProfessorId);
        let ProffessorIdsDeleted = ProfessorIds.filter(id => !request.Professors.find(add => add.ProfessorId === id)?.ProfessorId)
        if (ProffessorIdsDeleted.length > 0)
          await Request.destroy({
            where: {
              ProfessorId: ProffessorIdsDeleted,
            },
          })
      }
  
      // inserted 
      const insertedA = request.Professors.filter(a => a.ProfessorId === 0)
      if (insertedA.length > 0)
        await Professor.bulkCreate(insertedA)
  
      // updated
      const updatedA = request.Professors.filter(a => a.ProfessorId !== 0);
      if (updatedA.length > 0) {
        for (let item of updatedA) {
          const findA = await Professor.findByPk(item.ProfessorId);
          await findA?.update(item);
        }
      }
  
      await t.commit();
  
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }



export {
  getRequestById,
  getRequest,
  createRequest,
  getFilteredRequests,
  deleteRequests,
  getProfessorByEmail,
  getRequestByStudentId,
  getProfessor,
  getRequestByProfessorId,
  updateRequest
}