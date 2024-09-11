import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  //variable que indican el servidor y la API que se van a usar
  private myAppUrl = 'https://localhost:7180/';
  private myApiUrl = 'api/tarjeta/';

  constructor(private http: HttpClient) {}
  //servicio para hacer peticion al backend
  getListTarjetas(): Observable<any> {
    //hacemos la peticion envindole la url mediante nueztra variables
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  //servicio para hacer peticion al backend
  deleteTarjeta(id:number): Observable<any> {
    //hacemos la peticion enviandole la url y el id mediante nuestras variables
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
}
