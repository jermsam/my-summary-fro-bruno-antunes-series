import { NextApiRequest, NextApiResponse } from "next"
import { openDB} from 'model/openDb'


export default async (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200
    console.log(req.statusCode)
    const db = await openDB();
  
    if(req.method==='GET'){
      const comment= await   db.all('select * from comment')
      res.json(comment)
    }else{
        res.status(405).json('We only support GET')
    }
    
  }