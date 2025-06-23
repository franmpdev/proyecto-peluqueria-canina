# 🐾 Proyecto Peluquería - Gestión Integral de Mascotas y Negocio

¡Bienvenido/a al **Proyecto Peluquería**!  
Este sistema está diseñado para la **gestión completa de una peluquería de mascotas**, permitiendo administrar clientes, empleados, mascotas, citas, productos, pedidos y mucho más, todo desde una plataforma web moderna y fácil de usar.

---

## 🚀 Características principales

- **Gestión de usuarios**: Registro y autenticación de clientes y empleados.
- **Administración de clientes y empleados**: Alta, baja y modificación.
- **Control de mascotas**: Registro de mascotas asociadas a cada cliente.
- **Gestión de citas**: Reserva, consulta y eliminación de citas para servicios.
- **Inventario de productos**: Alta, modificación y control de stock de productos clasificados por categorías.
- **Gestión de pedidos**: Creación y seguimiento de pedidos de productos.
- **Panel de administración**: Acceso a todas las funcionalidades para el personal autorizado.

---

## 🛠️ Tecnologías utilizadas

- **Backend:** [NestJS](https://nestjs.com/) + [TypeORM](https://typeorm.io/) + MySQL
- **Frontend:** [Angular](https://angular.io/)
- **Base de datos:** MySQL

---

## 📦 Estructura del proyecto

```
Proyecto_peluqueria/
│
├── front-y-back/
│   ├── ANGULAR/           # Frontend Angular
│   └── NEST/              # Backend NestJS
│
├── db/                    # Scripts SQL para la base de datos
└── README.md
```

---

## ✨ ¿Qué puedes hacer con este sistema?

- Registrar y gestionar clientes, empleados y mascotas.
- Reservar y administrar citas para servicios de peluquería.
- Gestionar productos y categorías, controlar el stock y realizar pedidos.
- Visualizar y administrar todos los datos desde un panel centralizado.

---

## 📋 Instalación rápida

1. **Clona el repositorio**
2. **Configura la base de datos** ejecutando el script SQL en tu servidor MySQL.
3. **Instala dependencias** en frontend y backend:
   ```bash
   cd front-y-back/NEST/login_register
   npm install
   cd ../../ANGULAR/my-workspace
   npm install
   ```
4. **Configura los archivos `.env`** si es necesario.
5. **Arranca el backend y el frontend**:
   ```bash
   # Backend
   npm run start
   # Frontend (en otro terminal)
   ng serve
   ```
6. **Accede a la aplicación** desde tu navegador en `http://localhost:4200`.

---

## 🐶 ¡Disfruta gestionando tu peluquería de mascotas de forma profesional y sencilla!

---
Desarrollado con ❤️ por tu equipo de desarrollo.
