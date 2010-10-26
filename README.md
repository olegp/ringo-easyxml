# ringo-easyxml

One way converter from XML to JSON. Usage:

    var {XMLtoJSON} = require("easyxml");
    var xml = '<a><b>c</b></a>';
    var json = XMLtoJSON(xml);

Turns child nodes with the same name into arrays so that lists are easier
to work with.

`<body><item>1</item><item>2</item></body>` becomes `body: {item: ["1", "2"]}`
     
Turns XML node attributes into object attributes,
the children are placed inside a special attribute named "_":

`<body a="a">whatever</body>` becomes `body: {_a: "a", _: "whatever"}`

For options, take a look at testOptions in `test/all.js.`

You can also pass in E4X XML objects in directly, so these work:

    XMLtoJSON(new XML('<a><b>c</b></a>'));
    XMLtoJSON(require('wraps/tagsoup').parse("http://news.ycombinator.com/"));

