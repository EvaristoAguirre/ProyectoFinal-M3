import { Request, Response } from "express";
import { Credential } from "../entities/Credential";
import { credentialRepository } from "../repositories/credentialRepository";
import { error } from "console";

// Implementar una función que reciba username y password y cree un nuevo par de credenciales con estos datos. Debe retornar el ID del par de credenciales creado.

export const newCredentialServices = async (req:Request, res:Response): Promise <Credential> => {
  const {username, password} = req.body;
  console.log(username, password);
  const credential:Credential = credentialRepository.create({username, password});
  const newCredential = await credentialRepository.save(credential);
  return newCredential;
};

// crear middleware que evalue si me mandan el dato de usuario. 

export const loginCredential = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400).json({ message: "Faltan datos" });
  }
  if (!password) {
    res.status(400).json({ message: "Faltan datos" });
  };
  const findedUsername = await credentialRepository.findOne({
    where: {username}
  })

  
  if(findedUsername) {
    if(findedUsername.password===password) {
      const id_credential = findedUsername.id;
      return id_credential;
    }
  }
  return
};
