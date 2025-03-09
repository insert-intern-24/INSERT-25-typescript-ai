export const parseHtmlToArray = (document: string): string[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(document, 'text/html');
    return Array.from(doc.body.children).map((element) => {
    return element.outerHTML;
  });
};
