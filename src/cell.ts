export class cell{
    num:number
    isMarged:boolean
    constructor(num?:number){
        this.num=num??0
        this.isMarged=false
    }
    resetTurn(){
        this.isMarged=false;
    }
}