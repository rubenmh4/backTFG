import z from 'zod'

const userSchema = z.object({
    username:z.string({required_error:"USername is required"}),
    email:z.string().email(),
    //password:
    name:z.string(),
    firstName:z.string(),
    position:z.string().default('--'),
    league:z.string().default('--'),
    isChat:z.boolean().default(false),
})

export const validateUser = (input) =>{
    return userSchema.safeParse(input)
} 

export const validatePartialUser = (input)=> {
    return userSchema.partial().safeParse(input)
}