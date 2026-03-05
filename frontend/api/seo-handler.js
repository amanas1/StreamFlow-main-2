
export default async function handler(req, res) {
    res.setHeader('X-SEO-DEBUG', 'Minimal-Active');
    return res.status(200).send('SEO Handler is reachable');
}
