import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title:"swing noges API",
            description: "API documentation with swagger for managing notes with authentication (JWT) and NeDB database",
            version:"1.0.0"
        },
   
        
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT",
                },
            },
        },
        security:[{bearerAuth:[]}],
    },
    apis: ['./routes/userRoutes.js', './routes/noteRoutes.js']
};

const swaggerInfo=swaggerJSDoc(swaggerOptions);

export default swaggerInfo;