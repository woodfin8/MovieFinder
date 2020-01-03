let path = "../data/dummydata.json"

function descriptionBuilder() {
    d3.json(path)
        .then(d => {
            let data = d[0];
            console.log(data);

            let title = d[0].Title;
            let year = d[0].Year;
            let rated = d[0].Rated;
            let runtime = d[0].Runtime;
            let genre = d[0].Genre;
            let poster = d[0].Poster;
            let director = d[0].Director;
            let actors = d[0].Actors;
            let plot = d[0].Plot;

            // Put in the Poster
            d3.select(".img-rounded")
                .selectAll("div")
                .data(data)
                .enter()
                .append("div")
                .classed("col-md-4", true)
                .html(data => `<img src=${data.Poster}
                    alt="No Movie Poster Avaliable"
                    style="width: 18rem">
                    </img>`
                );
        });
};

descriptionBuilder();