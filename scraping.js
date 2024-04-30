const axios=require('axios');
const cheerio=require('cheerio')

const url = 'https://elpais.com/ultimas-noticias/'

async function getNews(){
    try{
        const response = await axios.get(url);
        const html=response.data;
        
        const $=cheerio.load(html);
        const articles=[];
        $('article').each((i, el)=>{
            let newArticle={
                img:$('img', el).attr('src'),
                titulo:$('a', el).attr('href'),
                parrafo:$('p', el).text()
            }   
            articles.push(newArticle);
        })
        console.log(articles)
        return articles;
    }
    catch (error) {
        console.error(error);
      }
}

module.exports=getNews