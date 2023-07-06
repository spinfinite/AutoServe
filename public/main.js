const productsContainer = document.querySelector('#products-container')
const makeSelect = document.querySelector('#vehicleMake')
const modelSelect = document.querySelector('#vehicleModel')
const yearSelect = document.querySelector('#dateDropdown')
const displayInfo = document.querySelector('#results')
const displayButton = document.querySelector('#submit')
const displayProduct = document.querySelector('#submit')

const baseURL = `http://localhost:4000/api/products`
const productsCallback = ({data: products}) => displayProducts(products)
const errCallback = err => console.log(err.response.data)

const getProducts = () => axios.get(baseURL).then(productsCallback).catch(errCallback)

// Get all Makes using the Makes API
const getMake = () => {
    axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json") // API for Makes
        .then(response => {
            console.log(response.data.Results)
            let { Results } = response.data
            Results.forEach(vehicleObj => {
                let option = document.createElement('option')
                let { Make_Name } = vehicleObj
                option.value = Make_Name
                option.textContent = Make_Name
                makeSelect.appendChild(option)
            
            })
        })
        .catch(err => console.log(err))
}

// Get models based on the Makes and use the models API
const getModel = (evt) => {
    modelSelect.innerHTML=""
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${evt.target.value}?format=json`)
        .then(response => {
            console.log(response.data.Results)
            let { Results } = response.data
            Results.forEach(vehicleObj => {
                let option = document.createElement('option')
                let { Model_Name } = vehicleObj
                option.value = Model_Name
                option.textContent = Model_Name
                modelSelect.appendChild(option)

            })

        })
        .catch(err => console.log(err))
}
// Get the year of the vehicle and ensure that it does not go below 1981
const getYear = () => {
    //Earliest year is 1981 to be used. 
    let currentYear = new Date().getFullYear()
    console.log(currentYear)
    let earliestYear = 1981

    while (currentYear >= earliestYear) {
        //console.log(option)
        let option = document.createElement('option')
        option.text = currentYear
        option.value = currentYear
        yearSelect.appendChild(option)
        currentYear -= 1 
    }
       
}
// These results will display as soon as the vehicle information is received after the submit button is pressed
const getResults = (evt) => {
    evt.preventDefault()
    displayInfo.innerHTML=
    `
    <div class=item>
        <h2>Products</h2>
        <p> Below are the products available based on the vehicle provided: </p>
        <br>
        <p> Make:  ${makeSelect.value}  </p>
        <p> Model: ${modelSelect.value} </p>
        <p> Year:  ${yearSelect.value}  </p>
        <br>
        <h3>All terms include:</h3>
        <br>
        <p> Tire Rotation: Up to $30 pay per year </p>
        <p> Wiper Blade: Up to $30 pay per year </p>
        <p> Alignment: Up to $30 pay per year </p>

    </div>
     
     
    `
}

function createProductCard(product) {
    //console.log(product)
    const productCard = document.createElement('div')
    console.log(productCard)
    productCard.classList.add('product-card')

    productCard.innerHTML = 
    `
    <div>

        <button onclick="chooseProduct(${product.id})">
            <img imageURL: src=${product.imageURL}></img>
            <p> Term: ${product.title} </p>
            <p> OilChanges: ${product.OilChanges} </p>
            <p> BrakePads: ${product.BrakePads} </p>
            <p> Battery: ${product.Battery} </p>
            <p> CoolingSystem: ${product.CoolingSystem} </p>
            <p> Price: ${product.Price} </p>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="AMNDK3HZUGLCG" />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Add to Cart" />
            </form>
        </button>

    </div>
    <br>
    `

    productsContainer.appendChild(productCard)

}

function displayProducts(arr) {
    console.log(arr)
    productsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
        createProductCard(arr[i])
        
    }
    
}


getMake()
makeSelect.addEventListener("change", getModel)
getYear()
displayButton.addEventListener("click", getResults)
displayProduct.addEventListener("click",getProducts)


