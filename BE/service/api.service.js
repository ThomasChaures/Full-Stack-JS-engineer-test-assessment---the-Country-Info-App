const DATE_NAGER_API = "https://date.nager.at/api/v3";

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error ${url} (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error ${url}:`, error.message);
    throw error;
  }
};

export const getAvailableCountries = async () => {
  return await fetchData(`${DATE_NAGER_API}/AvailableCountries`);
};

export const getCountryInfo = async (countryCode) => {
    const info = await fetchData(`${DATE_NAGER_API}/CountryInfo/${countryCode}`);
    const pob = await fetchData(
      `https://countriesnow.space/api/v0.1/countries/population`
    );
    const correctPob = pob.data.find(p => info.commonName === p.country)
    const flag = await fetchData(`https://countriesnow.space/api/v0.1/countries/flag/images`);
    const correctFlag = flag.data.find(f => countryCode === f.iso2); 


    const snap = {
        name: info.commonName,
        flag: correctFlag.flag,
        pob: correctPob.populationCounts,
        borders: info.borders

    }
    
    return { snap};
  };
  
