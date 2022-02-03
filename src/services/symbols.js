const { default: Axios } = require("axios");

const _basePath = 'http://127.0.0.1:5000/';

async function loadAllSymbols(){
   const response = await Axios.get(`${_basePath}/symbols`);
   return response.data
}

async function getSymbolsAnalysis(symbolName){
   const response = await Axios.get(`${_basePath}/symbols/${symbolName}/details`);
   return response.data
}

async function addNewSymbol(newSymbol){
   const response = await Axios.post(`${_basePath}/symbols`, newSymbol);
   return response
}


module.exports = {loadAllSymbols, getSymbolsAnalysis, addNewSymbol}