const form = document.querySelector('form');
const container= document.querySelector(".image-container");
const loadMore = document.querySelector(".loadMore");
let pageNumber=1;


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let query=form.querySelector('input').value;
    omdb(query,pageNumber);
})

async function omdb(query,pageNumber) {
   
    const request = await fetch(`https://www.omdbapi.com/?s=${query}&page=${pageNumber}&apikey=79522b75`)
    const data = await request.json();
    data.Search.forEach(moves => {
       

        const imageelement = document.createElement('div');
        imageelement.classList.add('imageDiv');
        imageelement.innerHTML=`<img src ="${moves.Poster}"/>`;

       
        container.appendChild(imageelement);

        const movesname  = document.createElement('div');
        imageelement.appendChild(movesname);
        movesname.innerHTML=`<span>${moves.Title}. </span><span id="year">${moves.Year}</span>`
        if (pageNumber<data.totalResults/10)
        loadMore.classList.add('displyloadMore');

    });

 
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




