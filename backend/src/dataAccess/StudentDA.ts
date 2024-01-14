import Student, { StudentCreationAttributes } from "../entities/Student";
import Request from "../entities/Request";
import {Requests} from "../entities/dbConst";
import { Like } from "./operators";
import StudentRequestFilterDto from "./models/StudentRequestFilterDto";
import db from "../dbConfig";

async function createStudent(student: StudentCreationAttributes) {
  return await Student.create(student, { include: [{ model: Request, as: Requests }] });
}

async function getStudents(StudentFilter: StudentRequestFilterDto) {

  if (!StudentFilter.take)
    StudentFilter.take = 10;

  if (!StudentFilter.skip)
    StudentFilter.skip = 0;

  let whereClause: any = {};
  if (StudentFilter.StudentId)
    whereClause.StudentId = { [Like]: `%${StudentFilter.StudentId}%` };

  return await Student.findAndCountAll(
    {
      distinct: true,
      where: whereClause,
      limit: StudentFilter.take,
      offset: StudentFilter.skip * StudentFilter.take,
    });

}

async function getStudentById(id: number) {
  return await Student.findByPk(id, { include : [Requests] } );
}

async function deleteStudent(id: number) {
  let deleteElem = await Student.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateStudent(Student: StudentCreationAttributes, id: number) {
  const findStudent = await getStudentById(Student.StudentId);

  if (!findStudent) {
    console.log("This Student does not exist");
    return;
  }

  const t = await db.transaction()
  try {
    await findStudent.update(Student);

    // deleted
    const existRequest = await Request.findAll({
      where: {
        StudentId: Student.StudentId,
      },
    });

    if (existRequest.length > 0) {
      let RequestIds = existRequest.map(a => a.dataValues.RequestId);
      let RequestIdsDeleted = RequestIds.filter(id => !Student.Requests.find(add => add.RequestId === id)?.RequestId)
      if (RequestIdsDeleted.length > 0)
        await Request.destroy({
          where: {
            RequestId: RequestIdsDeleted,
          },
        })
    }

    // inserted 
    const insertedA = Student.Requests.filter(a => a.RequestId === 0)
    if (insertedA.length > 0)
      await Request.bulkCreate(insertedA)

    // updated
    const updatedA = Student.Requests.filter(a => a.RequestId !== 0);
    if (updatedA.length > 0) {
      for (let item of updatedA) {
        const findA = await Request.findByPk(item.RequestId);
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
  createStudent,
  getStudentById,
  getStudents,
  deleteStudent,
  updateStudent
}