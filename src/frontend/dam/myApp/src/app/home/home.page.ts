import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  consumos: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { } 

  ngOnInit() {
    this.loadConsumos();
  }

  loadConsumos() {
    this.apiService.getConsumos().subscribe({
      next: (data) => {
        this.consumos = data;
      },
      error: (error) => {
        console.error('Error al cargar consumos:', error);
      }
    });
  }

  toggleConsumo(id: number, estado: boolean) {
    const nuevoEstado = estado;
    this.apiService.updateConsumo(id, { estado: nuevoEstado }).subscribe({
      next: () => {
        this.loadConsumos(); 
      },
      error: (error) => {
        console.error('Error al actualizar consumo:', error);
      }
    });
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/details', id]); 
  }

  changeIntensidad(id: number, intensidad: number) {
    this.apiService.updateIntensidad(id, { intensidad }).subscribe({
      next: () => {
        this.loadConsumos();
      },
      error: (error) => {
        console.error('Error al actualizar intensidad:', error);
      }
    });
  }
  
  expandDetails(consumo: any) {
    consumo.expanded = !consumo.expanded;
  }
  
}
