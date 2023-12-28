import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from '../../../xata';

const xata = getXataClient()

export async function PATCH(request: Request, response: NextApiResponse) {
    const {id, value, increment, isAdd, wallet} = await request.json();
    
    if (isAdd) {
        await xata.db.Tokenomics.update(id, {votes: value + increment});
        await xata.db.Wallets.createOrUpdate(wallet, {[id]: true});
    }
    else {
        await xata.db.Tokenomics.update(id, {votes: value - increment}); 
        await xata.db.Wallets.createOrUpdate(wallet, {[id]: false});
    }

    return new Response("Post Successful");
}

export async function GET(request: Request) {
    return new Response("hi");
}
