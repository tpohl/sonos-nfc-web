import { ParticleConfiguration } from '../models/ParticleConfiguration';
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-device-manage-component',
  templateUrl: './device-manage-component.component.html',
  styleUrls: ['./device-manage-component.component.css']
})
export class DeviceManageComponentComponent implements OnInit {

  configuration: ParticleConfiguration = new ParticleConfiguration();
  playlist: String;
  room: String;

  // Inject HttpClient into your component or service.
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // subscribe to router event to get information about the particle
    const params = this.activatedRoute.snapshot.queryParams;

    const deviceId = params['deviceId'];
    this.configuration.deviceId = deviceId;

    const token = params['token'];
    this.configuration.token = token;

    this.configuration.incomplete = !this.configuration.token || !this.configuration.deviceId;
    if (!this.configuration.incomplete) {
      this.loadRoomName();
    }
  }

  public requestTagWrite(playlistName: String): Observable<any> {
    const body = { arg: playlistName };
    const url = 'https://api.particle.io/v1/devices/' + this.configuration.deviceId + '/tag';
    const headers = { 'Authorization': 'Bearer ' + this.configuration.token };
    const request$ = this.http.post(url, body, { headers: headers });
    return request$;
  }

  public writeTag(): void {
    console.log('Should write Tag', this.configuration);
    const request$ = this.requestTagWrite(this.playlist);
    request$.subscribe();
  }

  public loadRoomName(): void {
    const url = 'https://api.particle.io/v1/devices/' + this.configuration.deviceId + '/room';
    const headers = { 'Authorization': 'Bearer ' + this.configuration.token };
    const request$ = this.http.get(url, { headers: headers });
    request$.subscribe(
      data => {
        this.room = data['result'];
      },
      error => {
        console.log('ERROR gettin Variable', error);
      }
    );
  }
  public writeRoomName(): void {
    const url = 'https://api.particle.io/v1/devices/' + this.configuration.deviceId + '/room';
    const headers = { 'Authorization': 'Bearer ' + this.configuration.token };
    const body = { arg: this.room };
    const request$ = this.http.post(url, body, { headers: headers });
    request$.subscribe(
      data => {
        console.log('Success writing Room', data);
        this.loadRoomName();
      },
      error => {
        console.log('ERROR writing Variable', error);
      }
    );
  }
}
