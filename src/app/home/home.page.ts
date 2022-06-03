import { Component, NgZone, OnInit } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { ToastController } from '@ionic/angular';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ngOnInit(): void {
    this.Scan();
  }
  devices:any[] = [];
  
  constructor
    (
      private ble: BLE,
      private ngZone: NgZone,
      public backgroundMode: BackgroundMode,
      public toastController: ToastController
    ) 
  {
    this.Scan();
  }
  Scan() {

    this.presentToast();
    this.devices = [];
    this.ble.scan([], 15).subscribe(
      device => this.onDeviceDiscovered(device)
    );
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  Scan2(){
    this.devices = [];
    this.backgroundMode.enable()
    this.backgroundMode.on('activate').subscribe(()=>{
      this.ble.scan([], 15).subscribe(
        device => this.onDeviceDiscovered(device)
      );
    });
    
  }
  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
  }

}
