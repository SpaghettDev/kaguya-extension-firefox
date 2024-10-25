import * as fs from "fs";
import { resolve } from "path";
import colorLog from "../log";
import type { PluginOption } from "vite";


const distDir = resolve(__dirname, "..", "..", "dist");
const publicDir = resolve(__dirname, "..", "..", "public");
const websiteDir = resolve(__dirname, "..", "..", "website-overrides");

export default function setupWebsiteOverrides(): PluginOption {
    function copyWebsiteOverridesFolder(to: string) {
        to = resolve(to, "website-overrides");

        if (!fs.existsSync(to)) {
            fs.mkdirSync(to);
        }

        fs.cpSync(websiteDir, to, { recursive: true });

        colorLog(`Successfully set up website overrides directory`, "success");
    }

    return {
        name: "setup-website-overrides",
        buildStart() {
            copyWebsiteOverridesFolder(distDir);
        },
        buildEnd() {
            copyWebsiteOverridesFolder(publicDir);
        }
    };
}
