let path = "../data/dummydata.json"

function descriptionBuilder() {
    d3.json(path)
        .then(d => {
            let data = d[0];
            console.log(data.Poster);

            // let selection = d3.select("#poster")
            //     .selectAll(".Div")
            //     .data(data);

            // Put in the Poster
            d3.select("#poster")
                .selectAll("Div")
                .data(data)
                .enter()
                .append("div")
                .classed("row img-rounded", true)
                .html(data =>
                    `<img class="rounded" 
                    src=${data.Poster}
                    style="width: 18rem"
                    alt="No Movie Poster Avaliable">`);
        });
};

descriptionBuilder();