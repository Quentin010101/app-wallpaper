import { Injectable } from '@angular/core';
import { Filesystem, Directory, MkdirOptions } from '@capacitor/filesystem';
import { StorageService } from './storage.service';
import { folder } from 'ionicons/icons';
import { Folder } from '../interfaces/folder.interface';

const FOLDER_ROOT = 'my_app_root'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  error!: string

  constructor(private _storageService: StorageService){}

  addFolder(){
    let folders: Folder[] = []
    this.getFolder()?.then((res: Folder[]) => {
      let store: Folder[] = []
      let folder = new Folder()
      let folderIndex = 1
      if(res){
        res.sort((a,b) => a.nb - b.nb)
        folderIndex = this.findNextIndex(res)
        store = res
      }
      folder.nb = folderIndex
      store.push(folder)
      this._storageService.set("folder", store)
      this.createFolder(folderIndex)
    })

  }

  getFolder(){
    return this._storageService.get("folder")
  }

  clear(){
    this._storageService.clear()
  }

  private findNextIndex(folders:Folder[]): number{
    let nextNumber = 1
    for(let i = 0; i < folders.length; i++){
      if(nextNumber != folders[i].nb) break;
      nextNumber++;
    }
    return nextNumber;
  }

  private createFolder(index: number){
    let options: MkdirOptions = {
      path: FOLDER_ROOT + "/folder" + index,
      directory: Directory.Documents,
      recursive: true,
    }

    const  createDir = async() => {
      const contents = await Filesystem.mkdir(options)
      .catch((err) => {
        console.log(err)
        this.error = err
      })
    };
    createDir()
  }





}
