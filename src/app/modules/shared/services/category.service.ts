import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * obtiene las categorias por estado true
   */
  getCategoriesStatus(status: boolean) {
    const endpoint = `${base_url}/categories/status/${status}`;
    return this.http.get(endpoint);
  }

}
