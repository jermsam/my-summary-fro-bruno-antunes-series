import { NextApiRequest, NextApiResponse } from "next"

import bcrypt from 'bcrypt'
import { openDB} from 'model/openDb'

export default async (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200
    console.log(req.statusCode)
    const db = await openDB();
    if(req.method==='POST'){
       
  const statement = await db.prepare('INSERT INTO Person (name,email,password) values (?,?,?)',);
  const password= await bcrypt.hash(req.body.password, 10)
  const result = await statement.run(req.body.name,req.body.email,password);
  // result.finalize()
 
 const person= await   db.get('select * from person where id=?',result.lastID)
 res.json(person)
    }else{
        res.status(405).json('We only support POST')
    }
  
   
  }