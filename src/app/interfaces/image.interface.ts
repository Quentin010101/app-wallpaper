export class UserImage{
    constructor(id:number, path:string, folderId:number){
        this.id = id
        this.path = path
        this.folderId = folderId
    }
    id!: number
    path!: string
    folderId!: number
}

export class Folder{
    constructor(id:number, name:string){
        this.id = id
        this.name = name
    }
    id!: number
    name!: string
    images: UserImage[] = []
}