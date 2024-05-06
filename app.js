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
    //console.log(noticias)
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

app.put('/putNotice/:id', (req, res)=>{
  const id=req.params.id;
  let noticias = procesarDatos.leerDatos() || [];
  if(noticias.length===0){
    res.send('No hay noticias que buscar');
  }else{
    noticias.forEach((noticia)=>{
      if(id==noticia.id){

        noticia.img= req.body.img;
        noticia.titulo= req.body.titulo;
        noticia.parrafo= req.body.parrafo;
        console.log(noticia);
      }
    })
    procesarDatos.guardarDatos(noticias);
    res.send('Información actualizada correctamente')
  }
})

app.post('/postNotice', (req, res)=>{
  let noticias = procesarDatos.leerDatos() || [];
  const newNotice={
      id:noticias.length,
      img: req.body.img,
      titulo: req.body.titulo,
      parrafo: req.body.parrafo
  };
  
  noticias.push(newNotice);
  procesarDatos.guardarDatos(noticias);

  res.send('Noticia guardada con exito');
})

app.delete('/deleteNotices', (req,res)=>{
  let noticias=[];
  noticias=procesarDatos.leerDatos();
  if(noticias.length!=0){
    noticias='';
    procesarDatos.guardarDatos(noticias);
    res.send('Noticias eliminadas correctamente');
  }
  else{
    res.send('No hay noticias para eliminar')
  }
})

app.listen(3000, ()=>{
    console.log('Servidor escuchando...');
})

