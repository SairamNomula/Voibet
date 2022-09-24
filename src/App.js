import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";


const alanKey = 'f014753de48589f14a7de9de350703c02e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newNews'){
          setNewsArticles(articles);
        }
      }
    })
  }, [])


  return(
    <div>
      <h1>Varth</h1>
      <NewsCards articles={newsArticles}/>
    </div>
  )
}

export default App;