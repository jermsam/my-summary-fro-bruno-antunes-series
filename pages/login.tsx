import { Paper, Tabs, Tab, Box } from "@material-ui/core";
import React from "react";
import { SignupForm, LoginForm } from "components/forms";


export default function(){
    const [value, setValue] = React.useState(0);

   
   
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
