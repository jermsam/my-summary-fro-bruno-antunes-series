import {verify} from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse, NextApiHandler, NextPageContext, } from "next"

import Router  from 'next/router';
import decode from 'jwt-decode'
import sqlite3 from 'sqlite3';
import { openDB } from 'model/openDb';


  export const apiEndpoint =process.env.API_ENDPOINT


  export const authenticated =( fn:NextApiHandler )=> async (req: NextApiRequest, res: NextApiResponse) => {

    verify(req.cookies.auth!, process.env.SECRET!,async (err,decoded)=>{

      if(!err&&decoded){
        return await fn(req, res)
      }else{
        res.status(403).json({message:'Sorry, you are not authenticated!'})
      }

    });

   
  
}


export const myGet = async(url:string,ctx?:NextPageContext)=>{
  const cookie = ctx?.req?.headers.cookie;

  const response = await fetch(url,{
      headers:{
          cookie:cookie!
      }
  })
  
  
      if(response.status===401){
          if(!ctx?.req){
          Router.replace('/login')
          return
      }else{
          ctx.res?.writeHead(302,{
              Location:`${process.env.URL}/login`
          });
  ctx.res?.end();
  return
      }
  }else{
    return response!;
  }
}



export function getCookie(cname:string,cookie?:any) {
  console.log(cname)
  var name = cname + "=";
 
  var decodedCookie = decodeURIComponent(cookie!);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function getAuthId(ctx?:any){
  if(ctx){
    const cookie = ctx?.req?.headers.cookie;
   const jwt =getCookie('auth',cookie);
  if(jwt){
    const {sub} = decode(jwt);
    console.log(sub)
    return sub;
  }
  if(!ctx?.req){
    Router.replace('/login')
    return
}else{
    ctx.res?.writeHead(302,{
        Location:`${process.env.URL}/login`
    });
ctx.res?.end();
return
}
  }
 }



 export const authorized=(fn:NextApiHandler )=> async (req: NextApiRequest, res: NextApiResponse) => {

  const cookie = req?.headers.cookie;

  const jwt =getCookie('auth',cookie);

  if(jwt){
    const {sub} = decode(jwt);
    const ownerId=req?.query.ownerId
    if(sub.toString()===ownerId){
      return await fn(req, res,)
    }else{
      res.status(401).json({message:'Sorry, you are not authorized!'})
    }
  }else{
    res.status(403).json({message:'Sorry, you are not authenticated!'})
  }

}

export interface Make {
  make: string;
  count: number;
}

export async function getMakes() {
  const db = await openDB();
  const makes = await db.all<Make[]>(`
      SELECT make, count(*) as count
      FROM car
      GROUP BY make
  `);
  return makes;
}

