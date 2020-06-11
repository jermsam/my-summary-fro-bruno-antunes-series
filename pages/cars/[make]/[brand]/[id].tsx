import { Car } from "model/Car";
import { GetServerSideProps } from "next";
import { openDB } from "model/openDb";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
 
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',

  },
 
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export interface CarDetailsProps{
    car?:Car|null
}

export default function CardDetails({car}:CarDetailsProps) {
  const classes = useStyles();
    if(!car){
        return (
            <div>
           Sorry car is not found
            </div>
          )
    }

  return (
    <div>
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={5}>
          <img className={classes.img} alt="complex" src={car.photoUrl} />
        </Grid>
        <Grid item xs={12} sm={6} md={7} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h5">
                {car.make + ' ' + car.model}
              </Typography>
              <Typography gutterBottom variant="h4">
                ${car.price}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                Year: {car.year}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                KMs: {car.kilometers}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                Fuel Type: {car.fuelType}
              </Typography>
              <Typography gutterBottom variant="body1" color="textSecondary">
                Details: {car.details}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </div>
  )
}


export const getServerSideProps:GetServerSideProps<CarDetailsProps> =async (ctx)=>{
const id = ctx.params?.id;
console.log('id: ',id)
const db =await openDB()
const res = await db.get<Car|undefined>('SELECT * FROM Car where id=?',id)
    return{props:{car:res||null}}
}