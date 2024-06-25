const container = document.getElementById("wainwrightsContainer");
const list = document.getElementById("wainwrights-list");
const form = document.getElementById("search-form");


const getWainwrights = async (searchField) => {
    const response = await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    const dataJson = await response.json();

    if(searchField == undefined){

        dataJson.forEach(wainwright => {
            // console.log(wainwright.name);
            addWainright(wainwright);
        });

    } else {

        const filteredJson = dataJson.filter(wainwright => wainwright.name.toLowerCase().includes(searchField.toLowerCase()));

        filteredJson.forEach(wainwright => {
            // console.log(wainwright.name);
            addWainright(wainwright);
        });
    }
}

getWainwrights();

const clearWainwrights = () => {
    list.innerHTML = "";
}


const addWainright = (wainwright) => {

    const wainwrightName = wainwright.name;
    const wainwrighHeightMetres = wainwright.heightMetres;
    const wainwrighHeightFeet = wainwright.heightFeet;    
    const wainwrightLatitude = wainwright.latitude;
    const wainwrightLongitude = wainwright.longitude;
    const wainwrightAreaName = wainwright.area.areaName;
    const wainwrightAreaLocalTowns = wainwright.area.localTowns;
    const wainwrightAreaAbout = wainwright.area.about;
    
    const newElement = document.createElement("li");
    newElement.innerText = wainwrightName;

    const newAttributesList = document.createElement("ul");

    const addAttributeToAttributesList = (list, attribute, value) => {
        const newAttribute = document.createElement("li");
        newAttribute.innerText = `${attribute}: ${value}`;
        list.appendChild(newAttribute)
    }

    addAttributeToAttributesList(newAttributesList, "Height (metres): ", wainwrighHeightMetres);
    addAttributeToAttributesList(newAttributesList, "Height (Feet: ", wainwrighHeightFeet);
    addAttributeToAttributesList(newAttributesList, "Latitude: ", wainwrightLatitude);
    addAttributeToAttributesList(newAttributesList, "Longitude: ", wainwrightLongitude);
    addAttributeToAttributesList(newAttributesList, "Area: ", wainwrightAreaName);
    addAttributeToAttributesList(newAttributesList, "Local Towns: ", wainwrightAreaLocalTowns);
    addAttributeToAttributesList(newAttributesList, "About The Area: ", wainwrightAreaAbout);

    newElement.appendChild(newAttributesList)
    list.appendChild(newElement);
}

form.addEventListener('submit', (event) => {
    clearWainwrights();
    event.preventDefault();
    const searchField = event.target["filter-wainright"].value;
    getWainwrights(searchField);
})








