module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/node_modules/@resvg/resvg-js/js-binding.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { existsSync, readFileSync } = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)"), { join } = __turbopack_context__.r("[externals]/path [external] (path, cjs)"), { platform, arch } = process;
let nativeBinding = null, localFileExisted = !1, loadError = null;
function isMusl() {
    if (!process.report || typeof process.report.getReport != "function") try {
        const e = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)").execSync("which ldd").toString().trim();
        return readFileSync(e, "utf8").includes("musl");
    } catch  {
        return !0;
    }
    else {
        const { glibcVersionRuntime: e } = process.report.getReport().header;
        return !e;
    }
}
switch(platform){
    case "android":
        switch(arch){
            case "arm64":
                localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.android-arm64.node"));
                try {
                    localFileExisted ? nativeBinding = (()=>{
                        const e = new Error("Cannot find module './resvgjs.android-arm64.node'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })() : nativeBinding = (()=>{
                        const e = new Error("Cannot find module '@resvg/resvg-js-android-arm64'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })();
                } catch (e) {
                    loadError = e;
                }
                break;
            case "arm":
                localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.android-arm-eabi.node"));
                try {
                    localFileExisted ? nativeBinding = (()=>{
                        const e = new Error("Cannot find module './resvgjs.android-arm-eabi.node'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })() : nativeBinding = (()=>{
                        const e = new Error("Cannot find module '@resvg/resvg-js-android-arm-eabi'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })();
                } catch (e) {
                    loadError = e;
                }
                break;
            default:
                throw new Error(`Unsupported architecture on Android ${arch}`);
        }
        break;
    case "win32":
        switch(arch){
            case "x64":
                localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.win32-x64-msvc.node"));
                try {
                    localFileExisted ? nativeBinding = (()=>{
                        const e = new Error("Cannot find module './resvgjs.win32-x64-msvc.node'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })() : nativeBinding = (()=>{
                        const e = new Error("Cannot find module '@resvg/resvg-js-win32-x64-msvc'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })();
                } catch (e) {
                    loadError = e;
                }
                break;
            case "ia32":
                localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.win32-ia32-msvc.node"));
                try {
                    localFileExisted ? nativeBinding = (()=>{
                        const e = new Error("Cannot find module './resvgjs.win32-ia32-msvc.node'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })() : nativeBinding = (()=>{
                        const e = new Error("Cannot find module '@resvg/resvg-js-win32-ia32-msvc'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })();
                } catch (e) {
                    loadError = e;
                }
                break;
            case "arm64":
                localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.win32-arm64-msvc.node"));
                try {
                    localFileExisted ? nativeBinding = (()=>{
                        const e = new Error("Cannot find module './resvgjs.win32-arm64-msvc.node'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })() : nativeBinding = (()=>{
                        const e = new Error("Cannot find module '@resvg/resvg-js-win32-arm64-msvc'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })();
                } catch (e) {
                    loadError = e;
                }
                break;
            default:
                throw new Error(`Unsupported architecture on Windows: ${arch}`);
        }
        break;
    case "darwin":
        localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.darwin-universal.node"));
        try {
            localFileExisted ? nativeBinding = (()=>{
                const e = new Error("Cannot find module './resvgjs.darwin-universal.node'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })() : nativeBinding = (()=>{
                const e = new Error("Cannot find module '@resvg/resvg-js-darwin-universal'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })();
            break;
        } catch  {}
        switch(arch){
            case "x64":
                localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.darwin-x64.node"));
                try {
                    localFileExisted ? nativeBinding = (()=>{
                        const e = new Error("Cannot find module './resvgjs.darwin-x64.node'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })() : nativeBinding = (()=>{
                        const e = new Error("Cannot find module '@resvg/resvg-js-darwin-x64'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })();
                } catch (e) {
                    loadError = e;
                }
                break;
            case "arm64":
                localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.darwin-arm64.node"));
                try {
                    localFileExisted ? nativeBinding = (()=>{
                        const e = new Error("Cannot find module './resvgjs.darwin-arm64.node'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })() : nativeBinding = (()=>{
                        throw new Error('could not resolve "' + "@resvg/resvg-js-darwin-arm64" + '" into a module');
                    })();
                } catch (e) {
                    loadError = e;
                }
                break;
            default:
                throw new Error(`Unsupported architecture on macOS: ${arch}`);
        }
        break;
    case "freebsd":
        if ("TURBOPACK compile-time truthy", 1) throw new Error(`Unsupported architecture on FreeBSD: ${arch}`);
        localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.freebsd-x64.node"));
        try {
            localFileExisted ? nativeBinding = (()=>{
                const e = new Error("Cannot find module './resvgjs.freebsd-x64.node'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })() : nativeBinding = (()=>{
                const e = new Error("Cannot find module '@resvg/resvg-js-freebsd-x64'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })();
        } catch (e) {
            loadError = e;
        }
        break;
    case "linux":
        switch(arch){
            case "x64":
                if (isMusl()) {
                    localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.linux-x64-musl.node"));
                    try {
                        localFileExisted ? nativeBinding = (()=>{
                            const e = new Error("Cannot find module './resvgjs.linux-x64-musl.node'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })() : nativeBinding = (()=>{
                            const e = new Error("Cannot find module '@resvg/resvg-js-linux-x64-musl'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })();
                    } catch (e) {
                        loadError = e;
                    }
                } else {
                    localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.linux-x64-gnu.node"));
                    try {
                        localFileExisted ? nativeBinding = (()=>{
                            const e = new Error("Cannot find module './resvgjs.linux-x64-gnu.node'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })() : nativeBinding = (()=>{
                            const e = new Error("Cannot find module '@resvg/resvg-js-linux-x64-gnu'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })();
                    } catch (e) {
                        loadError = e;
                    }
                }
                break;
            case "arm64":
                if (isMusl()) {
                    localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.linux-arm64-musl.node"));
                    try {
                        localFileExisted ? nativeBinding = (()=>{
                            const e = new Error("Cannot find module './resvgjs.linux-arm64-musl.node'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })() : nativeBinding = (()=>{
                            const e = new Error("Cannot find module '@resvg/resvg-js-linux-arm64-musl'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })();
                    } catch (e) {
                        loadError = e;
                    }
                } else {
                    localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.linux-arm64-gnu.node"));
                    try {
                        localFileExisted ? nativeBinding = (()=>{
                            const e = new Error("Cannot find module './resvgjs.linux-arm64-gnu.node'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })() : nativeBinding = (()=>{
                            const e = new Error("Cannot find module '@resvg/resvg-js-linux-arm64-gnu'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })();
                    } catch (e) {
                        loadError = e;
                    }
                }
                break;
            case "arm":
                localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.linux-arm-gnueabihf.node"));
                try {
                    localFileExisted ? nativeBinding = (()=>{
                        const e = new Error("Cannot find module './resvgjs.linux-arm-gnueabihf.node'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })() : nativeBinding = (()=>{
                        const e = new Error("Cannot find module '@resvg/resvg-js-linux-arm-gnueabihf'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })();
                } catch (e) {
                    loadError = e;
                }
                break;
            case "riscv64":
                if (isMusl()) {
                    localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.linux-riscv64-musl.node"));
                    try {
                        localFileExisted ? nativeBinding = (()=>{
                            const e = new Error("Cannot find module './resvgjs.linux-riscv64-musl.node'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })() : nativeBinding = (()=>{
                            const e = new Error("Cannot find module '@resvg/resvg-js-linux-riscv64-musl'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })();
                    } catch (e) {
                        loadError = e;
                    }
                } else {
                    localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.linux-riscv64-gnu.node"));
                    try {
                        localFileExisted ? nativeBinding = (()=>{
                            const e = new Error("Cannot find module './resvgjs.linux-riscv64-gnu.node'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })() : nativeBinding = (()=>{
                            const e = new Error("Cannot find module '@resvg/resvg-js-linux-riscv64-gnu'");
                            e.code = 'MODULE_NOT_FOUND';
                            throw e;
                        })();
                    } catch (e) {
                        loadError = e;
                    }
                }
                break;
            case "s390x":
                localFileExisted = existsSync(join(("TURBOPACK compile-time value", "/ROOT/node_modules/@resvg/resvg-js"), "resvgjs.linux-s390x-gnu.node"));
                try {
                    localFileExisted ? nativeBinding = (()=>{
                        const e = new Error("Cannot find module './resvgjs.linux-s390x-gnu.node'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })() : nativeBinding = (()=>{
                        const e = new Error("Cannot find module '@resvg/resvg-js-linux-s390x-gnu'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })();
                } catch (e) {
                    loadError = e;
                }
                break;
            default:
                throw new Error(`Unsupported architecture on Linux: ${arch}`);
        }
        break;
    default:
        throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
}
if (!nativeBinding) throw loadError || new Error("Failed to load native binding");
const { BBox, Resvg, RenderedImage, renderAsync } = nativeBinding;
module.exports.BBox = BBox, module.exports.Resvg = Resvg, module.exports.RenderedImage = RenderedImage, module.exports.renderAsync = renderAsync;
}),
"[project]/node_modules/@resvg/resvg-js/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { render: _render, renderAsync: _renderAsync, Resvg: _Resvg } = __turbopack_context__.r("[project]/node_modules/@resvg/resvg-js/js-binding.js [app-route] (ecmascript)");
module.exports.render = function render(svg, options) {
    if (options) {
        return _render(svg, JSON.stringify(options));
    }
    return _render(svg);
};
module.exports.renderAsync = function renderAsync(svg, options, signal) {
    if (options) {
        return _renderAsync(svg, JSON.stringify(options), signal);
    }
    return _renderAsync(svg, null, signal);
};
module.exports.Resvg = class Resvg extends _Resvg {
    constructor(svg, options){
        super(svg, JSON.stringify(options));
    }
}; // module.exports.Resvg = _Resvg
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d90d3b29._.js.map