import { Request, Response } from "express";
import usuarioModel from "../models/usuario.model";

class UsuarioController{
    public async cadastrar(req: Request, res: Response): Promise<Response>{
        try{
        const usuario = await usuarioModel.create(req.body)

        return res.status(200).json({
            message:"Usuário Cadastrado com Sucesso",
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar
        })
        
        }catch(error){
            return res.status(401).json({message: error})
        }
    }
}




export default new UsuarioController()