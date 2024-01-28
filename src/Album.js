import React from 'react';
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


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
}));


const colorMap = {
  "Art": "#f2c86e",
  "Concert": "#b0b759",
  "Convention Event": "#ab9a85",
  "Dance": "#746229",
  "Interactive": "#aa744f",
  "Main Event": "#b05b44",
  "Meetup": "#b08b71",
  "Performance": "#d5724a",
  "Rehearsal": "#c6965c",
  "Tabletop": "#826760",
  "Talk": "#957a52",
  "Video Gaming": "#a77b03",
};

const colorMapOverride = [
  "#fcb826",
  "#b0b759",
  "#645542",
  "#746229",
  "#8d5229",
  "#6a230f",
  "#b08b71",
  "#d5724a",
  "#c6965c",
  "#5e443e",
  "#66430f",
  "#a77b03",
];

function getColor(track) {
  const i = Object.keys(colorMap).indexOf(track);

  return colorMapOverride[i];
}

export default function Album({cards}) {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="xl">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card.key} xs={12} sm={6} md={4}>
            <Link href={card.website_link} target="_blank">
            <Card className={classes.card}>
              <Box
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                pl="30px"
                pr="30px"
                style={{
                  display: "flex",
                  backgroundImage: "url('img/blank-border-sm.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: 'contain',
                  backgroundPosition: 'left',
                  backgroundColor: colorMap[card.Track],
                  aspectRatio: "3/1",
                }}
              >
                <Typography variant="h3" style={{fontWeight: 'bold'}}>
                  {card.Track}
                </Typography>
              </Box>
              <CardContent className={classes.cardContent}>
                <Box>
                  <Typography variant="h4" component="h2" style={{float: 'right'}}>
                    ☆
                  </Typography>
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
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
