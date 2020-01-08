function movieDescription(urlFilm) {

    d3.json(urlFilm)
        .then(data => {
            console.log(data.Poster);

            // Deletes all of the child nodes in the div with img-poster class
            d3.select(".img-poster").html("");



            d3.select(".img-poster")
                .data(data)
                .enter()
                .insert("img")
                .html(data =>
                    `<img class="rounded" 
                    src=${data.Poster}
                    style="width: 18rem"
                    alt="No Movie Poster Avaliable">`);
        })
};