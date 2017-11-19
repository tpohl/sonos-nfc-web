import { ParticleConfiguration } from '../models/ParticleConfiguration';
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-device-manage-component',
  templateUrl: './device-manage-component.component.html',
  styleUrls: ['./device-manage-component.component.css']
})
export class DeviceManageComponentComponent implements OnInit {

  configuration: ParticleConfiguration = new ParticleConfiguration();
  playlist: String;

  // Inject HttpClient into your component or service.
  constructor(private activatedRoute: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    // subscribe to router event to get information about the particle
    const params = this.activatedRoute.snapshot.queryParams;

    const deviceId = params['deviceId'];
    this.configuration.deviceId = deviceId;

    const token = params['token'];
    this.configuration.token = token;

    this.configuration.incomplete = !this.configuration.token || !this.configuration.deviceId;
  }

  public requestTagWrite(playlistName: String): Observable<any> {
    const body = { arg: playlistName };
    const url = 'https://api.particle.io/v1/devices/' + this.configuration.deviceId + '/tag';
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.configuration.token);
    const request$ = this.http.post(url, body, { headers: headers });
    return request$;
  }

  public writeTag(): void {
    console.log('Should write Tag', this.configuration);
    const request$ = this.requestTagWrite(this.playlist);
    request$.subscribe();
  }

}
