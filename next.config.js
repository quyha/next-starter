module.exports = {
    future: {
        webpack5: true,
    },
    webpack(config) {
        config.module.rules[2].oneOf.forEach((moduleLoader, i) => {
            Array.isArray(moduleLoader.use) &&
            moduleLoader.use.forEach((l) => {
                if (
                    l.loader.includes('css-loader') &&
                    !l.loader.includes('postcss-loader')
                ) {
                    const { getLocalIdent, ...others } = l.options.modules;
        
                    l.options = {
                        ...l.options,
                        modules: {
                            ...others,
                            exportLocalsConvention: 'camelCaseOnly',
                            localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:6]' : '[name]_[local]__[hash:base64:5]',
                        },
                    };
                }
            });
        });
        return config;
    },
};