'use strict';

const path = require('path');

const fs = require('fs-extra');
const { generateSymbolImage, getLinesFromImage } = require('ocr-tools');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

if (!argv.outDir) {
  throw new Error('outDir argument is required');
}

let outDir = path.resolve(argv.outDir);

async function generate() {
  await fs.mkdirp(outDir);
  const files = await fs.readdir(outDir);
  if (files.length > 0) throw new Error('outDir must be emtpy');

  const image = await generateSymbolImage({
    imageOptions: { fontSize: 24 }
  });
  const { lines } = getLinesFromImage(image);
  // eslint-disable-next-line no-await-in-loop
  for (let line of lines) {
    console.log(line);
    // for (let roi of line.rois) {
    //   const img = image.crop({
    //     x: roi.minX,
    //     y: roi.minY,
    //     width: roi.width,
    //     height: roi.height
    //   });
    //   await writeImages({
    //     image: img,
    //     generated: true,
    //     char
    //   });
    // }
  }
}

generate();
