import { Component, Input, OnInit } from '@angular/core';
import { Folder } from 'src/app/interfaces/image.interface';
import { IonCard, IonTitle, IonContent, IonIcon, IonCardTitle, IonCardSubtitle, IonCardHeader } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { folder, folderOpen} from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonTitle, IonContent, IonIcon, IonCardTitle, IonCardSubtitle, IonCardHeader, RouterModule]
})
export class FolderComponent  implements OnInit {
  @Input() folder!: Folder

  constructor() { 
    addIcons({folder, folderOpen})
    
  }

  ngOnInit() {}



}
