import fetch from 'node-fetch';

export const getShops = async () => {
    const resp = await fetch('https://data.stad.gent/api/records/1.0/search/?dataset=koop-lokaal-horeca&q=&lang=en&rows=30&facet=postcode&facet=gemeente');
    const data = await resp.json();
    return await data.records;
}

export const getShopByID = async (id = '14a329c8c023ff18bdfa61d90a236f8812f156ad') => {
    const resp = await fetch(`https://data.stad.gent/api/records/1.0/search/?dataset=koop-lokaal-horeca&q=&facet=postcode&rows=30&facet=gemeente&facet=recordid&refine.recordid=${ id }`);
    const data = await resp.json();
    return data;
}