
import React from 'react'
import { Box, Card, CardContent, Typography, FormGroup, TextField, Button } from '@material-ui/core'
import { object, string} from 'yup';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import axios from 'axios'
import { Person,} from 'model/Person';
import { Comment } from 'model/Comment';
import useSWR,{mutate,trigger} from 'swr'

const initialValues: Person = {
  name: '',
 email:'',
 password:''
}

export  function LoginForm() {

  const [loggedIn,setLoggedIn]=React.useState(false)

 
  return (
    <Box 
    padding={4}
    margin={1}
    alignSelf='center' justifySelf='center' alignContent='center' justifyContent='center'
    >
      <Card>
        <CardContent>
            <Box marginBottom={2}>
            <Typography>
            {loggedIn}
            </Typography>
            </Box>
            <Formik
      initialValues={initialValues}
      validationSchema={
        object({
          email:string()
          .required('Your email is required')
          .email(),
         password:string()
          .required('Your password is required')
          .min(4,'Your password should atleast be 4 characters')
        })
      }
      onSubmit={async (values, { setSubmitting }) => {
        const {email,password}=values;
        setSubmitting(true);
        const resp = await fetch('http://localhost:3000/api/login',{
          method:'POST',
          headers:{
             'content-Type':'application/json'
          },
          body:JSON.stringify({
              'email':email,
              'password':password
          })
      })
      const json = await resp.json()
      setLoggedIn(json.message)
      setSubmitting(false);
      }}
    >
      {({
        // values,
       // errors,
        // handleChange,
        // handleBlur,
        handleSubmit,
        isSubmitting,
        isValidating,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
          <Box marginBottom={2}>
          <FormGroup>
          <Field name='email' as={TextField} label='Email'/>
          {
          // touched.fullName&&errors.fullName?errors.fullName:null
          }
          <ErrorMessage name='email'/>
          </FormGroup>
          </Box>

          <Box marginBottom={2}>
          <FormGroup>
          <Field name='password' as={TextField} label='Password' type='password'/>
        
          <ErrorMessage name='password'/>
          </FormGroup>
          </Box>

  <Box marginBottom={2} >
  <Button fullWidth color='primary' type="submit" disabled={isSubmitting || isValidating}>Submit</Button>
  </Box>
 
       </Form>
      )}
    </Formik>
   
        </CardContent>

    </Card>  
  
    </Box>
  )
}

export  function SignupForm({setValue}:any) {

  const [registered,setRegistered]=React.useState(false)

 
  return (
    <Box 
    padding={4}
    margin={1}
    alignSelf='center' justifySelf='center' alignContent='center' justifyContent='center'
    >
      <Card>
        <CardContent>
            <Box marginBottom={2}>
            <Typography>
            {registered}
            </Typography>
            </Box>
            <Formik
      initialValues={initialValues}
      validationSchema={
        object({
          name:string()
          .required('Your name is required')
          .min(2,'Your name should be at least 2 characters')
          .max(100,'Your name should be at most 100 characters'),
          email:string()
          .required('Your email is required')
          .email(),
         password:string()
          .required('Your password is required')
          .min(4,'Your password should atleast be 4 characters')
        })
      }
      onSubmit={async (values, { setSubmitting }) => {
        const {email,password,name}=values;
        setSubmitting(true);
        const resp = await fetch('http://localhost:3000/api/signup',{
          method:'POST',
          headers:{
             'content-Type':'application/json'
          },
          body:JSON.stringify({
            'name':name,
              'email':email,
              'password':password
          })
      })
      const json = await resp.json()
      setRegistered(json.name)
      setSubmitting(false);
      setValue(0)
      }}
    >
      {({
        // values,
       // errors,
        // handleChange,
        // handleBlur,
        handleSubmit,
        isSubmitting,
        isValidating,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
           <Box marginBottom={2}>
          <FormGroup>
          <Field name='name' as={TextField} label='Name'/>
          {
          // touched.fullName&&errors.fullName?errors.fullName:null
          }
          <ErrorMessage name='name'/>
          </FormGroup>
          </Box>
          <Box marginBottom={2}>
          <FormGroup>
          <Field name='email' as={TextField} label='Email'/>
          {
          // touched.fullName&&errors.fullName?errors.fullName:null
          }
          <ErrorMessage name='email'/>
          </FormGroup>
          </Box>

          <Box marginBottom={2}>
          <FormGroup>
          <Field name='password' as={TextField} label='Password' type='password'/>
        
          <ErrorMessage name='password'/>
          </FormGroup>
          </Box>

  <Box marginBottom={2} >
  <Button fullWidth color='primary' type="submit" disabled={isSubmitting || isValidating}>Submit</Button>
  </Box>
 
       </Form>
      )}
    </Formik>
   
        </CardContent>

    </Card>  
  
    </Box>
  )
}

const initialComments: Comment = {
  comment: '',
};

export interface AddCommentProps{
  authId?:number
}

export function AddComment ({authId}:AddCommentProps){

  const {data} =useSWR('http://localhost:3000/api/comments')

  return(
          <Formik
    initialValues={{...initialComments,authId}}

    onSubmit={async(values, { setSubmitting,resetForm }) => {
      resetForm()
      setSubmitting(false);
      // first mutate the data before you even send it to server and do not revalidate
      values.id =data.length+1;
      mutate('http://localhost:3000/api/comments',[...data,values],false)
         await axios.post('http://localhost:3000/api/comments',values)
          setSubmitting(false);
          // something changed on that end point please trigger it
          trigger('http://localhost:3000/api/comments')
       }
     }
  >
    {({
      handleSubmit,
      isSubmitting,
      isValidating,
      /* and other goodies */
    }) => (
      <Form onSubmit={handleSubmit}>
        <Box marginBottom={2}>
        <FormGroup>
        <Field autoComplete='off' name='comment' as={TextField} label='Comment'/>
        {
        // touched.fullName&&errors.fullName?errors.fullName:null
        }
        <ErrorMessage name='fullName'/>
        </FormGroup>
        </Box>

<Box marginTop={1}>
<Button 
type="submit" 
variant ='contained' 
disabled={isSubmitting || isValidating}
color='primary'
>
Add Comment
  </Button>
</Box>

     </Form>
    )}
  </Formik>
 
)
}