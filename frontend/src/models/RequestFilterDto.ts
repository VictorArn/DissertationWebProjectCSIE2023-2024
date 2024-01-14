import { PaginationDto } from "./PaginationDto";

export interface RequestFilterDto extends PaginationDto{
    RequestId : number | null;
}