import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



const options = {
	"method": "GET",
	"hostname": "hotels4.p.rapidapi.com",
	"port": null,
	"path": "/v2/get-meta-data",
	"headers": {
		"X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
		"X-RapidAPI-Host": "hotels4.p.rapidapi.com",
		"useQueryString": true
	}
};

@Injectable({
  providedIn: 'root'
})



export class PerfilesService {

  constructor(private http: HttpClient) { }
  url = 'https://hotels4.p.rapidapi.com/v2/get-meta-data';
  apiKey = ''; // <-- Enter your own key here!
    /**
  * Get data from the OmdbApi 
  * map the result to return only the results that we need
  * 
  * @param {string} title Search Term
  * @param {SearchType} type movie, series, episode or empty
  * @returns Observable with the search results
  */
     searchData(): Observable<any> {
      return this.http.get(this.url).pipe(map((res: any) => {
        console.log('res', res);
        return res;
    }));
  }
   
    /**
    * Get the detailed information for an ID using the "i" parameter
    * 
    * @param {string} id imdbID to retrieve information
    * @returns Observable with detailed information
    */
    getDetails(id) {
      return this.http.get(`${this.url}?i=${id}&plot=full`);
    }

    
}
