import sharp from "sharp"; import fs from "fs"; import path from "path";
const DIR = process.argv[2]; const OUT = process.argv[3]; const COLS = +(process.argv[4]||3);
const files = fs.readdirSync(DIR).filter(f=>/\.(jpg|png)$/i.test(f)).sort();
const W=640, H=400;
const tiles = [];
for (let i=0;i<files.length;i++){
  const buf = await sharp(path.join(DIR,files[i])).resize(W,H,{fit:"cover",position:"top"}).png().toBuffer();
  const lab = Buffer.from(`<svg width="${W}" height="34"><rect width="${W}" height="34" fill="#000"/><text x="10" y="24" font-family="monospace" font-size="20" fill="#fff">${i+1}. ${files[i]}</text></svg>`);
  const cell = await sharp({create:{width:W,height:H+34,channels:3,background:"#111"}})
    .composite([{input:lab,top:0,left:0},{input:buf,top:34,left:0}]).png().toBuffer();
  tiles.push(cell);
}
const rows = Math.ceil(tiles.length/COLS);
const sheet = sharp({create:{width:W*COLS,height:(H+34)*rows,channels:3,background:"#111"}});
await sheet.composite(tiles.map((t,i)=>({input:t,top:Math.floor(i/COLS)*(H+34),left:(i%COLS)*W}))).jpeg({quality:82}).toFile(OUT);
console.log("sheet:",OUT,files.length,"tiles");
