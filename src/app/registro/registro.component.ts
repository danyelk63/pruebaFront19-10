import { Component, OnInit } from '@angular/core';

//Se instancia un objeto de axios
import axios from "axios";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent implements OnInit {

  //Variables globales, en usuarios se almacenan todos los usuarios registrados
  usuarios: [{"id": "", "nombre": "", "apellido": "", "telefono": "", "direccion": "", "mail": ""}];

  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  mail: string;

  urlApi: string;

  constructor() { }

  //Se inician todas las variables en vacio
  ngOnInit(): void {
    this.nombre = this.apellido = this.telefono = this.direccion = this.mail = this.id = "";
    this.urlApi = "http://localhost:8000/api/";
    this.get();
  }

  //Trae la lista de los usuarios
  async get(){
    var aux;
    await axios.get(this.urlApi + "usuarios").then(function (response) {
      aux = response.data;
    });
    this.usuarios = aux;
  }

  //Agrega nuevos usuarios
  async post(){
    if(this.nombre != "" && this.apellido != "" && this.direccion != "" && this.telefono != "" && this.mail != "")
      await axios.post(this.urlApi + "usuarios?nombre=" + this.nombre + "&apellido=" + this.apellido + "&mail=" + this.mail + "&direccion=" + this.direccion + "&telefono=" + this.telefono).then(function (response) {
      })
    else
      alert("Al registrar un usuario todos los campos deben estar llenos excepto el id")
    this.get();
  }

  //Modifica los usuarios existentes  
  async put(){
    var usuario = this.usuarios.find(usuario => usuario.id == this.id);
    await axios.put(this.urlApi + "usuarios/" + this.id + "?nombre=" + (this.nombre == "" ? usuario.nombre: this.nombre) + "&apellido=" + (this.apellido == "" ? usuario.apellido: this.apellido) + "&mail=" + (this.mail == "" ? usuario.mail: this.mail) + "&direccion=" + (this.direccion == "" ? usuario.direccion: this.direccion) + "&telefono=" + (this.telefono == "" ? usuario.telefono: this.telefono)).then(function (response) {
    })
    this.get();
  }

  //Elimina un usuario
  async delete(id) {
    await axios.delete(this.urlApi + "usuarios/" + id).then(function (response) {
    })
    this.get();
  }

  agregarModificar(){
    if(this.id == "")
      this.post();
    else
      if(this.usuarios.find(usuario => usuario.id == this.id) != undefined)
        this.put();
      else
        alert("El usuario no existe");
      
  }

  eliminar(id){
    this.delete(id);
  }

}
