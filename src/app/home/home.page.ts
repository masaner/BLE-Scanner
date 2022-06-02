import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  devices:any[] = [];
  
  constructor(private ble:BLE,private ngZone: NgZone,public backgroundMode : BackgroundMode) 
  {
    this.Scan();
  }
  Scan() { 
    this.devices = [];
    this.ble.scan([], 15).subscribe(
      device => this.onDeviceDiscovered(device)
    );
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
