import mongoose from 'mongoose';
import UserModel from '../../Database/User.schema'

class Users{
    constructor(){}

    createUser(user){
        var newUser = new UserModel(user);
        return newUser.save(user);
    }
}

module.exports = new Users();