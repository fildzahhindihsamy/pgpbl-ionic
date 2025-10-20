import { Component, OnInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: false,
})
export class MapsPage implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private alertController = inject(AlertController);

  map!: L.Map;
  markerLayer = L.layerGroup();

  constructor() { }

  async loadPoints() {
    this.markerLayer.clearLayers();
    const points: any = await this.dataService.getPoints();
    for (const key in points) {
      if (points.hasOwnProperty(key)) {
        const point = points[key];
        const coordinates = point.coordinates.split(',').map((c: string) => parseFloat(c));
        const marker = L.marker(coordinates as L.LatLngExpression);
        marker.bindPopup(`<b>${point.name}</b><div style="display: flex; justify-content: center; gap: 10px; padding: 0 10px; min-width: 100px;"><ion-button id="edit-btn-${key}" color="warning" fill="clear"><ion-icon style="color:orange;" name="pencil-sharp"></ion-icon></ion-button><ion-button id="delete-btn-${key}" color="danger" fill="clear"><ion-icon style="color:red;" name="trash-outline"></ion-icon></ion-button></div>`);
        this.markerLayer.addLayer(marker);
      }
    }
    this.markerLayer.addTo(this.map);
  }

  async deletePoint(key: string) {
    await this.dataService.deletePoint(key);
    this.map.closePopup();
    this.loadPoints();
  }

  async presentDeleteConfirm(key: string) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Apakah Anda yakin ingin menghapus titik ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Hapus',
          handler: () => {
            this.deletePoint(key);
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    if (!this.map) {
      setTimeout(() => {
        this.map = L.map('map').setView([-7.7956, 110.3695], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);

        this.loadPoints();

        this.map.on('popupopen', (e) => {
          const popup = e.popup;
          const content = popup.getContent();
          if (typeof content === 'string') {
            const deleteMatch = content.match(/id="delete-btn-([^"]*)"/);
            if (deleteMatch && deleteMatch[1]) {
              const key = deleteMatch[1];
              const deleteBtn = popup.getElement()?.querySelector(`#delete-btn-${key}`);
              if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                  (document.activeElement as HTMLElement).blur();
                  this.presentDeleteConfirm(key);
                });
              }
            }

            const editMatch = content.match(/id="edit-btn-([^"]*)"/);
            if (editMatch && editMatch[1]) {
              const key = editMatch[1];
              const editBtn = popup.getElement()?.querySelector(`#edit-btn-${key}`);
              if (editBtn) {
                editBtn.addEventListener('click', () => {
                  (document.activeElement as HTMLElement).blur();
                  this.router.navigate(['/edit-point', key]);
                });
              }
            }
          }
        });
      });
    }
  }
}
