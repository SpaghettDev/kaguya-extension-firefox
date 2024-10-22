import "../../../assets/js/modulepreload-polyfill.0c213636.js";
const s = document.querySelector("#iframe");

firefox.runtime.onMessage.addListener((e) => {
    if (
        (e == null ? void 0 : e.target) === "offscreen" &&
        (e == null ? void 0 : e.type) === "SANDBOX_EVAL"
    )
        return (
            s.contentWindow.postMessage(e.data, "*"),
            window.addEventListener(
                "message",
                (n) => {
                    firefox.runtime.sendMessage({
                        target: "background",
                        result: n.data,
                        type: "SANDBOX_EVAL",
                    });
                },
                !1
            ),
            !0
        );
});
