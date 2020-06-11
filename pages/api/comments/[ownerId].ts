import { NextApiRequest, NextApiResponse } from "next"
import { openDB} from 'model/openDb'
import {authenticated,} from 'interfaces';

export default authenticated(async (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200
    console.log(req.statusCode)
    const db = await openDB();
    if(req.method==='POST'){
       
      const statement = await db.prepare('INSERT INTO Comment (comment,ownerId) VALUES (?,?)',);
    
      await statement.run(req.body.comment,req.query.ownerId);
      
    }

    if(req.method==='PUT'){
       
        const statement = await db.prepare('UPDATE Comment SET comment=?, ownerId=? where id=?' ,);
        const result = await statement.run(req.body.comment,req.query.ownerId,req.query.id);
        res.json({result})
        
      }

    if(req.method==='DELETE'){
     console.log( 'req: ',req)
      const statement = await db.prepare('DELETE FROM Comment WHERE id = ?',);
    
    const result = await statement.run(req.query.id);
    res.json({result})
    }
    if(req.method==='GET'){
      const comment= await   db.all('select * from comment where ownerId=?',req.query.ownerId)
      res.json(comment)
    }
    
  })