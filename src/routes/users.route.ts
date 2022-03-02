import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

//Listar todos os usuários
usersRoute.get('/users', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
});

//Listar um usuário específico
usersRoute.get('/users/:uuid', async (req: Request<{ uuid:string }>, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.params;
        const user = await userRepository.findById(uuid);
        res.status(StatusCodes.OK).send(user);
    } catch(error) {
        next(error);
    }
});

//Incerindo um usuário
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid = await userRepository.create(newUser);
    res.status(StatusCodes.CREATED).send(uuid);
});

//Alterando um usuário
usersRoute.put('/users/:uuid', async (req: Request<{ uuid:string }>, res: Response, next: NextFunction) => {
    const { uuid } = req.params;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser);
    res.status(StatusCodes.OK).send();
});

//Deletando um usuário
usersRoute.delete('/users/:uuid', async (req: Request<{ uuid:string }>, res: Response, next: NextFunction) => {
    const { uuid } = req.params;
    await userRepository.remove(uuid)
    res.sendStatus(StatusCodes.OK)
});

export default usersRoute;