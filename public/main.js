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
    //yearSelect.innerHTML=""
    let currentYear = new Date().getFullYear()
    console.log(currentYear)
    let earliestYear = 1981

    while (currentYear >= earliestYear) {
        //console.log(option)
        let option = document.createElement('option')
        option.text = currentYear
        option.value = currentYear
        //yearSelect.add(option)
        yearSelect.appendChild(option)
        currentYear -= 1 
    }
       
}
// These results will display as soon as the vehicle information is received after the submit button is pressed
const getResults = (evt) => {
    evt.preventDefault()
    displayInfo.innerHTML=
    `<p> Below are the products available based on the vehicle provided: </p>
    <br>
     <p> Make:  ${makeSelect.value}  </p>
     <p> Model: ${modelSelect.value} </p>
     <p> Year:  ${yearSelect.value}  </p>

     
     
    `
}

// const getProducts = () => {
//     axios.get(baseURL)
//     .then(productsCallback)

       
//     })

// }

function createProductCard(products) {
    const productCard = document.createElement('div')
    productCard.classList.add('product-card')

    productCard.innerHTML = 
    `
    <div>
    <p> ID: ${products.id} </p>
    <p> Title: ${products.title} </p>
    <p> OilChanges: ${products.OilChanges} </p>
    <p> BrakePads: ${products.BrakePads} </p>
    <p> Battery: ${products.Battery} </p>
    <p> CoolingSystem: ${products.CoolingSystem} </p>
    <p> TireRotation: ${products.TireRotation} </p>
    <p> WiperBlade: ${products.WiperBlade} </p>
    <p> Alignment: ${products.Alignment} </p>
    <p> Price: ${products.Price} </p>
    </div>
    `

    productsContainer.appendChild(productCard)

}

function displayProducts(arr) {
    productsContainer.innerHTML = ``
    for (let i = 0; i < arr.lentgh; i++) {
        createProductCard(arr[i])
    }
    
}


getMake()
makeSelect.addEventListener("change", getModel)
getYear()
displayButton.addEventListener("click", getResults)
displayProduct.addEventListener("change",getProducts)


