import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Loop from '@material-ui/icons/Loop';

import ResponsiveEmbed from 'react-responsive-embed';
import Fuse from 'fuse.js';
import shuffle from 'knuth-shuffle-seeded';

import Album from './Album';
import TagSelect from './TagSelect';
import {data, dealersAlpha, dealersAlphaReverse, timeAsc, timeDesc, tags} from './loadData';


const fuseOptions = {
  threshold: 0.3,
  ignoreLocation: true,
  keys: ['Title', 'Description', 'Speakers'],
};
const fuse = new Fuse(data, fuseOptions);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://draggor.me/">
        draggor.me
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  card: {
    height: '100%',
    maxHeight: '360px',
    maxWidth: '720px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: '100%',
    maxHeight: '360px',
    maxWidth: '720px',
  },
  search: {
    backgroundColor: theme.palette.background.default,
  },
}));

let randomDealers = data.slice();
shuffle(randomDealers);

const App = () => {
  const classes = useStyles();

  // Initialize list with tag from query param:
  const searchParams = new URLSearchParams(document.location.search);
  const searchTag = searchParams.get('tag');
  const tag = tags.find(t => searchTag === t.value);
  let initialDealers = randomDealers;
  let initialTag = '_';
  if (tag) {
    initialDealers = dealersAlpha.slice().filter(dealer => dealer.tags.indexOf(searchTag) > -1);
    initialTag = searchTag;
  }

  const [dealers, setDealers] = useState(initialDealers);
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setTag] = useState(initialTag);

  const handleSearch = (event) => {
    const str = event.target.value;
    setSearchText(str);

    if (str.length >= 3) {
      const searchResults = fuse.search(str);
      const dealerResults = searchResults.map(result => result.item);

      setDealers(dealerResults);
    } else {
      setDealers(randomDealers);
    }
  };

  const sortAlpha = () => {
    setDealers(dealersAlpha);
    setSearchText('');
    setTag('_');
  };
  const sortAlphaReverse = () => {
    setDealers(dealersAlphaReverse);
    setSearchText('');
    setTag('_');
  };
  const sortTimeAsc = () => {
    setDealers(timeAsc);
    setSearchText('');
    setTag('_');
  };
  const sortTimeDesc = () => {
    setDealers(timeDesc);
    setSearchText('');
    setTag('_');
  };
  const sortRandom = () => {
    randomDealers = data.slice();
    shuffle(randomDealers);
    setDealers(randomDealers);
    setSearchText('');
    setTag('_');
  };
  const filterTag = (tag) => {
    if (tag !== '_') {
      const filteredDealers = dealersAlpha.slice().filter(dealer => dealer.tags.indexOf(tag) > -1);
      setDealers(filteredDealers);
    } else {
      setDealers(randomDealers);
    }
    setTag(tag);
    setSearchText('');
  };


  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Fur Squared 2024 Programming List
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Grid container justify="center" maxwidth="xl">
          <Grid item>
            <TextField label="Search Events" variant="filled" value={searchText} onChange={handleSearch} className={classes.search} />
          </Grid>
          <Grid item>
            <Box align="center" p={2}>
              <Button variant="contained" color="primary" onClick={sortAlpha} className={classes.button}>A-Z</Button>
              <Button variant="contained" color="primary" onClick={sortAlphaReverse} className={classes.button}>Z-A</Button>
              <Button variant="contained" color="primary" onClick={sortTimeAsc} className={classes.button}>Time Asc</Button>
              <Button variant="contained" color="primary" onClick={sortTimeDesc} className={classes.button}>Time Desc</Button>
              <Button variant="contained" color="primary" onClick={sortRandom}>
                <Loop />
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <TagSelect tags={tags} onChange={filterTag} value={selectedTag} />
          </Grid>
        </Grid>
        <Album cards={dealers} />
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Fur Squared 2024 Programming List
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Created by Draggor
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </>
  );
};

export default App;
