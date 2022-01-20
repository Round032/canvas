import "../core/document";

try {
  d3_document.createElement("div").style.setProperty("opacity", 0, "");
} catch (error) {
  d3_attr = function(element, name, value) { element.setAttribute(name, value + ""); };
  d3_attrNS = function(element, space, local, value) { element.setAttributeNS(space, local, value + ""); };
  d3_style = function(element, name, value, priority) { element.style.setProperty(name, value + "", priority); };
}
