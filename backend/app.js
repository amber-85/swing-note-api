import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";

// import swaggerInfo
import swaggerInfo from "./swagger.js"


// import router for user and for notes
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import cors from "cors";


const PORT=process.env.PORT || 8091;
const app=express();
const corsOptions={
  origin: "http://localhost:5173", //allow frontend origin to access the backend
  methods: ["GET", "POST", "PUT", "DELETE"], //allow there methods
  allowedHeaders: ["Content-Type", "Authorization"], //allowed headers
  preflightcontinue:false, //stop the preflight from continuing to other middleware
  optionsSuccessStatus: 204, //success status for preflight
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/user",userRoutes);
app.use("/api/notes",noteRoutes);
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerInfo));

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})

