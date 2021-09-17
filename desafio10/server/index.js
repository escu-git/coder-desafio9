import express from 'express';
import { routerProductos, app } from './Routers.js';
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = app.listen(PORT,()=>{
    console.log(`Server is correctly listening on port: ${PORT} ✔`)
});
server.on('error', (err)=>console.log(`Error on server: ${err} ❌`));

app.use('/api', routerProductos);

app.use(express.static('../public'));