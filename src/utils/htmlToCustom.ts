export const htmlToCustom = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
      return Array.from(doc.body.children).map((element, index) => {
  const id = element.id || `e-${index}`;
  if (!element.id) element.setAttribute('id', id);
  return {
    tagName: element.tagName,
    attributes: { ...Array.from(element.attributes).reduce((acc: any, attr) => ({ ...acc, [attr.name]: attr.value }), {}), id },
    content: element.textContent?.trim() || '',
  };
  });
};

// 추후 id가 고정되도록 변경해야함