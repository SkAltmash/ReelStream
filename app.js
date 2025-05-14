const form = document.querySelector('form');
const container= document.querySelector(".image-container");
const loadMore = document.querySelector(".loadMore");
const moreinfo =document.querySelector(".moreinfo");
const closeMoreinfo = document.querySelector(".closeMoreinfo");
const epcontaner =document.createElement('div');


let pageNumber=1;
let searchtime=1;



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let query=form.querySelector('input').value;
    if(searchtime>1)
    container.innerHTML="";
    omdb(query,pageNumber);
    searchtime++
})

async function omdb(query,pageNumber) {
   try{
    const request = await fetch(`https://www.omdbapi.com/?s=${query}&page=${pageNumber}&apikey=79522b75`)
    const data = await request.json();
   
    data.Search.forEach(moves => {
       

      const imageelement = document.createElement('div');
      imageelement.classList.add('imageDiv');
      imageelement.innerHTML=`<img src ="${moves.Poster}"/>`;

     
    
      container.appendChild(imageelement);

      const movesname  = document.createElement('div');
      imageelement.appendChild(movesname);
      movesname.innerHTML=`<span>${moves.Title}. </span><span id="year">${moves.Year}</span>`;
      imageelement.addEventListener("click",(e)=>{
         moredetles(moves.imdbID,moves.Title);
       })
      if (pageNumber<data.totalResults/10){
      loadMore.classList.add('displyloadMore');
       }
     
  });
   } catch (error) {
    const request = await fetch(`https://www.omdbapi.com/?t=${query}&page=${pageNumber}&apikey=79522b75`)
    const data = await request.json();
    const imageelement = document.createElement('div');
    imageelement.classList.add('imageDiv');
    imageelement.innerHTML=`<img src ="${data.Poster}"/>`;
    container.appendChild(imageelement);

    const movesname  = document.createElement('div');
    imageelement.appendChild(movesname);
    movesname.innerHTML=`<span>${data.Title}. </span><span id="year">${data.Year}</span>`;
    imageelement.addEventListener("click",(e)=>{
      moredetles(data.imdbID,data.Title);
    })
   }
   
  }

function loadmore(){
    let query=form.querySelector('input').value;
    omdb(query,++pageNumber);
    
}


  function loadData(button) {
    button.querySelector('.btn-text').style.display = 'none';
    button.querySelector('.loader').style.display = 'block';

    // Simulate loading
    setTimeout(() => {
      button.querySelector('.btn-text').style.display = 'inline';
      button.querySelector('.loader').style.display = 'none';
    }, 2000);
  }
  
  
 async function moredetles(imdbID,Title){
  let Seasons = 1;
 const request = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=79522b75`);
 const data = await request.json();
 moreinfo.style.background=`linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, 1)),url(${data.Poster})`;
 moreinfo.style.backgroundSize = "cover";
 console.log(data)
 moreinfo.style.backgroundPosition = "center";
 moreinfo.style.transform="scale(1)";
 container.style.transform="scale(0)";
 form.style.display="none";
 loadMore.classList.remove('displyloadMore');
 closeMoreinfo.style.display="block";
 if(data.Type==="series")
  {
   
   totalseson(imdbID,Seasons,data.totalSeasons);
   moreinfo.innerHTML=`
   <div class="moreinfoImg">
    <img src=${data.Poster}></img>
    </div>
    <div class="moreinfoInfo">
         <h1>${Title}</h1>
        <span>Language</span> ${data.Language} <br> <br> 
        <span>Releas Date </span> ${data. Released} <br><br> 
        <span>Type Seson </span> ${data.Type} <br><br> 
        <span>Total Seson </span> ${data.totalSeasons} <br><br>
        <span>Genres</span><ol>${data.Genre} </ol><br><br> 
       <span>OverView </span> ${data.Plot}; </div>`
 
 }
 else{
  moreinfo.innerHTML=`
                 <div class="moreinfoImg">
                  <img src=${data.Poster}></img>
                  </div>
                  <div class="moreinfoInfo">
                       <h1>${Title}</h1>
                      <span>Language</span> ${data.Language} <br> <br> 
                      span>Type Seson </span> ${data.Type} <br><br> 
                      <span>Length </span> ${data.Runtime} <br><br> 
                      <span>Releas Date </span> ${data. Released} <br><br> 
                      <span>Genres</span><ol>${data.Genre} </ol><br><br> 
                     <span>OverView </span> ${data.Plot}; </div>`
 }

}
function closeMoreinfofn() {
  moreinfo.style.transform="scale(0)";
  form.style.display="flex";
  container.style.transform="scale(1)";
  closeMoreinfo.style.display="none";

}





async function totalseson(imdbID,Seasons,totalSeasons){
  const request = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=79522b75&Season=${Seasons}`);
  const data = await request.json()
  const moreinfoInfo = document.querySelector(".moreinfoInfo");
  const scontenar =document.createElement('div');
  scontenar.classList.add('scontenar');
  moreinfoInfo.appendChild(scontenar);
  for(let i=Seasons;i<=totalSeasons;i++){
    const sinfo=document.createElement('div');
    sinfo.innerHTML=`${i}` 
    scontenar.appendChild(sinfo);
    sinfo.addEventListener("click",(e)=>{
      epcontaner.innerHTML="";
      epcontaner.style.transform="scale(0)";

      nextseson(imdbID,e.target.innerHTML,totalSeasons);
      })
    }
  epcontaner.innerHTML="";
  epcontaner.classList.add("epcontaner");
  moreinfoInfo.appendChild(epcontaner);
  data.Episodes.forEach(ep =>{
  totalep(ep.imdbID); 
  
}) }


   async function totalep(imdbID){
  const request = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=79522b75`);
   const data = await request.json()
   let epdiv = document.createElement('div');
   epdiv.innerHTML=`<img src ="${data.Poster}"/>`
   const epduration = document.createElement('div');
   epduration.classList.add("epduration");
   epduration.innerHTML=`${data.Runtime}`;
   epdiv.appendChild(epduration);
    epdiv.innerHTML+=`<h3>${data.Episode} ${data.Title}</h3><br>
                      <p>  ${data.Plot} </p> `
    const epcontaner =document.querySelector(".epcontaner");
    epcontaner.appendChild(epdiv);
}
async function nextseson(imdbID,Seasons,totalSeasons,){
  const request = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=79522b75&Season=${Seasons}`);
  const data = await request.json()
  const moreinfoInfo = document.querySelector(".moreinfoInfo");
 
  
   epcontaner.classList.add("epcontaner");

  moreinfoInfo.appendChild(epcontaner);
  data.Episodes.forEach(ep =>{
  totalep(ep.imdbID); 
  epcontaner.style.transform="scale(1)";

  
}) }
