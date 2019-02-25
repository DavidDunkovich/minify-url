export default longUrl => {
  return fetch("/api/addUrl", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ longUrl })
  }).then(response => response.json());
};
