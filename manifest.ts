import { siteMatches, requestPermissionPatterns } from "./src/constants";
import packageJson from "./package.json";


const name = "Kaguya";
const description = "An extension that allow you to use Kaguya";

const devName = "Kaguya (Development)";

const isDev = process.env.__DEV__ === "true";

/**
 * After changing, please reload the extension at `about:addons`
 */
const manifest: browser._manifest.WebExtensionManifest = {
    browser_specific_settings: {
        gecko: {
            id: "spaghettdev@kagyua.com"
        }
    },
    manifest_version: 2,
    name: isDev ? devName : name,
    version: packageJson.version,
    description,
    background: {
        scripts: ["src/pages/background/index.js"],
        type: "module",
        persistent: true,
    },
    icons: {
        "16": "icon16.png",
        "32": "icon32.png",
        "48": "icon48.png",
        "128": "icon128.png",
    },
    browser_action: {},
    content_scripts: [
        {
            matches: siteMatches,
            js: ["src/pages/content/index.js"],
            run_at: "document_start",
        },
    ],
    devtools_page: "src/pages/devtools/index.html",
    web_accessible_resources: [
        "website-overrides/*.js",
        "assets/js/*.js",
        "assets/css/*.css",
        "icon16.png",
        "icon32.png",
        "icon48.png",
        "icon128.png",
        "src/pages/sandbox/index.html",
    ],
    permissions: [
        "tabHide",
        "declarativeNetRequest",
        "webRequest",
        "webRequestBlocking",
        ...requestPermissionPatterns
    ],
    content_security_policy: "default-src 'self'; script-src 'self' 'unsafe-eval'; img-src *; connect-src ws://localhost:8081/ http://* https://* data: blob: filesystem:;",
};

export default manifest;
