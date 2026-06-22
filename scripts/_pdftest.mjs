import { pdf } from "pdf-to-img";
const doc = await pdf("C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0794 - Alexis Gosset/alexis-coach-welcome-pack/output/Alexis_Coach_Welcome_Pack_FR.pdf", { scale: 1.5 });
console.log("alexis pages:", doc.length);
