import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles'

const alanKey = 'f014753de48589f14a7de9de350703c02e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = 0;
  const classes = useStyles();
  
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newNews'){
          setNewsArticles(articles);
        }else if(command==='highlight'){
          setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
        }
      }
    })
  }, [])


  return(
    <div>
      <div className={classes.logoContainer}>
        <img src="" className={classes.varthLogo} alt="Varth Logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  )
}

export default App;