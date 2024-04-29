import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) {}

  getConsumos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/consumos`);
  }

  getGrupo(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/grupos/${id}`);
  }

  getGrupos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/grupos`);
  }

  updateConsumo(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/consumos/${id}`, payload);
  }

  updateGrupo(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/grupos/${id}`, payload);
  }
  
  getDetalle(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/consumos/${id}`);
  }

  updateIntensidad(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/consumos/${id}/intensidad`, data);
  }
  
  scheduleDevice(deviceId: number, schedule: { start: string, end: string }) {
    return this.http.post(`${this.baseUrl}/programacion_horaria`, { consumo_id: deviceId, inicio: schedule.start, fin: schedule.end });
}

  scheduleGroup(id: number, schedule: { start: string, end: string }) {
    return this.http.post(`${this.baseUrl}/programacion_grupos/${id}`, schedule);
  }
}
