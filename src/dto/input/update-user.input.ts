import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdataUserInput{
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    email: string

    @Field({nullable:true})
    isSubscribe: boolean
}