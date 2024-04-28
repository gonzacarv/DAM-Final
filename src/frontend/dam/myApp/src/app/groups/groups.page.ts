import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  grupos: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { } 

  ngOnInit() {
    this.loadGrupos();
  }

  loadGrupos() {
    this.apiService.getGrupos().subscribe({
      next: (data) => {
        this.grupos = data;
      },
      error: (error) => {
        console.error('Error al cargar consumos:', error);
      }
    });
  }

  toggleConsumo(id: number, estado: boolean) {
    const nuevoEstado = estado;
    this.apiService.updateGrupo(id, { estado: nuevoEstado }).subscribe({
      next: () => {
        this.loadGrupos(); 
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
        this.loadGrupos();
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
