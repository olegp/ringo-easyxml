include('assert');

var {XMLtoJSON} = require("easyxml");
var {get} = require("ringo/httpclient");

exports.setUp = function () {
}

exports.testBasic = function() {
  var xml = '<a><b>c</b></a>';
  var json = XMLtoJSON(xml);
  equal(json.b, "c");
}

exports.testAttribute = function() {
  var xml = '<a><b c="d"/></a>';
  var json = XMLtoJSON(xml);
  equal(json.b._c, "d");
}

exports.testOptions = function() {
  var xml = '<a><b c="d">e</b></a>';
  
  var json1 = XMLtoJSON(xml);
  equal(json1.b._c, "d");
  equal(json1.b._, "e");
  
  var json2 = XMLtoJSON(xml, {simple: ["b"]});
  equal(json2.b, "e");
  
  var json3 = XMLtoJSON(xml, {ignored: ["c"]});
  equal(json3.b, "e");
  
  var json4 = XMLtoJSON(xml, {prefix: ""});
  equal(json4.b.c, "d");
}

exports.testCDATA = function() {
  var xml = '<a><b><![CDATA[<c>d</c>]]></b></a>';
  var json = XMLtoJSON(xml);
  equal(json.b, "<c>d</c>");
}

if (require.main == module.id) {
    require('test').run(exports);
}
