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
  //metodo para hacer peticion al backend y obtener lista de tarjetas
  getListTarjetas(): Observable<any> {
    //hacemos la peticion envindole la url mediante nuestra variables
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  //metodo para hacer una solicitud al backend y eliminar tarjeta
  deleteTarjeta(id: number): Observable<any> {
    //hacemos la peticion enviandole la url y el id mediante nuestras variables
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
  //metodo para hacer una solicitud al backend y agregar nueva tarjeta
  saveTarjeta(tarjeta: any): Observable<any> {
    //hacemos la peticion enviandole la url y la tarjeta a guardar mediante nuestras variables
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }
  //metodo para hacer una solicitud al backend y actualizar tarjeta
  updateTarjeta(id: number, tarjeta: any): Observable<any> {
    //hacemos la peticion enviandole la url y la tarjeta a actualizar mediante nuestras variables
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }
}
