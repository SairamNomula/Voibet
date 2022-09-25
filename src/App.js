import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles'
import wordsToNumbers from "words-to-numbers";

const alanKey = 'f014753de48589f14a7de9de350703c02e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();
  
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newNews'){
          setNewsArticles(articles);
          setActiveArticle(-1);
        }else if(command==='highlight'){
          setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
        }else if(command==='open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber-1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
          
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