const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');


//Function  to fetch movie  details using OMDB Api

const getMovieInfo =async (movie)=>{
    try {
        
    const myApiKey ="a24f1fbd";
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=a24f1fbd&t=${movie}`;

    const response =await fetch(url);
    
    if(!response.ok){
         throw new error("Unable to fetch movie data")
    }


    const data = await response.json();

    showMovieData(data);
} catch (error) {
       showErrorMessage("Sorry No Movie Found !!") 
}
    
}

//Functioon to show movie data on Screen
const showMovieData = (data) => {
 movieContainer.innerHTML ="";
 movieContainer.classList.remove('noBackground');
 
//Use Destructuring assigment to extract properties from data object.
const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster, BoxOffice, Director, Country, Awards, Language, Type } = data;


const movieElement = document.createElement('div');
movieElement.classList.add('movie-info');
movieElement.innerHTML = `<h2>${Title}</h2>
                          <p><strong>Rating: &#11088;</strong>${imdbRating} / 10</p>`;

const movieGenreElement = document.createElement('div');
movieGenreElement.classList.add('movie-genre');

Genre.split(",").forEach(element=>{
    const p = document.createElement('p');
    p.innerText = element;
    movieGenreElement.appendChild(p);
});
movieElement.appendChild(movieGenreElement);

movieElement.innerHTML += `<p><strong>Released Date : </strong>${Released}</p>
                          <p><strong>Duration : </strong>${Runtime}
                          <p><strong>Cast : </strong>${Actors}
                          <p><strong>Plot : </strong>${Plot}
                          <p><strong>Boxoffice : </strong>${BoxOffice}
                          <p><strong>Director : </strong>${Director}
                          <p><strong>Country : </strong>${Country}
                          <p><strong>Awards : </strong>${Awards}
                          <p><strong>Language : </strong>${Language}
                          <p><strong>Type : </strong>${Type}`;

    //Creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src ="${Poster}"/>`;
    

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
    

}
//function to display Error message

const showErrorMessage = (message) =>{
    movieContainer.innerHTML=  `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');

}

//Adding event listner to search form
searchForm.addEventListener('submit',(e)=> {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !==''){
        showErrorMessage("Fething  Movie Information....");
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter movie name  to get movie information..");

    }
    
});

