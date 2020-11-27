
export interface IMenuInfo {
    icon:string | null,
    list: [] | null,
    menuId:number,
    name:string,
    orderNum:number,
    parentId:number,
    parentName: string | null,
    type: number,
    url: string,
    mandate: object | null
}

export interface IMenu {
    menuList:IMenuInfo[],
    selectedKeys:number[],
    openkeys:number[],
    openkeysList:number[]
}

export interface ILogin {
    phone:string,
    password:string,
    verification:string,
}
