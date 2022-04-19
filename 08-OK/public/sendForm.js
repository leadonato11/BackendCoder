const article = document.getElementById("article");
const price = document.getElementById("price");
const thumbnail = document.getElementById("thumbnail");
const button = document.getElementById("sendForm");

async function postData(url = "", data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

button.addEventListener("click", async () => {
  try {
    const data = {
      nombre: article.value,
      precio: price.value,
      thumbnail: thumbnail.value,
    };

    article.value = price.value = "";
    const url = "http://localhost:8080/api/productos";

    response = await postData(url, data);
  } catch (err) {
    console.error(err);
  }
});
