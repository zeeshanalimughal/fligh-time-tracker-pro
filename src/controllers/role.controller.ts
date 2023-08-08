import { NextFunction, Request, Response } from 'express';
import { jsonAll } from '../utils/general';
import Role from '../models/role';

//CREATE AUTOMATIC ROLE AT FIRST WHEN WE CREATE NEW DB
export async  function crateRole() {
    try{
    const count = await Role.estimatedDocumentCount()
        if ( count === 0) {
                const roleUser = new Role({
                    name: 'user',
                });
                 roleUser.save();
                 const roleAdmin = new Role({
                    name: 'admin',
                })
                roleAdmin.save();
                console.log("Added User and Admin to Roles collection!")
            }
        }catch(err){
            console.log('error', err);
        }
}

//EXPORT
export default {
    crateRole,
};
