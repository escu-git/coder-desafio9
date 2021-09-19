import express from 'express';
import { routerProductos} from './Routers.js';
import { handlebarsEngine } from './handlebars.js';
export const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('../public'));
app.use('/api', routerProductos);

const server = app.listen(PORT,()=>{
    console.log(`Server is correctly listening on port: ${PORT} ✔`)
});
server.on('error', (err)=>console.log(`Error on server: ${err} ❌`));



handlebarsEngine() //Handlebars config

