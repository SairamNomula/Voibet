import React from 'react'
import Card from '../NewsCard/NewsCard'
import {Grid, Grow, Typography} from '@material-ui/core'
import useStyles from './styles';

const infoCards = [
  { color: '#023e8a', title: 'Latest News', text: 'Give me the latest news.' },
  { color: '#0077b6', title: 'News by Sources (IN)', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed', text: 'News from BBC.' },
  { color: '#0096c7', title: 'News by Categories', info: 'Business, Entertainment, Health, Science, Sports, Technology', text: 'Give me the latest Sports news.' },
  { color: '#00b4d8', title: 'News by Terms', info: 'Bitcoin, GTA 6, Covid, Narendra Modi', text: 'What\'s up with GTA 6?' },
  { color: '#023e8a', title: ' ', text: 'What does this app do?, How does this work?, What can I do here?, How should I use this?' },
  { color: '#0077b6', title: 'Recipes by Meal Type', text: 'Say breakfast, lunch, dinner, snack or teatime' },
  { color: '#0096c7', title: 'Recipes by Dish Type', text: 'Say something like pancake, dessert, soup, salad'},
  { color: '#00b4d8', title: 'Recipes by Cuisine Type', text: 'Say something like French, Japanese, Chinese' },
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