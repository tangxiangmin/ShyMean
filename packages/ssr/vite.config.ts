import {defineConfig} from 'vite'

// @ts-ignore
import path from "path";

const highLightPlugin = (isSSR) => {
    const virtualModuleId = 'virtual:highlight.js'
    const resolvedVirtualModuleId = '\0' + virtualModuleId

    return {
        name: 'highlightPlugin',
        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        load(id) {
            if (id === resolvedVirtualModuleId) {
                if (!isSSR) {
                    return `const val = window.hljs; export default val`
                } else {
                    return `import highlight from 'highlight.js'; export default highlight`
                }

            }
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig((options) => {
    const development = options.mode === 'development'
    const isSSR = process.env.BUILD_TARGET === 'ssr'
    const plugins = []
    plugins.push(highLightPlugin(isSSR))
    const buildConfig = isSSR ? {} : {
        // https://rollupjs.org/guide/en/#outputglobals
        rollupOptions: {
            // external: ['highlight.js'],
            output: {
                // format: 'iife', // 使用了iife、umd就不能使用manualChunks，这里需要考虑一下怎么使用，解决办法，使用vite 虚拟模块插件
                // globals: {
                //     'highlight.js': "window.hljs"
                // },
                manualChunks: (id: string) => {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    } else {
                        return 'custom';
                    }
                }
            }
        },
    }

    return {
        server: {
            hmr: development
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            },
        },
        base: development ? '/' : '//cdn.shymean.com/',
        // base: development ? '/' : '/dist/client/',
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/style/_config";@import "@/style/_mixins";@import "@/style/_extend";`,
                },
            },
        },
        plugins,
        build: buildConfig,
        esbuild: {
            jsxFactory: 'h',
            jsxFragment: 'Fragment',
            jsxInject: 'import {h} from "@shymean/react-vue";',
            target: 'es2020',
            format: 'esm'
        },
    }
})
