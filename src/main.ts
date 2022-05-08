// @ts-expect-error:
import title from "title";

export default async function () {
  let nodes = figma.currentPage.selection;
  let textNodes = nodes.filter((e)=>{return e.type == "TEXT"})

  if (textNodes.length === 0) {
    figma.closePlugin("Select At Least 1 Text Node")
    return
  }

  for (const node of textNodes) {
    if (node.type == "TEXT") {
      let nodeFonts = node.getRangeAllFontNames(0, node.characters.length);
      loadFonts(nodeFonts).then(() => {
        node.characters = title(node.characters);
      });
    }
  }

  setTimeout(() => {
    figma.closePlugin(`Ran Title on ${textNodes.length} Text Nodes`);
  }, 500);
}

// @ts-expect-error:
async function loadFonts(fonts) {
  // @ts-expect-error:
  const promises = fonts.map((font) => figma.loadFontAsync(font));
  await Promise.all(promises);
  return fonts;
}