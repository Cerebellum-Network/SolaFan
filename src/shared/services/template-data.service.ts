declare const window: any;

export const fetchTemplateData = () => {
  let data = {};

  try {
    data = JSON.parse(window.TEMPLATE_DATA || null);
  } catch (e) {
    console.error("Couldn't parse Template Data");
  }

  return data;
};
