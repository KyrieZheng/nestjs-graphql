import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetUserArgs } from "src/dto/args/get-user.args";
import { GetUsersArgs } from "src/dto/args/get-users.args";
import { CreateUserInput } from "src/dto/input/create-user.input";
import { DeleteUserInput } from "src/dto/input/delete-user.input";
import { UpdataUserInput } from "src/dto/input/update-user.input";
import { User } from "./models/user";
import { UserService } from "./user.service";
@Resolver(() => User)
export class UserResolver {
    constructor (private readonly userService: UserService) {
        
    }

    @Query(() => User, { name: 'getUser', nullable: true })
    getUser(@Args() getUserArgs: GetUserArgs) : User {
        return this.userService.getUser(getUserArgs)
    }

    @Query(() => [User], { name: 'getUsers', nullable: true})
    getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
        return this.userService.getUsers(getUsersArgs)
    }

    @Query(() => [User], {name:"getAllUsers", nullable:true})
    getAllUser(): User[] {
        return this.userService.getAllUsers()
    }

    @Mutation(() => User)
    createUser(@Args('createUserData') createUserData: CreateUserInput): User {
        return this.userService.createUser(createUserData)
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserData') updateUserData: UpdataUserInput): User {
        return this.userService.updateUser(updateUserData)
    }

    @Mutation(() => User)
    deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
        return this.userService.deleteUser(deleteUserData)
    }
}