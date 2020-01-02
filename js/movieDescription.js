let json = $.getJSON("../data/dummydata.json", d => d);

console.log(json);

let respJson = json.responseJSON;

console.log(respJson);
