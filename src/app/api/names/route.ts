import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from '../../../xata';

const xata = getXataClient()

export async function POST(request: Request, response: NextApiResponse) {
    const {id, value, wallet} = await request.json();
    
    await xata.db.Names.createOrUpdate(id, {votes: value + 1});
    await xata.db.Wallets.createOrUpdate(wallet, {voted_name: id});

    return new Response("Post Successful");
}