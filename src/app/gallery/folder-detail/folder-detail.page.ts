import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GalleryService } from 'src/app/services/gallery.service';
import { ActivatedRoute, Route, Routes } from '@angular/router';
import { Folder } from 'src/app/interfaces/image.interface';

@Component({
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.page.html',
  styleUrls: ['./folder-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FolderDetailPage implements OnInit {
  private folderId!: number
  folder!: Folder

  constructor(private _galleryService: GalleryService, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.folderId = parseInt(id)
      this._galleryService.$folders.subscribe(folders => {
        this.findRightFolder(this.folderId, folders)
      })
    }
  }

  private findRightFolder(folderId: number, folders:Folder[]){
    let folder: Folder | null = null
    for(let i = 0; i < folders.length; i++){
      if(folderId === folders[i].id){
        folder = folders[i]
        break;
      }
    }
    if(folder)
    this.folder = folder
  }

  ngOnInit() {
  }

}
