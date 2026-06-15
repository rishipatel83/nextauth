import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        console.log("reqBody in verifyemail : ", reqBody)
        const { token } = reqBody
        console.log(token)
        // assuming we got the token no edge cases here

        const user = await User.findOne({verifyToken: token, 
            verifyTokenExpiry: {$gt: Date.now()} //* is this a aggregation pipeline
        })

        if(!user){
            return NextResponse.json({error: "Invalid token no user with the token "},{status: 400})
        }
        console.log("user got on verifyEmail : ", user)

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        //todo: learn more about the NextResponse

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        },{status: 200})
        
    } catch (error: any) {
        return NextResponse.json({error: `error while verifying email ${error.message}`},{status: 500})
    }
}