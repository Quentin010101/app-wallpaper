import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton, IonFab, IonIcon, IonFabList, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, folder, image,remove} from 'ionicons/icons';
import { GalleryService } from '../services/gallery.service';
import { Folder } from '../interfaces/folder.interface';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFabButton, IonFab, IonIcon, IonFabList, IonText]
})
export class GalleryPage  {
  folderId: number[] = []

  constructor(private _galleryService: GalleryService) {
    addIcons({add, folder, image,remove})
  }


  add(){
    console.log("add")
    this._galleryService.addFolder()
  }

  get(){
    console.log("get")
   this._galleryService.getFolder()?.then((res : Folder[])=> {
     let arr:number[] = []
    if(res) res.forEach(el=> arr.push(el.nb))
    this.folderId = arr
   })
  }

  clear(){
    this._galleryService.clear()
  }

}
