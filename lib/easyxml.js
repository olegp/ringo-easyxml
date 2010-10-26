export("E4XtoJSON");

function toXML(string) {
  if(!(string instanceof XML)) {
    return new XML(string.replace(/^<\?xml\s+[^?]*\?>/g, "").trim());
  }
  return string;
}

function setOptions(options) {
  options = options || {};
  options.ignored = options.ignored || [];
  options.simple = options.simple || [];
  if(options.prefix == undefined) options.prefix = "_";
  if(options.body == undefined) options.body = "_";
  return options;
}

function toJSON(xml, options) {
  var r, children = xml.*, attributes = xml.@*, length = children.length();
  if(length == 0) {
    r = xml.toString();
  } else if(length == 1) {
    var text = xml.text().toString();
    if(text) {
      r = text;
    }
  }
  if(r == undefined) { 
    r = {};
    for each (var child in children) {
     var name = child.localName();
     var json = toJSON(child, options);
     if(!name) {
      // handle CDATA blocks that have name == null
      return json;
     }
     var value = r[name];
     if(value) {
       if(value.length) {
         value.push(json);
       } else {
         r[name] = [value, json]
       }
     } else {
       r[name] = json;
     }
    }
  }
  // handle attributes
  var simple = options.simple.indexOf(xml.localName()) != -1;
  if(!simple && attributes.length()) {
    var a = {}, c = 0;
    for each (var attribute in attributes) {
      var name = attribute.localName();
      if(options.ignored.indexOf(name) == -1) {
        a[options.prefix + name] = attribute.toString();
        c ++;
      }
    }
    if(c) {
      if(r) a[options.body] = r;
      return a;
    }
  }
  
  return r;
}

function E4XtoJSON(xml, options) {
  return toJSON(toXML(xml), setOptions(options));
}