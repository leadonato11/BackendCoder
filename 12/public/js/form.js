const socket = io();
socket.emit("loadProducts");

socket.on("productCreated", (newProduct) => {
  console.log("Se creó un producto", newProduct);
  attachRow(newProduct);
});

socket.on("productsLoaded", (articles) => {
  // Se puede utilizar "once" tambien.
  console.log(articles);

  articles.forEach((article) => {
    attachRow(article);
  });
});



const attachRow = (product) => {
  const tableBody = document.getElementById("tableBody");
  const row = `<tr class="trProd">
                <td>${product.nombre}</td>
                <td>$${product.precio}</td>
                <td><img class="picThumb" src="${product.thumbnail}" alt="Imagen de producto"></td>
              </tr>`;

  tableBody.innerHTML += row;
};

const chatMessage = (message) => {
  const messageBox = document.getElementById("messageBox")
  const messageCtn = `<div class="messagesCtn">
                        <p class="userEmail">${message.username}</p>
                        <p class="messageDate">[${message.time}]:</p>
                        <p class="userMessage">${message.text}</p>
                      </div>`

  messageBox.innerHTML += messageCtn
}

const title = document.getElementById("title");
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

button.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const data = {
      nombre: title.value,
      precio: price.value,
      thumbnail: thumbnail.value,
    };

    console.log(data);
    title.value = price.value = "";
    const url = "http://localhost:8080/api/productos";

    response = await postData(url, data);

    location.reload();
  } catch (err) {
    console.error(err);
  }
});
