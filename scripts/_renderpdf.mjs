import { pdf } from "pdf-to-img";
import sharp from "sharp";

async function renderPages(pdfPath, outDir, prefix, pageNums, startIndex = 1) {
  const doc = await pdf(pdfPath, { scale: 2 });
  let idx = startIndex, page = 0, written = [];
  for await (const buf of doc) {
    page++;
    if (pageNums.includes(page)) {
      const out = `${outDir}/${prefix}-${idx}.jpg`;
      await sharp(buf).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
      written.push(out); idx++;
    }
    if (page >= Math.max(...pageNums)) break;
  }
  return written;
}

// Alexis: cover + 5 key spreads
const alexis = "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0794 - Alexis Gosset/alexis-coach-welcome-pack/output/Alexis_Coach_Welcome_Pack_FR.pdf";
const aw = await renderPages(alexis, "public/images/projects/alexis-gosset", "doc", [1,2,3,5,7,9]);
console.log("alexis docs:", aw.length);

// PrimeCore: cover (page 1) of each guide -> shows the full welcome pack system
const pcBase = "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0723 - Big Pete PDFs/image folder one/IMAGES RELATED TO POSTS/Client/Welcome Packs";
const pcFiles = ["Welcome_Pack.pdf","Onboarding_SOP.pdf","Training_Guide.pdf","Nutrition_Guidance.pdf","CheckIn_Guide.pdf","Sleep_Guide.pdf","PrimeCore_Standards.pdf"];
let i = 1;
for (const f of pcFiles) {
  await renderPages(`${pcBase}/${f}`, "public/images/projects/primecore-brand", "doc", [1], i);
  i++;
}
console.log("primecore docs:", i-1);
