
//   <script src="https://d3js.org/d3.v4.min.js"></script>
 
var margin ={
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

//   text {
//     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
//     font-size: 20px;
//   }

  //var degToRad  =  (deg) => {return deg * Math.PI / 180};

  function deg2rad(deg) {
              return deg * Math.PI / 180;
      }
  
  function define_EndPoint(t, percentage) {
     return (t - (50/percentage )) * deg2rad(percentage*2.4); 
  }

  var svg = d3.select("body").append("svg")
    .attr("width", 960)
    .attr("height", 500)
    .append("g")
    .attr("transform", "translate(480,250)");

  var arc = d3.arc()
    .innerRadius(180)
    .outerRadius(205)
    .startAngle(deg2rad(-120))
    //.endAngle(function(t) { return (t-0.5) * deg2rad(240) ; });
    //.endAngle(function (t) { return (t-0.5) * 4; });
    .endAngle(function (t) { return define_EndPoint(t, 100) });

  svg.append("path")
    .attr("id", "path")
      .attr("fill", "#d8b216")
    .attr("d", arc);

  svg.append("text")
    .attr("x", 18)
    .attr("dy", 18)
    .append("textPath")
      .attr("id", "txtpath")
    .attr("class", "textpath")
    .attr("xlink:href", "#path")
    .text("100% curved textPath!");

//===================================    
  var arc2 = d3.arc()
    .innerRadius(150)
    .outerRadius(175)
    //.startAngle(-2)
    .startAngle(deg2rad(-120))
    //.endAngle(function(t) { return (t-0.5) * deg2rad(240) ; });
    //.endAngle(function (t) { return (t-1) * 2; });
    .endAngle(function (t) { return define_EndPoint(t, 75) });
      //.endAngle(function (t) { return define_End(t, 20) });

  svg.append("path")
    .attr("id", "path2")
      .attr("fill", "#33c6c6")
    .attr("d", arc2);

  svg.append("text")
    .attr("x", 18)
    .attr("dy", 18)
    .append("textPath")
      .attr("id", "txtpath2")
    .attr("class", "textpath")
    .attr("xlink:href", "#path2")
    .text("75% curved");

//===================================
  var arc3 = d3.arc()
    .innerRadius(120)
    .outerRadius(145)
    .startAngle(deg2rad(-120))
    .endAngle(function (t) { return define_EndPoint(t, 25) });

  svg.append("path")
    .attr("id", "path3")
      .attr("fill", "#d55259")
    .attr("d", arc3);

  svg.append("text")
    .attr("x", 18)
    .attr("dy", 18)
    .append("textPath")
      .attr("id", "txtpath3")
    .attr("class", "textpath")
    .attr("xlink:href", "#path3")
    .text("25% curved");
  
  var transition = svg.transition()
    .duration(5000);

  transition.selectAll("#path")
    .attrTween("d", function () { return arc; });

  transition.selectAll("#txtpath")
    .attrTween("xlink:href", function () { return function () { return "#path"; }; });
  
  transition.selectAll("#path2")
    .attrTween("d", function () { return arc2; });

  transition.selectAll("#txtpath2")
    .attrTween("xlink:href", function () { return function () { return "#path2"; }; });    

  transition.selectAll("#path3")
    .attrTween("d", function () { return arc3; });

  transition.selectAll("#txtpath3")
    .attrTween("xlink:href", function () { return function () { return "#path3"; }; });  