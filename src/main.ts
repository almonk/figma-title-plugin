// @ts-expect-error:
import title from "title";

export default async function () {
  let nodes = figma.currentPage.selection;
  let textNodes = nodes.filter((e) => {
    return e.type == "TEXT";
  });

  if (textNodes.length === 0) {
    figma.closePlugin("Select At Least 1 Text Node");
    return;
  }

  for (const node of textNodes) {
    formatNodeInSelection(node);
  }

  setTimeout(() => {
    figma.closePlugin(
      `Ran Smart Title Case on ${textNodes.length} Text ${pluralize(
        textNodes.length,
        "Node"
      )}`
    );
  }, 500);
}

// @ts-expect-error:
function formatNodeInSelection(node) {
  if (node.type == "TEXT") {
    let nodeFonts = node.getRangeAllFontNames(0, node.characters.length);
    loadFonts(nodeFonts).then(() => {
      node.characters = title(node.characters);
    });
  }
}

const pluralize = (count: number, noun: string, suffix = "s") =>
  `${noun}${count !== 1 ? suffix : ""}`;

// @ts-expect-error:
async function loadFonts(fonts) {
  // @ts-expect-error:
  const promises = fonts.map((font) => figma.loadFontAsync(font));
  await Promise.all(promises);
  return fonts;
}
