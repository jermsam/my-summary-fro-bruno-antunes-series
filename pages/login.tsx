import { Paper, Tabs, Tab, Box } from "@material-ui/core";
import React from "react";
import { SignupForm, LoginForm } from "components/forms";
import { GetServerSideProps } from "next";
import {getAuthId, } from "interfaces";
import { Person, } from 'model/Person';
import Router  from "next/router";
import { openDB} from 'model/openDb'

export default function({owner}:LoginProps){
    const [value, setValue] = React.useState(0);

    React.useEffect(
        ()=>{
            if(owner){
                Router.replace(`/comments/${owner.id}`)
                
            }
        },[owner]
    )
    
    if(owner) {
        return <Box>redirecting to {owner?.name}'s profile ...</Box>
    }
    return(
        <Paper>
            
        <Tabs
          value={value}
          onChange={(event, newValue) =>setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {
            value===1&&<SignupForm {...{setValue}}/>
        }
        {
            value===0&&<LoginForm/>
        }
      </Paper>
    )
}

export interface LoginProps{
owner?:Person|any;
}

export const getServerSideProps:GetServerSideProps<LoginProps> = async (ctx) =>{
    const db = await openDB();
    const authId = getAuthId(ctx)
   const authUser= await db.get<Person>('select id,name,email from Person where id = ?',authId)
   
  
        return {props:{owner:authUser||null}}  
       
     
  }