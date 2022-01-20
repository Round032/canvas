import "../core/property";
import "../math/trigonometry";
import "svg";

d3.svg.arc = function() {
  var innerRadius = d3_property_number(arc, "innerRadius", d3_svg_arcInnerRadius),
      outerRadius = d3_property_number(arc, "outerRadius", d3_svg_arcOuterRadius),
      startAngle = d3_property_number(arc, "startAngle", d3_svg_arcStartAngle),
      endAngle = d3_property_number(arc, "endAngle", d3_svg_arcEndAngle);

  function arc() {
    var r0 = innerRadius(this, arguments),
        r1 = outerRadius(this, arguments),
        a0 = startAngle(this, arguments) + d3_svg_arcOffset,
        a1 = endAngle(this, arguments) + d3_svg_arcOffset,
        da = Math.abs(a1 - a0),
        df = da < π ? " 0 0" : " 0 1",
        fs = a1 < a0 ? ",0 " : ",1 ",
        ss = a1 < a0 ? ",1 " : ",0 ",
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);
    return da >= d3_svg_arcMax
      ? (r0
      ? "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1" + fs + "0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1" + fs + "0," + r1
      + "M0," + r0
      + "A" + r0 + "," + r0 + " 0 1" + ss + "0," + (-r0)
      + "A" + r0 + "," + r0 + " 0 1" + ss + "0," + r0
      + "Z"
      : "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1" + fs + "0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1" + fs + "0," + r1
      + "Z")
      : (r0
      ? "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + df + fs + r1 * c1 + "," + r1 * s1
      + "L" + r0 * c1 + "," + r0 * s1
      + "A" + r0 + "," + r0 + df + ss + r0 * c0 + "," + r0 * s0
      + "Z"
      : "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + df + fs + r1 * c1 + "," + r1 * s1
      + "L0,0Z");
  }

  arc.centroid = function() {
    var r = (innerRadius(this, arguments) + outerRadius(this, arguments)) / 2,
        a = (startAngle(this, arguments) + endAngle(this, arguments)) / 2 + d3_svg_arcOffset;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  return arc;
};

var d3_svg_arcOffset = -halfπ,
    d3_svg_arcMax = τ - ε;

function d3_svg_arcInnerRadius(d) {
  return d.innerRadius;
}

function d3_svg_arcOuterRadius(d) {
  return d.outerRadius;
}

function d3_svg_arcStartAngle(d) {
  return d.startAngle;
}

function d3_svg_arcEndAngle(d) {
  return d.endAngle;
}
