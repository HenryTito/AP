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
            avatar: usuario.avatar,
            
        })
        
        }catch(error){
            return res.status(401).json({message: error})
        }
    }




    public async autenticar(req:Request, res:Response):Promise<Response>{
            const {nome, senha} = req.body;
            const usuario = await usuarioModel.findOne({nome : nome})

            if(!usuario){
                return res.status(400).json({
                    message:"Usuário não encontrado"
                })




            }
            const senhaValida = await usuario.compararSenhas(senha);

            if(!senhaValida){
                return res.status(400).json({
                    message:"Senha inválida"
                })
            }

            return res.json({
                usuario:usuario,
                token: usuario.gerarToken()
            
            
            
            })


    }
}




export default new UsuarioController()