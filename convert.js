const CURRENCY_LIST_API_URL = "https://api.apilayer.com/exchangerates_data/symbols";
const select1 = document.getElementById("currency-select-1");
//const selectButton = document.getElementById("select-button");
const select2 = document.getElementById("currency-select-2");
const quantity = document.getElementById("quantity");
const form = document.getElementById("form");
const testButton = document.getElementById("test-button");
const displayCurrency1 = document.getElementById("display-one");
const displayCurrency2 = document.getElementById("display-two");


//const CURRENCY_CONVERT_API_URL = `
//https://openexchangerates.org/api/convert/${quantity}/${select1.value}/${select2.value}?//app_id=5e907786a3//6e40d286489fafa6f40438`;
//const options = {method: 'GET', headers: {accept: 'application/json'}};
//const CURRENCY_CONVERT_API_URL = `https://openexchangerates.org/api/convert/null/Required/Required?app_id=Required&app_id=5e907786a36e40d286489fafa6f40438`

/*
fetch("https://openexchangerates.org/api/currencies.json")
  .then(response => response.json())
  .then(function(data){
  console.log(data)
})
*/
//const myHeaders = new Headers();
//myHeaders.append("apikey", "IeRpmCAtHBpPHyyx4p6zoHu4G9cElLmx");

//const requestOptions = {
//  method: 'GET',
// redirect: 'follow',
// headers: myHeaders
//};


const myHeaders = new Headers();
myHeaders.append("apikey", "IeRpmCAtHBpPHyyx4p6zoHu4G9cElLmx");

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

//fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
 //   .then(response => response.text())
 //   .then(result => console.log(result))
 //   .catch(error => console.log('error', error));

const myHeadersConvert = new Headers();
myHeadersConvert.append("apikey", "IeRpmCAtHBpPHyyx4p6zoHu4G9cElLmx");

const requestOptionsConvert = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeadersConvert
};

//fetch("https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=USD&amount=1", requestOptionsConvert)
  //  .then(response => response.text())
  //  .then(result => console.log(result))
  //  .catch(error => console.log('error', error));
//getListOfCurrencies();
//convert()


form.addEventListener("submit", async function(event){
    event.preventDefault();
    //const convertObject = await convert();
    // console.log("hi")
    //console.log(convertObject)
    //await convert()
    await displayResultElements()
})


window.addEventListener("load", async function(){
    await loadOptions()
   // const allCurrencies = await getListOfCurrencies();
    //console.log(allCurrencies)
   // Object.entries(allCurrencies).forEach((item) => populateOptions(item, select1))
   // Object.entries(allCurrencies).forEach((item) => populateOptions(item, select2))
    //Problems here because its not multiple objects its one massive one
    //populateOptions(allCurrencies.USD, select1)
    //console.log(Object.entries(allCurrencies))
    //console.log("hi")


})

async function loadOptions(){
    const allCurrencies = await getListOfCurrencies();
    //console.log(allCurrencies)
    Object.entries(allCurrencies).forEach(item => populateOptions(item, select1))
    Object.entries(allCurrencies).forEach(item => populateOptions(item, select2))
    //Object.keys(allCurrencies).forEach(item => populateOptions(item, select2))

}


async function getListOfCurrencies (){
    const currencies = await fetch(CURRENCY_LIST_API_URL, requestOptions)
    const currencyObj = await currencies.json()
    console.log(currencyObj.symbols)
    return currencyObj.symbols

}

async function convert (){
    const inputFrom = select1.value
    const inputTo = select2.value
    const inputQuantity = quantity.valueAsNumber
    const firstThreeInputFrom = inputFrom.slice(0, 3);
    const firstThreeInputTo = inputTo.slice(0, 3);
    //const currencyKeys = await getListOfCurrencies()
    //Object.keys(currencyKeys)
    const convertUrl = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${firstThreeInputTo}&from=${firstThreeInputFrom}&amount=${inputQuantity}`, requestOptionsConvert)
    const convertObj = await convertUrl.json()
    console.log(convertObj.result)
    return convertObj.result
}

function populateOptions(currencyObject, spawnPoint = select1){
    const newEl = document.createElement("option")
    newEl.innerHTML = currencyObject

    spawnPoint.appendChild(newEl)

}

async function displayResultElements () {
    //const inputSelect1 = select1.value
    //const inputSelect2 = select2.value
    //const inputQuantity = quantity.value
    const result = await convert();

    console.log(result)
    displayCurrency1.innerHTML =  quantity.value + select1.value + "(s)";
    displayCurrency2.innerHTML =  result + select2.value + "(s)";

}