import React from 'react'
import Card from '../NewsCard/NewsCard'
import {Grid, Grow, Typography} from '@material-ui/core'
import useStyles from './styles';

const infoCards = [
  { color: '#0F4C75', title: 'Latest News', text: 'Give me the latest news.' },
  { color: '#3282B8', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed', text: 'News from BBC.' },
  { color: '#0F4C75', title: 'News by Categories', info: 'Business, Entertainment, Health, Science, Sports, Technology', text: 'Give me the latest Sports news.' },
  { color: '#3282B8', title: 'News by Terms', info: 'Bitcoin, GTA 6, Covid, Narendra Modi', text: 'What\'s up with GTA 6?' },
];


const NewsCards = ({articles, activeArticle}) => {

  const classes = useStyles();

  if(!articles.length){
    return (
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard) => (
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    )
  }
  return (
    <Grow in>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {articles.map((article, i)=>(
            <Grid key={i} item xs={12} sm={6} md={4} lg={3} style={{display: 'flex'}}>
              <Card article={article} activeArticle={activeArticle} i={i}/>
            </Grid>
        ))}
      </Grid>
    </Grow>
  )
}

export default NewsCards