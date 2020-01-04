let path = "../data/dummydata.json"

function descriptionBuilder() {
    d3.json(path)
        .then(d => {
            let data = d[0];
            console.log(data.Poster);

            // document.getElementById("Poster").innerHTML = "";

            // let selection = d3.select("#poster")
            //     .selectAll(".Div")
            //     .data(data);

            // Put in the Poster
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