import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "src/dto/input/create-user.input";
import { User } from "./models/user";
import {v4 as uuidv4} from 'uuid'
import { UpdataUserInput } from "src/dto/input/update-user.input";
import { GetUserArgs } from "src/dto/args/get-user.args";
import { GetUsersArgs } from "src/dto/args/get-users.args";
import { DeleteUserInput } from "src/dto/input/delete-user.input";

@Injectable()
export class UserService {
    private users: User[] = []

    public createUser(createUserData: CreateUserInput): User {
        const user: User = {
            id:uuidv4(),
            ...createUserData
        }

        this.users.push(user)
        return user
    }

    public updateUser(updataUserData: UpdataUserInput): User {
        const user = this.users.find(user => user.id === updataUserData.id)

        // 合并更新数据
        Object.assign(user, updataUserData)

        return user
    }

    public getUser(getUserArgs: GetUserArgs): User {
        return this.users.find(user => user.id === getUserArgs.id)
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        return getUsersArgs.ids.map(id => this.getUser({id}))
    }

    public getAllUsers(): User[] {
        return this.users;
    }

    public deleteUser(deleteUserData: DeleteUserInput): User {
        const userIndex = this.users.findIndex(user => user.id === deleteUserData.id)

        const user = this.users[userIndex]

        this.users.splice(userIndex)

        return user
    }
}