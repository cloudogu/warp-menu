import {defineConfig} from "vite";
import {viteStaticCopy} from "vite-plugin-static-copy";
import zipPack from "vite-plugin-zip-pack";
import {readFileSync} from "fs";
import {resolve} from "path";

const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));
const warpVersion = packageJson.version;

export default defineConfig(({command, mode}) => {
    const config = {
        plugins: [
            zipPack({
                inDir: "target/warp",
                outDir: "target",
                pathPrefix: "warp",
                outFileName: 'warp-v' + warpVersion + '.zip',
            }),
            viteStaticCopy({
                targets: [
                    {
                        src: 'src/generated.css',
                        dest: '',
                        rename: "warp.css"
                    },
                ]
            }),
        ],
        server: {
            open: 'sample/index.html',
            watch: {
                usePolling: true,
            },
        },
        build: {
            rollupOptions: {
                input: {
                    main: './src/warp.js',
                },
                output: {
                    format: 'iife',
                    entryFileNames: 'warp.js',
                },
            },
            minify: true,
            outDir: 'target/warp',
            chunkSizeWarningLimit: 2048,
        }
    };

    return config;
});
