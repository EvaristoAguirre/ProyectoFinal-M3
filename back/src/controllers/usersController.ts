import { Request, Response} from "express";
import {getAllUsersServices, getUserByIDServices, createUserServices, logUserService} from "../services/usersService";
import {User} from '../entities/User';


export const getAllUsers = async (req:Request,res:Response) => {
    try {
        const users: User[] = await getAllUsersServices();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: `error: ${error}`})
    }
};

export const getUserById = async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const userById: User = await getUserByIDServices(Number(id));
        res.status(200).json(userById)
    } catch (error) {
        res.status(400).json({message: `error: ${error}`})
    }
};

export const usersRegister = async (req:Request,res:Response) => {
    try {
        const {name, email, birthdate, nDni,username, password} = req.body
        console.log(username, password, "primer control")
        const newUser: User = await createUserServices(req, res);
        res.status(200).json({message: "Usuarix registradx"})
    } catch (error) {
        res.status(400).json({message: "Los datos ingresados son incorrectos"})
    }
};

export const userLogin = async (req:Request,res:Response) => {
    try {
        const userLogged = await logUserService(req, res)
        if(userLogged){
            const statusUserLogged = {
                login:true,
                userLogged,
                }
            console.log(userLogged)
            res.status(200).json(statusUserLogged);
        }
        if(!userLogged){
            res.status(400).json({message: "Datos incorrectos"})
        }
    } catch (error) {
        res.status(400).json({message: "Datos incorrectos"})
    }
};


