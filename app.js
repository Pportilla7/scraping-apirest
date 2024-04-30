const Express = require('express');
const app=Express();

app.use(Express.json());

app.use(Express.urlencoded({ extended: true }));


const procesarDatos=require('./procesamientoDatos.js')

const getNews=require('./scraping.js')


app.get('/scraping', async (req, res)=>{
   try{
        const noticias = await getNews();
        procesarDatos.guardarDatos(noticias);
        res.redirect('/getNotices');
   }
   catch(error){
        res.status(400).send(error);
   }
})

app.get('/getNotices', (req, res)=>{
    const noticias=procesarDatos.leerDatos();
    console.log(noticias)
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
    const newNotice={
        img: req.body.img,
        titulo: req.body.titulo,
        parrafo: req.body.parrafo
    };
    console.log(req.body.img);
    let noticias=[];
    noticias=procesarDatos.leerDatos();
    //console.log(noticias);
    noticias.push(newNotice);
    procesarDatos.guardarDatos(noticias);
    //console.log(noticias);
    res.send('Noticia guardada con exito');
})

app.listen(3000, ()=>{
    console.log('Servidor escuchando...');
})

