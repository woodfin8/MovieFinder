chart.listen("pointClick", function (e) {
    let title = e.point.get('title');
    console.log(title);

    let urlfilm = `/selection/${title}`;
    console.log(urlfilm)
});

// function descriptionBuilder() {
//     init();
//     d3.json(urlfilm)
//         .then(urlfilm => {
//             console.log(urlfilm);

//             // document.getElementById("Poster").innerHTML = "";

//             // let selection = d3.select("#poster")
//             //     .selectAll(".Div")
//             //     .data(data);

//             // Put in the Poster
//             // d3.select("#poster")
//             //     .selectAll(".img-poster")
//             //     .data(data)
//             //     .enter()
//             //     .append("div")
//             //     .html(data =>
//             //         `<img class="rounded" 
//             //         src=${data.Poster}
//             //         style="width: 18rem"
//             //         alt="No Movie Poster Avaliable">`);
//         });
// };

// descriptionBuilder();