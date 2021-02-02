import { api } from '.';
import { getOrders, getOrdersByDate, getOrdersByID, getUserByID, getUsers, getOrdersFromUser, base } from './airtable';
import projectData from '../package.json';
import { getShops, getShopByID } from './getShops';

api.get('/', async (req, res) => {
    res.json({
        version: projectData.version,
        author: projectData.author,
        description: projectData.description,
        bugs: projectData.bugs,
        packages: projectData.dependencies,
    })
})

api.post('/orders/new', async ({ body: newOrder }, res) => {
    console.log(newOrder)
    const resp = await base('orders').create([{
        fields: {
            order: newOrder.order,
            comment: newOrder.comment,
            users: newOrder.users,
            amount: newOrder.amount,
            shop: newOrder.shop,
            otherShop: newOrder.otherShop,
            time: new Date()
        }
    }])
    
    res.json(resp);
})

api.post('/orders/reorder', async ({ query: { id: orderId }, body: { users, amount, otherShop } }, res) => {
    const [{ order, comment, shop }] = await getOrdersByID(orderId);
    const resp = await base('orders').create([{
        fields: {
            order,
            comment,
            users,
            amount,
            shop,
            time: new Date()
        }
    }])
    
    res.json(resp);
})

api.get('/orders/:queryParam?/:query?/', async ({ params: { queryParam, query }}, res) => {  
    switch (queryParam) {
        case 'time':
            res.json(await getOrdersByDate(query));
            break;
        case 'nerds' || 'users':
            res.json(await getOrdersFromUser(query));
            break;
        default:
            res.json(await getOrders())
            break;
    }
    
})

api.get('/order/:id', async ({ params }, res) => {
    res.json(await getOrdersByID(params.id));
})

api.get('/shops/:id?', async ({ params }, res) => {
    if (!params.id) res.json(await getShops())
    else res.json(await getShopByID(params.id))
})

api.get(['/nerds/:id?', '/users/:id?'], async ({ params }, res) => {
    if (!params.id) res.json(await getUsers())
    else res.json(await getUserByID(params.id))
})

api.get('*', ({ cookies, route, query: { showDetails, ...otherQueries }, params, originalUrl, url, headers, method, ...req}, res) => {
    res.status(404);
    if (showDetails != 'true') res.json({ error: 'route not found', status: 404, method });
    else res.json({
        error: 'route not found',
        status: 404,
        method,
        request: {
            headers,
            originalUrl,
            url,
            cookies,
            query: otherQueries,
            params
        }
    });
})