import { Box, Button, Typography, Toolbar, Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { GetServerSideProps } from "next";
import axios from 'axios'
import React from "react";
import useSWR,{mutate,trigger} from 'swr'
import DeleteIcon from '@material-ui/icons/Delete';
import { openDB} from 'model/openDb'
import { Comment } from 'model/Comment';

export default function Profile({comments}:ProfileProps){
  const {data} =useSWR('http://localhost:3000/api/comments',{initialData:comments})


    return <Box>
     
      <Toolbar>
    <Grid
      justify="space-between" // Add it here :)
      container 
      // spacing={24}
    >
      <Grid item>
      <Typography variant='h5'>
      All Comments
      </Typography>
      </Grid>

      <Grid item>
        <Box >
        <Button variant="contained" href="/" >
        Home
      </Button>
       
        </Box>
      </Grid>
    </Grid>
  </Toolbar>
        <hr/>
        <Box margin={1}>
     Number of Comments: {data?.length}
      </Box>
       <Box>
       
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data?.map(({id,comment}:Comment)=> (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell>{comment}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={async () => {
                      const url=`http://localhost:3000/api/comments`
                      mutate(url,data.filter((comment:Comment)=>comment.id!==id),false)
                      await  axios.delete(`http://localhost:3000/api/comments?id=${id}`)
                      trigger(url)
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
         </Box>
         
    </Box>
}

export interface ProfileProps{
    comments?:Comment[]
    }

export const getServerSideProps:GetServerSideProps<ProfileProps> = async (ctx) =>{
    const db = await openDB();

    const comments= await db.all<Comment[]>('select * from comment',)
  
       return {props:{comments}}
     
  }