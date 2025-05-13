const form = document.querySelector('form');
const container= document.querySelector(".image-container");
const loadMore = document.querySelector(".loadMore");
const moreinfo =document.querySelector(".moreinfo");
const backbutton = document.querySelector("back-button");
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
         moredetles(moves.imdbID);
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
      moredetles(data.imdbID);
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
  
  
 async function moredetles(imdbID){
 const request = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=79522b75`);
 const data = await request.json();
 
 
  moreinfo.innerHTML=`
                 <div class="moreinfoImg">
                  <img src=${data.Poster}></img>
                  </div>
                  <div class="moreinfoInfo">
                       <span>Language</span> ${data.Language} <br> <br> 
                      <span>Length </span> ${data.Runtime} <br><br> 
                      <span>Releas Date </span> ${data. Released} <br><br> 
                      <span>Genres</span><ol>${data.Genre} </ol><br><br> 
                     <span>OverView </span> ${data.Plot}; </div>`
 console.log(data)
 container.style.display="none";
 form.style.display="none";
 document.scrollTop;
 loadMore.classList.remove('displyloadMore');
 backbutton.style.display="block";

}





