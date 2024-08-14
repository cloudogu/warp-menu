import {defineConfig, loadEnv} from "vite";
import {viteStaticCopy} from "vite-plugin-static-copy";
import zipPack from "vite-plugin-zip-pack";
import {readFileSync} from "fs";
import {resolve} from "path";

/*
 * Copyright (c) 2013 - 2014, TRIOLOGY GmbH
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * http://www.scm-manager.com
 */

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
                        src: 'src/warp-v2.css',
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
