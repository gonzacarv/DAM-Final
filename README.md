# Desarrollo de Aplicaciones Multiplataforma
Repositorio con el proyecto final de la materia DAM de la CEIoT de la FiUBA.

**Alumno:** Gonzalo Carvallo (gonzacarv@gmail.com)

## Descripción del Proyecto
Este proyecto es un sistema domótico desarrollado con Angular e Ionic que permite controlar dispositivos electrónicos del hogar. Permite a los usuarios visualizar, controlar y programar dispositivos tanto individualmente como en grupos.

## Características del Sistema
- **Visualización y Control**: Los usuarios pueden listar consumos o grupos de dispositivos. Pueden controlar tanto el estado de encendido como la intensidad de 0% a 100%.
- **Programación de Dispositivos**: Interfaz para programar los horarios de operación usando modales de Ionic.
- **Gestión de Usuarios**: Control y acceso seguro mediante una base de datos de usuarios.

## Tecnologías Utilizadas
- **Frontend**: Angular 11, Ionic 5
- **Backend**: Node.js, Express
- **Base de Datos**: MySQL
- **Orquestación**: Docker

## Estructura del Proyecto
Descripción breve de cómo se organiza el código en el proyecto:

### Cumplimiento de Requisitos
- **Directivas Estructurales**: Implementadas con `ngIf` y `ngFor` en varios componentes del sistema para renderizado condicional y listas dinámicas.
- **Directiva de Atributo**: `CustomHighlightDirective` en `/src/app/directives` para cambiar estilos dinámicamente basados en el estado del dispositivo.
- **Pipe Custom**: `MayusculasPipe` en `/src/app/pipes` para transformar textos a mayúsculas.
- **Servicio para la API**: `ApiService` en `/src/app/services` para manejar todas las interacciones con el backend.
- **API en Express**: Backend en Node.js que maneja la lógica de negocio y la comunicación con la base de datos MySQL.

## Configuración y Ejecución con Docker
Se utiliza Docker para facilitar la configuración y ejecución del proyecto. Aquí está el `docker-compose.yml` utilizado para levantar los servicios necesarios.

