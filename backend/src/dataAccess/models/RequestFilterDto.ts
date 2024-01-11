import paginationDto from "./paginationDto";

export default class RequestFilterDto extends paginationDto{
    RequestId! : number | null

    constructor(obj : Partial<RequestFilterDto>) {
        super();
        Object.assign(this, obj);
        this.setTakeAndSkip(this.take, this.skip);
    }
}