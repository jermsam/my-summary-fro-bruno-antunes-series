import { NextApiRequest, NextApiResponse, } from "next"

import {serialize} from 'cookie'


export default async (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200
    console.log(req.statusCode)

    if(req.method==='POST'){

       
        res.setHeader('Set-Cookie',serialize('auth','',{
          httpOnly:true,
          secure:process.env.NODE_ENV!=='development',
          sameSite:'strict',
          maxAge:0,
          path:'/'
        }))
        
       //  res.json({authToken})
       res.json({message:'You are logged out'})
    
    }else{
        res.status(405).json('We only support POST')
    }
  
   
  }

 