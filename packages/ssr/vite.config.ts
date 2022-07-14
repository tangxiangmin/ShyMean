import {defineConfig} from 'vite'

// @ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            //define global scss variable
            scss: {
                additionalData: `
@import "@/style/_config";
@import "@/style/_mixins";
@import "@/style/_extend";`,
            },
        },
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: 'import {h} from "@shymean/react-vue";',
        target: 'es2020',
        format: 'esm'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    },
})
