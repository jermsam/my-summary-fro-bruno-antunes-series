import {verify} from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse, NextApiHandler, NextPageContext, } from "next"

import Router  from 'next/router';
import decode from 'jwt-decode'



  export const apiEndpoint =process.env.API_ENDPOINT


  export const authenticated =( fn:NextApiHandler )=> async (req: NextApiRequest, res: NextApiResponse) => {

    verify(req.cookies.auth!, process.env.SECRET!,async (err,decoded)=>{

      if(!err&&decoded){
        return await fn(req, res)
      }else{
        res.status(401).json({message:'Sorry, you are not authenticated!'})
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



export function getCookie(cname:string,ctx?:any) {
  console.log(cname)
  var name = cname + "=";
  const cookie = ctx?.req?.headers.cookie;
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
   const jwt =getCookie('auth',ctx);
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


