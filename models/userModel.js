import { readJSON } from "../utils/util.js"
import {randomUUID} from 'node:crypto'

const users = readJSON('../users.json')

export class UserModel {

    static getAll = async ()=> {
        return users
    }

    static create = async ({input})=> {
        const newUser = {
            id:randomUUID(),
            ...input
        }
        users.push(newUser)
        return newUser
    }

    static getById = async ({id})=> {
        const user = users.find(user => user.id === id)
        return user
    }

    static delete = async({id}) => {
        const userIndex = users.findIndex(user => user.id === id)

        if(userIndex === -1) return false

        users.splice(userIndex,1)
        return true
    }

    static update = async({id,input}) =>{
        const userIndex = users.findIndex(user => user.id === id)


        if(userIndex === -1) return false

        users[userIndex] = {
            ...users[userIndex],
            ...input
        }

        return users[userIndex]

    }
}