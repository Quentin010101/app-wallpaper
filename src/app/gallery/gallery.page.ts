import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton, IonFab, IonIcon, IonFabList, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, folder, image } from 'ionicons/icons';
import { Filesystem, Directory, Encoding, MkdirOptions, FilesystemDirectory } from '@capacitor/filesystem';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFabButton, IonFab, IonIcon, IonFabList, IonToast]
})
export class GalleryPage implements OnInit {

  constructor() { 
    addIcons({add, folder, image})
  }
  ngOnInit(): void {
  }

  addFolder2(){
    console.log("test")
    let options: MkdirOptions = {
      path: "folder1",
      directory: Directory.Documents,
      recursive: false,
    }

    async function createDir() {
      const contents = await Filesystem.mkdir(options)
    };
    createDir()

    
  }

  addFolder(){


    async function createDir() {
      const contents = await Filesystem.getUri({
        path: "folder1",
        directory: Directory.Documents
      }).then(res => console.log(res.uri))
    };
    createDir()

    
  }

}
