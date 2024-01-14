import { RequestAttributes } from './Request';

export interface StudentAttributes{
    StudentId : number,
    StudentName: string,
    StudentLastName: string,
    StudentYear: number,
    Requests: RequestAttributes[]
   
}