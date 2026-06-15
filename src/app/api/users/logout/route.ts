import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'

connect()

// why do we used get here although we could use the post also learn about it
export async function GET(request:NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        // learn and use about the delete in place of the set 
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}