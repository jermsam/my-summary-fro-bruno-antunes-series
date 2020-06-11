import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { SWRConfig } from 'swr';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import theme from 'src/theme';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

NProgress.configure({ showSpinner: false,trickleSpeed:3000, });

Router.events.on('routeChangeStart', () => {
    NProgress.start() 
})

Router.events.on('routeChangeComplete', () => {
    NProgress.done();
})

Router.events.on('routeChangeError', () => {
    NProgress.done();
})

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const classes = useStyles();

 console.log(process.env.MY_STEP)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <SWRConfig value={{ fetcher: (url: string) => axios(url).then(r => r.data) }}>
    <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
            Car Trader
      </Typography>
      <Button color="inherit">
      <Link href="/">
        <a style={{ color: 'white',textDecoration:'none' }}>
          <Typography   color="inherit">
            Home
          </Typography>
        </a>
      </Link>
    </Button>
      <Button color="inherit">
      <Link href="/faq">
        <a style={{ color: 'white',textDecoration:'none' }}>
          <Typography   color="inherit">
            FAQ
          </Typography>
        </a>
      </Link>
          </Button>
          <Button color="inherit">
          <Link href="/comments">
            <a style={{ color: 'white',textDecoration:'none' }}>
              <Typography   color="inherit">
               Comments
              </Typography>
            </a>
          </Link>
          </Button>
          <Button color="inherit">
          <Link href="/login">
            <a style={{ color: 'white',textDecoration:'none' }}>
              <Typography   color="inherit">
                Login
              </Typography>
            </a>
          </Link>
        </Button>
    </Toolbar>
  </AppBar>
     
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
}