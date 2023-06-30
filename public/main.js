const select = document.querySelector('select')

const getVehicleInfo = () => {
    axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json") // API for Makes
        .then(response => {
            console.log(response.data.Results)
            let { Results } = response.data
            Results.forEach(vehicleObj => {
                let option = document.createElement('option')
                let { Make_Name } = vehicleObj
                option.value = Make_Name
                option.textContent = Make_Name
                select.appendChild(option)
            
            })
        })
        .catch(err => console.log(err))
}




getVehicleInfo()