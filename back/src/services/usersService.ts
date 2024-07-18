import { Request, Response } from "express";
import { loginCredential, newCredentialServices } from "./credentialsService";
import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepository";
import { Credential } from "../entities/Credential";

//Implementar una función que pueda retornar el arreglo completo de usuarios.

    export const getAllUsersServices = async (): Promise <User[]> => {
        const allUsers = await userRepository.find({
            relations: {
                appointment:true,
            }
        });
        return allUsers;
    };


//Implementar una función que pueda crear un nuevo usuario dentro del arreglo PERO ten en cuenta que al momento de crear el usuario, debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales. Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.


    export const createUserServices = async (req:Request, res:Response) => {
        const {name, email, birthdate, nDni, username, password} = req.body;
        const newCredential : Credential = await newCredentialServices(req, res)
        const user = userRepository.create({name, email, birthdate, nDni});
        user.credential = newCredential
        const result = await userRepository.save(user);
        return result;
    };
    
    //Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.
    
    export const getUserByIDServices = async (id_user:number): Promise <User> => {
        const userByID: User | null = await userRepository.findOne({
            where: {id_user},
            relations: {
                appointment:true,
            }
        });
        if(!userByID) throw new Error("Usuarix no entontrado");
        return userByID;
    };

    export const logUserService = async (req:Request, res:Response) => {
        
        const id_credential = await loginCredential(req, res);
        if (id_credential != undefined || id_credential != null) {
            const userLogged = await userRepository.findOne({
                where: {credential: {id: id_credential}}
            }) ;
            return (userLogged);
        }
        return
    };
