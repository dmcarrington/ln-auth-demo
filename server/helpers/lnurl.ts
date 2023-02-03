const lnurl = require('lnurl');
import 'dotenv/config';

const lnurlServer = lnurl.createServer({
	host: 'localhost',
    url: process.env.SERVER_HOST_URL,
    port: process.env.PORT,
    endpoint: "/api/user/lnurl",
    auth: {
		apiKeys: [],
	},
    lightning: {
		backend: 'lnd',
		config: {
			hostname: process.env.LND_RPC_URL,
			protocol: "http", // http if over tor, https otherwise
			cert: {data: process.env.LND_TLS_VALUE},
            macaroon: {data: process.env.LND_MACAROON_VALUE}
		}
	},
	store: {
		backend: 'memory',
	},
});

export default lnurlServer;