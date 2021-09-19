import express from 'express';
import { product } from './newProduct.js';
export const routerProductos = express.Router();
export const productos=[];

routerProductos.get('/productos/vista', (req, res)=>{
    try{
    if(productos.length != 0) {
        res.render('main', {products: productos, exist:true})
    }else{
        res.render('main', {exist:false})
    }
    }catch(err){
        res.status(400).json({error:err})
    }
})

routerProductos.get('/productos/listar', (req, res)=>{
    try{
        if(productos.length == 0){
            return res.status(400).json({error:'No hay productos para mostrar'})
        }else{
            return res.status(200).json({data:productos})
        }
    }catch(err){
        console.log(err)
        res.status(400).json({err:err})
    }
});

routerProductos.get('/productos/listar/:id', (req, res)=>{
    try{
        const productId = req.params.id;
        const showProduct = productos.find(x=>x.id == productId)
        showProduct == undefined ? res.status(400).json({err:`Product ${productId} does not exist`}) : res.status(200).json({data:showProduct})
    }catch(err){
        res.status(400).json({err:err})
    }
});

routerProductos.post('/productos/guardar', (req, res)=>{
   try{ 
    const {title, price, thumbnail}=req.body;
    const newProduct = new product(title, price, thumbnail);
    productos.length < 1 ? newProduct.productId(0) : newProduct.productId(productos.length)
    productos.push(newProduct)
    return res.status(200).json({data:newProduct, allProducts:productos})
    }catch(err){
        console.log(err)
    }
});

routerProductos.put('/productos/update', (req, res)=>{
    try{
        const {id} = req.body;
        const productIndex = productos.findIndex(x=>x.id == id);
        const productAttributes = Object.entries(req.body)
        productAttributes.forEach(x=>{
            let attr = x[0];
            let newValue = x[1];
            if(x !== null){
                productos[productIndex][attr] = newValue
            }
        })
        res.status(200).json({modifiedProduct:productos[productIndex], allProducts:productos })
    }catch(err){
        res.status(400).json({error: err})
    }
})

routerProductos.delete('/productos/delete/:id', (req, res)=>{
    try{
        const idRequested = req.params.id;
        const productIndex = productos.findIndex(x=> x.id == idRequested);
        const deletedProduct = () => {
            productos.splice(productIndex,1)
            res.status(200).json({deletedProduct:productos[productIndex], allProducts:productos})
        }
        productIndex == undefined ? 
        res.status(400).json({error:``}) : deletedProduct()
    }catch(err){
        res.status(400).json({err:err})
    }
})