const Express = require('express');
const app=Express();

app.use(Express.urlencoded({ extended: true }));

const procesarDatos=require('./procesamientoDatos.js')

const getNews=require('./scraping.js')


app.get('/scraping', async (req, res)=>{
   try{
        const noticias = await getNews();
        procesarDatos.guardarDatos(noticias);
        res.redirect('getNotices');
   }
   catch(error){
        res.status(400).send(error);
   }
})

app.get('/getNotices', (req, res)=>{
    const noticias=procesarDatos.leerDatos();
    let htmlResponse = '<h1>Noticias</h1>';

    noticias.forEach((noticia) => {
      htmlResponse += `
        <div>
          <img src="${noticia.img}" alt="imagen">
          <h2><a href="${noticia.titulo}">${noticia.titulo}</a></h2>
          <p>${noticia.parrafo}</p>
        </div>
      `;
    });
  
    res.send(htmlResponse);
})

app.post('/postNotice', (req, res)=>{
    
})

app.listen(3000, ()=>{
    console.log('Servidor escuchando...');
})

