//Entrega 3 Servidor con express
const express = require('express')                          //Importamos el modulo express
const {ProductManager} = require('./ProductManager.js');    //Importamos la clase productManager

const product = new ProductManager('./data.json')         //Instanciamos la clase product manager

//Iniciamos nuestro servidor con express
const app = express();

//Configuración del puerto
app.listen(8080, ()=>{
	console.log('Escuchando en el puerto 8080');
})

//URL encoder
app.use(express.urlencoded({extended: true}));

//Endpoints
app.get('/products/:pid/', (request, response)=>{

    const productId = request.params.pid;                                       //Esta variable almacena el id introducido por request.params
    product.getProductById(productId).then(result => {                          
       
        response.send(result);                                                  //Respondemos con el resultado de la promesa
    });                  

})

app.get('/products', (request,response)=>{
    product.getProducts().then(result => {                                      //Aquí leemos nuestro archivo de productos y guardamos todo el contenido en result
    let notAllProducts = [];                                                    //Este arreglo vacia contendrá la cantidad de items a mostrar, en caso de que se usen request.query
    let itemLimit = request.query.limit                                         //Esta variable guarda el request.query

    if (itemLimit > result.length) itemLimit = response.length;                 //Si el query introducido fuera mayor que el largo del arreglo de productos, lo limitaremos a su propiedad length
   
    if (itemLimit == 0 || itemLimit == null)    response.send(result);          //Si no se introdujo request.query o es igual a 0, mostrará todos los productos 
    else{                                                                       //De otra forma copiamos los elementos del arreglo allProducts a notAllProducts hasta el limite solicitado
        for (i = 0; i < itemLimit; i++)
        {
            notAllProducts[i] = result[i];
        }

        response.send(notAllProducts);                                          //Respondemos con el nuevo arreglo
    }
});
   
})

