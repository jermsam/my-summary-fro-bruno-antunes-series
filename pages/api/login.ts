import { NextApiRequest, NextApiResponse } from "next"

import bcrypt from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {serialize} from 'cookie'
import { openDB} from 'model/openDb'

export default async (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200
    console.log(req.statusCode)
    const db = await openDB();
    if(req.method==='POST'){
       
      const person= await   db.get('select * from person where email=?',req.body.email)
      
    let result =false;//
    if(person) result = await bcrypt.compare(req.body.password,person.password)
      if(result){
        const claims = {sub:person.id,}
       
        const authToken =sign(claims,process.env.SECRET!,{expiresIn:'1h'});
        
        res.setHeader('Set-Cookie',serialize('auth',authToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV!=='development',
          sameSite:'strict',
          maxAge:3600,
          path:'/'
        }))
        
       //  res.json({authToken})
       res.json({message:'You are authenticated'})
      }else{
        res.json({message:'Oops, something went wrong'})
      }
    }else{
        res.status(405).json('We only support POST')
    }
  
   
  }