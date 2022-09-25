intent('What does this app do?', 'What to do here?', 'What is the use of this app?',
      reply('Varth is a conversational voice controlled web application'));

const API_KEY = '91070ca61a3e4a58a5944c9f65de61c3';
let savedArticles = [];

// API Endpoints
// News by source

intent('News from $(source* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
    
    if(p.source.value) {
        p.source.value=p.source.value.toLowerCase().split(" ").join("-");
        NEWS_API_URL = `${NEWS_API_URL}?sources=${p.source.value}&apiKey=${API_KEY}`
    }

    api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
        const { totalResults, articles } = JSON.parse(body); // to get data from API call

        if(totalResults == 0) {
            p.play('Sorry, please try searching for news from a different source');
            return;
        }

        savedArticles = articles;

        p.play({ command: 'newNews', articles });
        p.play(`Here are (latest|recent) ${p.source.value} news.`);

        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
})
// News by Category

const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=in`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for a different category.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newNews', articles });
        
        if(p.C.value) {
            p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);        
        } else {
            p.play(`Here are the (latest|recent) news`);   
        }
     p.play('Would you like me to read the headlines?');
     p.then(confirmation);
    });
});

// News by Term
intent('What\'s up with $(term* .+)', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything`;
    
    if(p.term.value){
        p.term.value=p.term.value.toLowerCase().split(" ").join("-")
        NEWS_API_URL = `${NEWS_API_URL}?sources=${p.term.value}&apiKey=${API_KEY}`
    }
    
    api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
        const { articles } = JSON.parse(body); // to get data from API call
        
        if(!articles?.length){
            p.play('Sorry, please try searching for something else');
            return;
        }
        
        savedArticles = articles;
        p.play({command: 'newNews', articles});
        
        if(p.C.value) {
            p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);        
        } else {
            p.play(`Here are the (latest|recent) news`);   
        }
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
});    

const confirmation = context(()=>{
    intent('yes', async(p)=>{
        for(let i=0;i<savedArticles.length; i++){
            p.play({command: 'highlight', article:savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    intent('no', (p)=>{
        p.play('Sure, sounds good to me.')
    })
})

intent('Open (the|) (article|) number $(number* (.*))', (p)=>{
    if(p.number.value){
        p.play({command:'open', number: p.number.value, articles: savedArticles})
    }
})

intent('(go|) back', (p)=>{
    p.play('Sure, going back');
    p.play({command: 'newNews', articles:[]})
})