import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import makeManifest from "./utils/plugins/make-manifest";
import customDynamicImport from "./utils/plugins/custom-dynamic-import";
import addHmr from "./utils/plugins/add-hmr";
import watchRebuild from "./utils/plugins/watch-rebuild";
import setupWebsiteOverrides from "./utils/plugins/setup-website-overrides";
import manifest from "./manifest";

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, "src");
const pagesDir = resolve(srcDir, "pages");
const modelsDir = resolve(srcDir, "models");
const assetsDir = resolve(srcDir, "assets");
const outDir = resolve(rootDir, "dist");
const publicDir = resolve(rootDir, "public");

const isDev = process.env.__DEV__ === "true";
const isProduction = !isDev;

// ENABLE HMR IN BACKGROUND SCRIPT
const enableHmrInBackgroundScript = true;

export default defineConfig({
    resolve: {
        alias: {
            "@src": srcDir,
            "@assets": assetsDir,
            "@pages": pagesDir,
            "@models": modelsDir,
        },
    },
    plugins: [
        react(),
        makeManifest(manifest, {
            isDev,
            contentScriptCssKey: regenerateCacheInvalidationKey(),
        }),
        customDynamicImport(),
        addHmr({ background: enableHmrInBackgroundScript, view: true }),
        watchRebuild(),
        setupWebsiteOverrides(),
    ],
    publicDir,
    build: {
        outDir,
        /** Can slow down build speed. */
        // sourcemap: isDev,
        minify: isProduction,
        reportCompressedSize: isProduction,
        rollupOptions: {
            input: {
                background: resolve(pagesDir, "background", "index.ts"),
                options: resolve(pagesDir, "options", "index.html"),
                content: resolve(pagesDir, "content", "index.ts"),
                sandbox: resolve(pagesDir, "sandbox", "index.html"),
                offscreen: resolve(pagesDir, "offscreen", "index.html"),
            },
            output: {
                entryFileNames: "src/pages/[name]/index.js",
                chunkFileNames: isDev
                    ? "assets/js/[name].js"
                    : "assets/js/[name].[hash].js",
                assetFileNames: (assetInfo) => {
                    const { dir, name: _name } = path.parse(assetInfo.name);
                    const assetFolder = dir.split("/").at(-1);
                    const name = assetFolder + firstUpperCase(_name);
                    return `assets/[ext]/${name}.chunk.[ext]`;
                },
            },
        },
    },
});

function firstUpperCase(str: string) {
    const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
    return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}

let cacheInvalidationKey: string = generateKey();
function regenerateCacheInvalidationKey() {
    cacheInvalidationKey = generateKey();
    return cacheInvalidationKey;
}

function generateKey(): string {
    return `${(Date.now() / 100).toFixed()}`;
}
