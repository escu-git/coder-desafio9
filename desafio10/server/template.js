import {app} from './index.js'

export const ejsEngine = () =>{
    app.set('view engine', 'ejs');
}