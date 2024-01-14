import { PaginationDto } from "./PaginationDto";

export interface SessionFilterDto extends PaginationDto {
    SessionId : number
    ProfessorId : number
    SessionStartDate: Date,
    SessionEndDate: Date,
}