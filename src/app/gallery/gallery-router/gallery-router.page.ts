import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-gallery-router',
  templateUrl: './gallery-router.page.html',
  styleUrls: ['./gallery-router.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonRouterOutlet]

})
export class GalleryRouterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
