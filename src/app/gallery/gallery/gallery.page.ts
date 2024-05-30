import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton, IonFab, IonIcon, IonFabList, IonText, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, folder, image,remove} from 'ionicons/icons';
import { GalleryService } from '../../services/gallery.service';
import { Folder } from '../../interfaces/image.interface';
import { FolderComponent } from '../folder/folder.component';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFabButton, IonFab, IonIcon, IonFabList, IonText, IonToast, FolderComponent]
})
export class GalleryPage  {
  folderId: number[] = []
  isToastOpen: boolean = false
  isToastVOpen: boolean = false
  toastMessage: string = ''
  toastVMessage: string = ''
  folders: Folder[] = []

  constructor(private _galleryService: GalleryService) {
    addIcons({add, folder, image,remove})
    _galleryService.$galleryErrorSubject.subscribe(text => {
      this.toastMessage = text
      this.isToastOpen = true
    })
    _galleryService.$galleryValidationSubject.subscribe(text => {
      console.log("eee")
      this.toastVMessage = text
      this.isToastVOpen = true
    })
    _galleryService.$folders.subscribe((folders) => {
      this.folders = folders
    })
  }

  setToastOpen(){
    this.isToastOpen = false
  }
  setToastVOpen(){
    this.isToastVOpen = false
  }

  addFolder(){
    this._galleryService.newFolder()
  }

  addImage(){
    this._galleryService.newImage(1)
  }


  clear(){
    this._galleryService.clear()
  }

  get(){}



}
