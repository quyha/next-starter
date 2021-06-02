const DEFAULT_SEO = {
    title: 'My site',
    description: 'This is my site',
    additionalMetaTags: [
        {
            property: 'theme-color',
            content: '#FFFFFF',
        },
        {
            property: 'msapplication-TileColor',
            content: '#FFFFFF',
        },
        {
            property: 'msapplication-TileImage',
            content: '/rel/ms-icon-144x144.png',
        },
    ],
    additionalLinkTags: [
        {
            rel: 'manifest',
            href: '/rel/manifest.json',
        },
        {
            rel: 'icon',
            href: '/rel/android-icon-192x192.png',
            size: '192x192',
            type: 'image/png',
        },
        {
            rel: 'icon',
            href: '/rel/favicon-96x96.png',
            size: '96x96',
            type: 'image/png',
        },
        {
            rel: 'icon',
            href: '/rel/favicon-32x32.png',
            size: '32x32',
            type: 'image/png',
        },
        {
            rel: 'icon',
            href: '/rel/favicon-16x16.png',
            size: '16x16',
            type: 'image/png',
        },
        {
            rel: 'apple-touch-icon',
            href: '/rel/apple-icon-60x60.png',
            sizes: '60x60',
        },
        {
            rel: 'apple-touch-icon',
            href: '/rel/apple-icon-72x72.png',
            sizes: '72x72',
        },
        {
            rel: 'apple-touch-icon',
            href: '/rel/apple-icon-76x76.png',
            sizes: '76x76',
        },
        {
            rel: 'apple-touch-icon',
            href: '/rel/apple-icon-114x114.png',
            sizes: '114x114',
        },
        {
            rel: 'apple-touch-icon',
            href: '/rel/apple-icon-120x120.png',
            sizes: '120x120',
        },
        {
            rel: 'apple-touch-icon',
            href: '/rel/apple-icon-144x144.png',
            sizes: '144x144',
        },
        {
            rel: 'apple-touch-icon',
            href: '/rel/apple-icon-152x152.png',
            sizes: '152x152',
        },
        {
            rel: 'apple-touch-icon',
            href: '/rel/apple-icon-180x180.png',
            sizes: '180x180',
        },
        {
            rel: 'apple-touch-icon',
            href: '/rel/apple-icon-57x57.png',
            sizes: '57x57',
        },
    ],
    openGraph: {
        type: 'website',
        locale: 'VI',
        url: 'https://www.url.ie/',
        site_name: 'My site',
        title: 'My site',
        description: 'This is my site',
    },
};

export default DEFAULT_SEO;