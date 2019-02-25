export default () => {
  const windowLocation = window.location.href.toString();

  fetch(windowLocation, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ windowLocation })
  })
    .then(response => response.json())
    .then(longUrl => {
      if (longUrl) {
        window.location.replace(longUrl);
      }
    });
};
