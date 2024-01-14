import { PaginationDto } from "./PaginationDto";

export interface StudentRequestFilterDto extends PaginationDto {
    StudentLastName : string | null
    StudentId : number | null
}