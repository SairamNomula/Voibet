import React from 'react'
import {Card, CardActions, CardContent, CardActionArea, Button, Typography, CardMedia} from '@material-ui/core'
import useStyles from './styles'

const NewsCard = ({article: { description, publishedAt, source, title, url, urlToImage}, i}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage || 'http://narayanahealth.com.bd/wp-content/uploads/2020/03/News.jpg'}/>
        <div className={classes.details}>
          <Typography variant="body2" color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString}</Typography>
          <Typography variant="body2" color='textSecondary' component='h2'>{source.name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant='h5'>{description}</Typography>
          <CardContent>
            <Typography variant='body2' color='textSecondary' component="p"></Typography>
          </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">Learn more</Button>
        <Typography variant="h5" color='textSecondary'>{i + 1}</Typography>
      </CardActions>
    </Card>
  )
}

export default NewsCard