import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        //validation
        console.log("reqBody : ",reqBody)
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exists"},{status:400})
        }

        console.log("User exists")

        const validPassword = await bcrypt.compare(password, user.password)   //this will return true or false

        if(!validPassword){
            return NextResponse.json({error: "Check your credentials"},{status:400})
        }
        
        // now we will create a token, for the token we require data 
        // token is long encrypted string where we put our payload 
        // payload(data) is a fancy word its just a data like here we named the payload as tokenData

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "Logged in Successfully",
            status: true
        })

        // here in nextJS we have a variable response with type NextResponse we can create our cookies here we have the cookies no need to install natively
        
        response.cookies.set("token", token, {
            httpOnly: true
        })
        
        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}