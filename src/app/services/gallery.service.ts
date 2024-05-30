import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Camera, Photo } from '@capacitor/camera';
import { options } from './options';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Folder, UserImage } from '../interfaces/image.interface';

const FOLDER_STORAGE = 'folders'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  error!: string
  $galleryErrorSubject = new Subject<string>()
  $galleryValidationSubject = new Subject<string>()
  $folders = new BehaviorSubject<Folder[]>([])

  constructor(private _storageService: StorageService){
    this._storageService.get(FOLDER_STORAGE).subscribe((folders) => {
      if(!folders){
        this.$folders.next([])
      }else{
        this.$folders.next(folders)
      }
    })
  }

  clear(){
    this._storageService.clear()
  }



  // ----------- Image ---------------
  newImage(folderNum: number){
    // step 1 choose an image
    this.chooseImage().then((image) => {
      // step 2 handle an image
      if(image && image.webPath){
        this.handleImage(image, folderNum)
      }else if(image){
        this.handleChooseImageWrongPath()
      }else{
        this.handleChooseImageError()
      }
    })
  }

  private async chooseImage(): Promise<Photo | void>{
    const result = await Camera.getPhoto(options.imageOptions).catch((error) =>{
      console.log(error)
    });
    return result
  }

  private handleChooseImageError(){
    this.$galleryErrorSubject.next("Aucune image / photo choisit.")
  }
  private handleChooseImageWrongPath(){
    this.$galleryErrorSubject.next("Le path de cette image n'est pas lisible")
  }
  private saveImageInDirError(){
    this.$galleryErrorSubject.next("Le repertoire na pas été trouvé. l'image n'a pas pu être enregistré.")
  }

  private handleImage(image: Photo, folderId: number){  
    this._storageService.get("lastImageId").subscribe((result) => {
      let newImage: UserImage
      if(result) {
        newImage = new UserImage(result + 1, image.webPath as string,folderId)
      }else{
        newImage = new UserImage(1, image.webPath as string,folderId)
      }
      this.saveImage(folderId, newImage)
    })
  }

  private saveImage(folderId:number, newImage: UserImage){
    let folders: Folder[] = this.$folders.value
    let folderSearched: Folder | null = null

    for(let i = 0; i < folders.length; i++){
      if(folders[i].id == folderId){
        folderSearched = folders[i]
        break;
      }
    }

    if(folderSearched){
      folderSearched.images.push(newImage)
      let filteredArray = folders.filter((f) => f.id != folderSearched?.id)
      filteredArray.push(folderSearched)
      this.updateFolders(filteredArray)
      this.$galleryValidationSubject.next("L'image à bien été ajouté.")
    }else{
      this.saveImageInDirError()
    }
  }



  // ---------- Folder --------------
  newFolder(){
    if(this.$folders.value){
      this.handleNewFolder(this.$folders.value)
    }
  }

  private handleNewFolder(folderArray: Folder[]){
    let folderIndex = 1
    if(folderArray){
      folderArray.sort((a,b) => a.id - b.id)
      folderIndex = this.findNextIndex(folderArray)
    }
    folderArray.push(new Folder(folderIndex, "folder" + folderIndex))
    this.updateFolders(folderArray)
  }

  private findNextIndex(folderArray:Folder[]): number{
    let nextNumber = 1
    for(let i = 0; i < folderArray.length; i++){
      if(nextNumber != folderArray[i].id) break;
      nextNumber++;
    }
    return nextNumber;
  }

  private updateFolders(folderArray: Folder[]){
    console.log("test")
    this._storageService.set(FOLDER_STORAGE, folderArray)?.then(() => {
      this._storageService.get(FOLDER_STORAGE).subscribe((folders) => {
        console.log(folders)
        if(folders) this.$folders.next(folders)
        this.$galleryValidationSubject.next("Le Répertoire à bien été crée.")
      })
    })
  }

}
