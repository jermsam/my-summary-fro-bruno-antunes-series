import { NextApiRequest, NextApiResponse } from "next"
import { openDB} from 'model/openDb'
import {authenticated,authorized} from 'interfaces';

const updateComment =authorized(async (req:NextApiRequest, res:NextApiResponse) => {
  if(req.method==='PUT'){
    const db = await openDB();
    const statement = await db.prepare('UPDATE Comment SET comment=?, ownerId=? where id=?' ,);
    const result = await statement.run(req.body.comment,req.query.ownerId,req.query.id);
    res.json({result})
    
  }
})

const deleteComment =authorized(async (req:NextApiRequest, res:NextApiResponse) => {
  if(req.method==='DELETE'){
    const db = await openDB();
     const statement = await db.prepare('DELETE FROM Comment WHERE id = ?',);
   
   const result = await statement.run(req.query.id);
   res.json({result})
   }
})

export default authenticated(async (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200
    console.log(req.statusCode)
    const db = await openDB();
    if(req.method==='POST'){
       
      const statement = await db.prepare('INSERT INTO Comment (comment,ownerId) VALUES (?,?)',);
    
      await statement.run(req.body.comment,req.query.ownerId);
      
    }

    updateComment(req,res);

    deleteComment(req,res);

    if(req.method==='GET'){
      const comment= await   db.all('select * from comment where ownerId=?',req.query.ownerId)
      res.json(comment)
    }
    
  })