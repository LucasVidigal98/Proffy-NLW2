import { Request, Response } from 'express';

import db from '../database/connection';

export default class UsersController{
    async index(request:Request, response:Response){
        const users = await db('users')
            .select('*');

        response.json(users);
    }

    async filterIndex(request:Request, response:Response){
        const { id } = request.query;

        const userInfo = await db('users')
            .select(['users.name', 'users.middlename', 'users.avatar', 'users.email', 'users.whatsapp', 'users.bio'])
            .where('users.id', '=', id as unknown as number);
        
        response.json(userInfo[0]);
    }

    async create(request:Request, response:Response){
        const {
            name,
            middlename,
            email,
            passwd,
        } = request.body;

        const avatar = 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png';
        const whatsapp = '';
        const bio = '';

        try{
            const checkIfEmailExists = await db('users')
                .select('id')
                .where('email', '=', email);

            if(checkIfEmailExists.length > 0){
                response.status(409).json('Email já cadastrado');
            }else{
                await db('users').insert({
                    name,
                    middlename,
                    email,
                    passwd,
                    whatsapp,
                    avatar,
                    bio
                });

                response.status(201).json('Criado com sucesso!');
            }

        }catch(err){
            response.status(409).json(err);
        }
    }

    async update(request:Request, response:Response){
        const {
            id,
            name,
            middlename,
            email,
            whatsapp,
            bio
        } = request.body;

        try{

            const checkIfEmailExists = await db('users')
                .select('id')
                .where('id', '<>', id)
                .where('email', '=', email);

            if(checkIfEmailExists.length > 0){
                response.status(409).json('Email já cadastrado');
            }else{
                await db('users').update({
                    name,
                    middlename,
                    email,
                    whatsapp,
                    bio
                }).where('id', '=', id);

                response.status(200).json('Dados atualizados');
            }

        }catch(err){
            response.status(404).json(err);
        }
    }

    async login(request:Request, response:Response){
        const {
            email,
            passwd
        } = request.query;

        const userId = await db('users')
            .select('id')
            .where('email' , '=', email as string)
            .where('passwd', '=', passwd as string);
        
        if(userId.length === 0){
            response.status(409).json('Email ou senha Inválidos');
        }else{
            response.status(200).json(userId[0].id);
        }
    }
}