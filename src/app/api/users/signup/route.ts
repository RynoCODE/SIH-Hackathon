import dbconnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

dbconnect();

export default async function POST (request: NextRequest){
    try{
        const reqbody = await request.json();
        const {username, email, password} = reqbody;
        console.log(reqbody);


        //check if user already exists
        const user = await User.findOne({email});
        if (user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        };
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
            message: "User Create Successfully",
            success: true,
            savedUser
        })

    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}