import CryptoJS from "crypto-js";

var CryptoJSAesJson = {
    encrypt: function (params, secret) {
        var options = {
            format: CryptoJSAesJson,
        };
        return CryptoJS.AES.encrypt(
            JSON.stringify(params),
            secret,
            options
        ).toString();
    },
    decrypt: function (armored, passphrase) {
        var options = {
            format: CryptoJSAesJson,
        };
        return JSON.parse(
            CryptoJS.AES.decrypt(armored, passphrase, options).toString(
                CryptoJS.enc.Utf8
            )
        );
    },
    stringify: function (a) {
        var b = {
            ct: a.ciphertext.toString(CryptoJS.enc.Base64),
            iv: "",
            s: "",
        };

        if (a.iv) {
            b.iv = a.iv.toString();
        }

        if (a.salt) {
            b.s = a.salt.toString();
        }

        return JSON.stringify(b).replace(/\s/g, "");
    },
    parse: function (file) {
        var options = JSON.parse(file);
        var p = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(options.ct),
        });
        if (options.iv) {
            p.iv = CryptoJS.enc.Hex.parse(options.iv);
        }
        if (options.s) {
            p.salt = CryptoJS.enc.Hex.parse(options.s);
        }
        return p;
    },
};

export default function vidStreamZExtract(armored) {
    return CryptoJSAesJson.decrypt(armored, "F1r3b4Ll_GDP~5H");
}
