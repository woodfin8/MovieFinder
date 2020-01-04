let urlgenre = `/movies/${genre}`

function descriptionBuilder() {
    d3.csv(urlgenre)
        .then(d => {
            let data = d[0];
            console.log(data.Poster);

            // let selection = d3.select("#poster")
            //     .selectAll(".Div")
            //     .data(data);

            // Put in the Poster
            document.getElementById("poster").innerHTML = ""
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
        });
};

descriptionBuilder();