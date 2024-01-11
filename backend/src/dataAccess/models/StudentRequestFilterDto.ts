import paginationDto from "./paginationDto";

export default class StudentRequestFilterDto extends paginationDto{
    RequestId! : number | null
    StudentId! : number | null

    constructor(obj : Partial<StudentRequestFilterDto >) {
        super();
        Object.assign(this, obj);
        this.setTakeAndSkip(this.take, this.skip);
    }
}