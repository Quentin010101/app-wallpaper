import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton, IonFab, IonIcon, IonFabList, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, folder, image } from 'ionicons/icons';
import { Filesystem, Directory, Encoding, MkdirOptions, FilesystemDirectory } from '@capacitor/filesystem';

const FOLDER_ROOT = 'my_app_root'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFabButton, IonFab, IonIcon, IonFabList, IonText]
})
export class GalleryPage implements OnInit {
  error: string = ''

  constructor() { 
    addIcons({add, folder, image})
  }

  ngOnInit(): void {
  }

  private addNewFolder(folderName: string){
    this.getExistingFolder()
    let options: MkdirOptions = {
      path: FOLDER_ROOT + "/" + folderName,
      directory: Directory.Documents,
      recursive: false,
    }

    const  createDir = async() => {
      const contents = await Filesystem.mkdir(options)
      .catch((err) => {
        this.error = err
      })
      .then()
    };
    createDir()


    
  }

  getExistingFolder(){
    let options: MkdirOptions = {
      path: FOLDER_ROOT,
      directory: Directory.Documents,
    }
    const  readDir = async() => {
      const contents = await Filesystem.readdir(options)
      .catch((err) => {
        this.error = err
      })
      .then((res)=> console.log(res))
    };
    readDir()
  }

  private readRoot(){
    let options: MkdirOptions = {
      path: FOLDER_ROOT,
      directory: Directory.Documents,
    }
    const  readRoot = async() => {
      const contents = await Filesystem.mkdir(options)
      .catch((err) => {
        console.log("error")
      })
      .then()
    };
    readRoot()
  }

  add(){
    this.addNewFolder("folder7")
  }

}
