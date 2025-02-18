import React from 'react';
import {useState} from 'react';
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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import {StarIconDefaults} from './svg';
import CardHeader from './CardHeader';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
      //color: '#ffffff',
    backgroundColor: theme.palette.background.light,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  cardMedia: {
    paddingTop: '50%',
  },
  cardContent: {
    flexGrow: 1,
  },
  star: {
    float: 'right',
    '&:hover': {
      fill: theme.palette.favorite.hover,
    },
  },
  selected: {
    float: 'right',
    fill: theme.palette.favorite.hover,
  },
}));


const colorMap = {
  "Audience Interactive": "#1b0c33",
  "Convention": "#1b182e",
  "Creative Arts": "#2a2344",
  "Dance": "#533a88",
  "Educational": "#54466c",
  "Entertainment": "#382f5f",
  "Fursuit": "#4e24aa",
  "Games": "#2b244b",
  "Music": "#3c08a2",
  "Other": "#62429d",
  "Social": "#3702b3",
};

function getColor(track) {
  const i = Object.keys(colorMap).indexOf(track);

  return colorMapOverride[i];
}

function starToggle(isSaved, setIsSaved) {
  return (event) => {
    const parent = event.target.parentNode;
    const key = parent.getAttribute('data-key');
    const state = isSaved[key];
    if (state) {
      delete isSaved[key];
    } else {
      isSaved[key] = true;
    }
    setIsSaved({...isSaved});
    localStorage.setItem('saved', JSON.stringify(isSaved));
  };
}

export default function Album({cards}) {
  const classes = useStyles();
  const storageSaved = JSON.parse(localStorage.getItem('saved')) || {};
  const [isSaved, setIsSaved] = useState(storageSaved);

  return (
    <Container className={classes.cardGrid} maxWidth="xl">
      <Grid container spacing={4}>
        {cards.map((card) => {
          const starClass = isSaved[card.key] ? classes.selected : classes.star;
          return <Grid item key={card.key} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                title={card.Track}
                backgroundColor={colorMap[card.Track]}
                backgroundImage="url('img/blank-border-sm.png')"
              />
              <CardContent className={classes.cardContent}>
                <Box>
                  <StarIconDefaults height="50px" width="50px" data-key={card.key} className={starClass} onClick={starToggle(isSaved, setIsSaved)} />
                  <Typography gutterBottom variant="h4" component="h2" style={{fontWeight: 'bold'}}>
                    {card.Title}
                  </Typography>
                </Box>
                <Box mb={'8px'}>
                    <Typography variant="h6">
                      Location: {card.Room}
                    </Typography>
                </Box>
                <Box mb={'8px'}>
                    <Typography variant="h6">
                      Time: {card.Time}
                    </Typography>
                </Box>
                <Typography>
                  {card.Abstract}
                </Typography>
              </CardContent>
              <CardActions>
                <Typography>
                  Host(s): {card.Speakers.join(', ')}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        })}
      </Grid>
    </Container>
  );
}
