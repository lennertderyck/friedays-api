import { getUsers } from "./airtable";
import { getShops } from "./getShops";

Array.prototype.getFields = function () {
    return this.map(({ id, fields }) => {
        const [ idFromArray ] = id;
        return { 
            id: idFromArray !== 'r' ? idFromArray : id,
            ...fields,
        }
    })
}

Array.prototype.addOrderMetaData = async function () {
    const nerds = await getUsers();
    const shops = await getShops();
    
    return this.map(({ users, shop, ...otherValues }) => {
        const [ user ] = users;
        const orderer = nerds.find(({ id }) => id === user)
        const shopDetails = shop && shops.find(({ recordid }) => recordid === shop)
        
        return { users, orderer, shopDetails, ...otherValues }
    })
}