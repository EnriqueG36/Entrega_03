const express = require('express');
const app = express();

app.listen(8080, ()=>{
	console.log('Escuchando en el puerto 8080');
})

app.get('/', (request, response)=>{
	response.send('Inicio')
})

app.get('/saludo', (request, response)=>{
	response.send('Hola saludos, shavobot')
})

app.get('/usuario', (request, response)=>{
	response.send({nombre: "Kike", ocupacion: "kokiri"})
})