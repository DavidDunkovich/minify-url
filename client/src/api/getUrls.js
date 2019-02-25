export default () => {
  return fetch("/api/getUrls").then(response => response.json());
};
