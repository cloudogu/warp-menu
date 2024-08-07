import { resolve } from 'path'
import {defineConfig, loadEnv} from "vite";
import viteImagemin from 'vite-plugin-imagemin'
import {viteStaticCopy} from 'vite-plugin-static-copy'
import cleanPlugin from 'vite-plugin-clean';


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

export default defineConfig(({command, mode}) => {
    const config = {
        plugins: [
            viteImagemin(
                {
                    optipng: {optimizationLevel: 7}
                }
            ),
            viteStaticCopy({
                targets: [
                    {
                        src: 'node_modules/ces-theme/dist/fonts/*.{ttf,woff,eot}',
                        dest: '../.tmp/warp/fonts'
                    },
                    {
                        src: 'node_modules/ces-theme/dist/fonts/*.{ttf,woff,eot}',
                        dest: 'warp/fonts'
                    },
                    {
                        src: 'src/images/*.svg',
                        dest: '../.tmp/images'
                    },
                    {
                        src: 'node_modules/ces-theme/dist/images/logo/blib-white-160px.png',
                        dest: '../.tmp/images'
                    },
                    {
                        src: 'src/images/*.png',
                        dest: '../.tmp/images'
                    },
                    {
                        src: 'src/*.js',
                        dest: '../.tmp/warp'
                    },
                    {
                        src: 'warp.js',
                        dest: '../.tmp/warp'
                    },
                    {
                        src: 'src/images/*.png',
                        dest: '../.tmp/images'
                    }
                ]
            }),
            cleanPlugin(
                {
                    targetFiles: ['target', '../.tmp']
                }
            )
        ],
        define: {
            "process.env": process.env
        },
        build: {
            lib: {
                entry: resolve(__dirname, 'src/warp.js'),
                name: 'warp-menu',
                fileName: 'warp-menu',
            },
            minify: true,
            outDir: 'target',
            chunkSizeWarningLimit: 2048,
        }
    };

    if (command === "serve") {
        const env = loadEnv(mode, process.cwd(), "");
        config["server"] = {
            proxy: {
                '/': {
                    target: 'http://localhost:8080/'
                }
            }
        }
    };

    return config;
});
