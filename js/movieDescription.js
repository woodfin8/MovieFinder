function jsonReader() {
    d3.json("../data/dummydata.json").then(d => {
        console.log(d[0])
        return d[0]
    });
};

jsonReader();
