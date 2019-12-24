import IPFS from 'ipfs'

const defaultOptions = {
    repo: String(Math.random() + Date.now()),
    EXPERIMENTAL: {
        pubsub: true
    },
    config: {
        Addresses: {
            Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
        }
    }
};
const plugin = {
    install(Vue, opts) {
        opts = opts ? opts.assign(defaultOptions) : defaultOptions;
        Vue.prototype.$ipfs = IPFS.create(opts)
    },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

export default plugin
