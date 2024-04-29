const Express = require('express');
const app=Express();

const axios=require('axios');
const cheerio=require('cheerio')

app.use(Express.json());

const url = 'https://elpais.com/ultimas-noticias/'


app.get('/', (req, res)=>{
    axios.get(url).then((response=>{
        if(response.status===200){
            const html=response.data;
            console.log(html);
            const $=cheerio.load(html);
            const articles=[];
            $('article').each((i, el)=>{
                let newArticle={
                    img:$('img', el).attr('src'),
                    titulo:$('a', el).attr('href'),
                    parrafo:$('p', el).text()
                }
                console.log(newArticle)    
                articles.push(newArticle);
            })
            res.send(articles)
        }
    }))
})

app.listen(3000, ()=>{
    console.log('Servidor escuchando...');
})