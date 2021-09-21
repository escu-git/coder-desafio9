import {app} from './index.js'

export const pugEngine = () =>{
    app.set('views', '../views');
    app.set('view engine', 'pug');
}