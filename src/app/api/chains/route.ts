import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from '../../../xata';

const xata = getXataClient()

export async function POST(request: Request, response: NextApiResponse) {
    const {id, value, wallet} = await request.json();
    const chain = await xata.db.Chains.read(id);
    
    await xata.db.Chains.createOrUpdate(id, {votes: (chain?.votes || 0) + 1});
    await xata.db.Wallets.createOrUpdate(wallet, {voted_chain: id});

    return new Response("Post Successful");
}