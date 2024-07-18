import app from "./server";
import {PORT} from "./config/envs"
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(()=>{
    console.log("base de datos conectada");
    app.listen(PORT, ()=>{
        console.log(`Server listening on ${PORT}`);
    });
})
.catch((error)=>console.log(error));
