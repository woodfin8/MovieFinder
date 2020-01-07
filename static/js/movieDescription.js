function movieDescription(urlFilm) {
    console.log(urlFilm);
    d3.json(urlFilm)
        .then(data => {
            console.log(data);

            document.getElementsByClassName(".img-poster").innerHTML = "";

            let selection = d3.select(".img-poster")
                .selectAll(".Div")
                .data(data);

            d3.select("#poster")
                .selectAll(".img-poster")
                .data(data)
                .enter()
                .append("div")
                .html(data =>
                    `<img class="rounded" 
                    src=${data.Poster}
                    style="width: 18rem"
                    alt="No Movie Poster Avaliable">`);
        })
};