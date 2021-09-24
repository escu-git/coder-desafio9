import {app} from './index.js'
import handlebars from 'express-handlebars';

export const handlebarsEngine = (express) =>{
    app.engine(
        "hbs",
        handlebars({
            helpers:{
                log:function(x){console.log(x)}
            },
            extname: '.hbs',
            defaultLayout:'../layouts/index.hbs',
            layoutsDir:"../views/layouts",
            partialsDir:"../views/partials",          
        })
        
    );
    app.set('views', '../views');
    app.set('view engine', 'hbs');
}