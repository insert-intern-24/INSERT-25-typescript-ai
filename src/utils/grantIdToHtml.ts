export const grantIdToHtml = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return Array.from(doc.body.children).map((element, index) => {
    const id = element.id || `e-${index}`;
    if (!element.id) element.setAttribute('id', id);
    return element.outerHTML;
  });
};

// 추후 id가 고정되도록 변경해야함