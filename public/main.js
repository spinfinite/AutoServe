const makeSelect = document.querySelector('select')
const modelSelect = document.querySelector('#vehicleModel')
const yearSelect = document.querySelector('#dateDropdown')


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
const getModel = evt => {
    modelSelect.innerHTML=""
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${evt.target.value}?format=json`)
        .then(response => {
            console.log(response.data)
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

getMake()
makeSelect.addEventListener("change", getModel)
getYear()

