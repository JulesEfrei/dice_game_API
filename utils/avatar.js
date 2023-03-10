const fs = require("fs");

const generateAvatar = async (type = "adventurer", gender = "Female") => {
  const longHair = new Array(25)
    .fill(0, "0")
    .map((elm, index) =>
      index < 10 ? "long" + elm + index.toString() : "long" + index.toString()
    )
    .slice(1, 25)
    .join(",");

  const shortHair = new Array(19)
    .fill(0, "0")
    .map((elm, index) =>
      index < 10 ? "short" + elm + index.toString() : "short" + index.toString()
    )
    .slice(1, 19)
    .join(",");

  const url = `https://api.dicebear.com/5.x/${type}/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&hair=${
    gender === "Male" ? shortHair : longHair
  }
`;

  const req = await fetch(url);

  const svg = await req.body.getReader().read();
  const svgUint = svg.value;

  const svgBase64 = Buffer.from(svgUint).toString("base64");

  return svgBase64;
};

module.exports = generateAvatar;
