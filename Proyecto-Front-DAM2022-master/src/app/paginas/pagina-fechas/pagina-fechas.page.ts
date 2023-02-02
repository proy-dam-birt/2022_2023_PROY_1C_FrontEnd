import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provincias, RespuestaProvincias, Reserva } from './../../interfaces/interfaces';



@Component({
  selector: 'app-pagina-fechas',
  templateUrl: './pagina-fechas.page.html',
  styleUrls: ['./pagina-fechas.page.scss'],
})
export class PaginaFechasPage implements OnInit {
  provincias: Provincias[] = [];
  respuesta: Observable<RespuestaProvincias>;
  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;
  listaPerfiles: Reserva[] = [];

  public dateValueInicio: any;
  dateTime: string = new Date().toISOString();
  public dateValueFinal : any;

  constructor(private obtenerPerfiles: HttpClient) { 
    this.dateTime = (new Date()).toISOString();
    this.cargarFichero(); 
  }

  get dateInicio(): any {
    return this.dateValueInicio;
  }
  set dateInicio(valueInicio: any) {
    console.log({ valueInicio });
    this.dateValueInicio = valueInicio;
  }

  get dateFinal(): any {
    return this.dateValueFinal;
  }
  set dateFinal(valueFinal: any) {
    console.log({ valueFinal });
    this.dateValueFinal = valueFinal;
  }


  private cargarFichero() {

    let respuesta: Observable<RespuestaProvincias> = this.obtenerPerfiles.get<RespuestaProvincias>("/assets/ciudades.json");

    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      this.provincias.push(...resp.ciudades);
      console.log(this.provincias);
    } );
  }

//Aquí se indicará la api necesaria para recolectar los datos
  private cargarPerfiles(fecha: Date, localidad: string) {
    let respuesta: Observable<Reserva> = this.obtenerPerfiles.get<Reserva>("https://newsapi.org/v2/top-headlines?category=" + fecha + localidad + "&apiKey=" + this.apiKey);

    respuesta.subscribe( resp => {
      // console.log("Noticias", resp);
      this.listaPerfiles.push(resp);
    } );
  }

  ngOnInit() {
    this.dateTime = (new Date()).toISOString();
  }

}
