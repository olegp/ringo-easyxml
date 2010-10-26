# ringo-easyxml

One way converter from E4X XML to JSON. Usage:

    var {E4XtoJSON} = require("easyxml");
    var xml = '<a><b>c</b></a>';
    var json = E4XtoJSON(xml);

Turns child nodes with the same name into arrays so that lists are easier
to work with.

    <body><item>1</item><item>2</item></body>

    body: {item: ["1", "2"]}
     
Turns XML node attributes into object attributes,
the children are placed inside a special attribute named "_":

    <body a="a">whatever</body>

    body: {_a: "a", _: "whatever"}

For other options, take a look at test/all.js.

