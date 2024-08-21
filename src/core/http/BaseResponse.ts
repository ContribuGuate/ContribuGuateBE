export class BaseResponse{
    public success: boolean = false;
    public message: string = null;
    public result: any = null;

    constructor(success?: boolean, message?: string, result?: any){
        this.success = success;
        this.message = message;
        this.result = result;
    }

}