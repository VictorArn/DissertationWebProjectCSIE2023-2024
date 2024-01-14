import { ProfessorAttributes } from "./Professor";

export interface RequestAttributes{
    RequestId: number,
    ProfessorId: number,
    StudentId: number,
    RequestStatus: string,
    SignedDocument: string,
     Professors : ProfessorAttributes[]
 }
 