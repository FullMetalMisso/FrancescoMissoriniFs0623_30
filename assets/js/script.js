const disposizioneProdotti = document.querySelector(".scaffaleProdotti")

let arrayProdotti = [];

class Prodotti {
    constructor(_name, _description, _brand, _imageUrl, _price, _id) {
        this.name = _name;
        this.description = _description;
        this.brand = _brand;
        this.imageUrl = _imageUrl;
        this.price = _price;
        this.id = _id
        
    }
}

let nokia3310 = new Prodotti(
    "nokia 3310",
    "Indestructible cellphone",
    "Nokia",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nokia_3310_Blue_R7309170_%28retouch%29.png/800px-Nokia_3310_Blue_R7309170_%28retouch%29.png",
    "99"
);

let samsungSph = new Prodotti(
    "samsung SPH M100",
    "Telefono cellulare che fa da lettore mp3",
    "Samsung",
    "https://media-assets.wired.it/photos/615f317170d56d30183ff53f/master/w_2580%2Cc_limit/29d234cf-669e-4415-ae61-a5b6e1fa2bf8.jpg",
    "90"
);

let ericssonR380 = new Prodotti(
    "Ericsson R380",
    "schermo touch a scomparsa",
    "Ericsson",
    "https://media-assets.wired.it/photos/615f3171adb81ae4f94c6b0a/master/w_2580%2Cc_limit/4d5ffacf-36d2-4a42-9444-998588548b32.jpg",
    "99"
);
let sonyEricssonR520 = new Prodotti(
    "Ericsson R52",
    "Inaugurato era trasferimento dati",
    "Sony",
    "https://media-assets.wired.it/photos/615f3172edc5b3e16b8864a2/master/w_2580%2Cc_limit/1689e5e5-7fc8-4004-8884-86f6efd7c891.jpg",
    "95"
)

arrayProdotti.push(nokia3310, samsungSph, ericssonR380, sonyEricssonR520);


async function inviaProdotti() {
    for (let i = 0; i < arrayProdotti.length; i++) {
        const prodotto = arrayProdotti[i];
        try {
            const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
                method: "POST",
                body: JSON.stringify(/*prodotto*/),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMWVhMGZlMDMxZTAwMTliYTE2NTMiLCJpYXQiOjE3MDIwNTM2NDIsImV4cCI6MTcwMzI2MzI0Mn0.4u44kcEgazI1VIbqjcADzg_H8S71bqHIlcuemZhYvcY"
                }
            });
            const data = await response.json();
            console.log("Prodotto inviato con successo:", data);
        } catch (error) {
            console.error("Errore nell'invio del prodotto:", error);
        }
    }
}

inviaProdotti();


    function fetchProducts() {
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMWVhMGZlMDMxZTAwMTliYTE2NTMiLCJpYXQiOjE3MDIwNTM2NDIsImV4cCI6MTcwMzI2MzI0Mn0.4u44kcEgazI1VIbqjcADzg_H8S71bqHIlcuemZhYvcY",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => { 
                mostraProdotti(data);
            })
            .catch((error) => console.error("Errore nella chiamata GET:", error));
    }
    
    function mostraProdotti(prodotti) {
        disposizioneProdotti.innerHTML = "";
    
        prodotti.forEach((prodotto) => {
            disposizioneProdotti.innerHTML += `
            <div class="card mb-6 shadow-sm">
            <img src="${prodotto.imageUrl}" alt="${prodotto.name}" class="img-fluid">
            <div class="card-body">
                <h5 class="card-title">${prodotto.name}</h5>
                <p class="card-text">${prodotto.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="window.location.href='modifica.html?id=${prodotto._id}'">
                            Scopri di più
                        </button>
                    </div>
                    <small class="text-muted">${prodotto._id}</small>
                </div>
            </div>
        </div>`
        });
    }
    

fetchProducts();
mostraProdotti()
