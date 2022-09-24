import React from 'react'
import {Card, CardActions, CardContent, CardActionArea, Button, Typography, CardMedia} from '@material-ui/core'
import useStyles from './styles'
import classNames from 'classnames'

const NewsCard = ({article: { description, publishedAt, source, title, url, urlToImage}, i, activeArticle}) => {
  const classes = useStyles();
  return (
    <Card className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage || 'http://narayanahealth.com.bd/wp-content/uploads/2020/03/News.jpg'}/>
        <div className={classes.details}>
          <Typography variant="body2" color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString}</Typography>
          <Typography variant="body2" color='textSecondary' component='h2'>{source.name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant='h5' component="h2">{title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
          </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" href={url}>Learn more</Button>
        <Typography variant="h5" color="textSecondary" component="h2">{i + 1}</Typography>
      </CardActions>
    </Card>
  )
}

export default NewsCard