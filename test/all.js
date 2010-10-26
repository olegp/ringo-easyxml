include('assert');

var {E4XtoJSON} = require("easyxml");
var {get} = require("ringo/httpclient");

exports.setUp = function () {
}

exports.testBasic = function() {
  var xml = '<a><b>c</b></a>';
  var json = E4XtoJSON(xml);
  equal(json.b, "c");
}

exports.testAttribute = function() {
  var xml = '<a><b c="d"/></a>';
  var json = E4XtoJSON(xml);
  equal(json.b._c, "d");
}

exports.testOptions = function() {
  var xml = '<a><b c="d">e</b></a>';
  
  var json1 = E4XtoJSON(xml);
  equal(json1.b._c, "d");
  equal(json1.b._, "e");
  
  var json2 = E4XtoJSON(xml, {simple: ["b"]});
  equal(json2.b, "e");
  
  var json3 = E4XtoJSON(xml, {ignored: ["c"]});
  equal(json3.b, "e");
  
  var json4 = E4XtoJSON(xml, {prefix: ""});
  equal(json4.b.c, "d");
}

exports.testCDATA = function() {
  var xml = '<a><b><![CDATA[<c>d</c>]]></b></a>';
  var json = E4XtoJSON(xml);
  equal(json.b, "<c>d</c>");
}

if (require.main == module.id) {
    require('test').run(exports);
}
