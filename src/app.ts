import express from 'express'
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'
import 'dotenv/config'
import usuarioRoute from './routes/usuario.route'


export default class app{
    private express: express.Application
    private porta:number = 9000;

    constructor(){
        this.express = express();
        this.middlewares();
        this.connectDatabase();
        this.routes();
        this.listen();
        
    }

    private listen(): void{
        this.express.listen(this.porta, ()=>{
            console.log(`Servidor rodando na porta ${this.porta}`)
        })
    }

    public getApp() :express.Application{
        return this.express
    }


    private middlewares() : void{
        this.express.use(express.json())
        this.express.use(cors())
    }



    private  async connectDatabase():  Promise<void>{
        try{
            const uri = process.env.MONGO_URI

            if(!uri){
                throw new Error("String de conexão não definida no .env")
            }

            await mongoose.connect(uri)
            console.log("Conectado a o banco com sucesso")

             
        }
        catch(error){
            console.log("Deu ruim na conexão em si")
        }
           
    }

    private routes():void{
        this.express.use('/usuarios', usuarioRoute )
    }


}


