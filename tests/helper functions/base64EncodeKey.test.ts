const base64EncodeKeyLib = require("../../src/helpers");

describe("Base64 encode key test", () => {
    test("Function with string argument should return the right encoded string", () => {
        const TEXT = "ghp_RviKTObaJ52OhVusN2a2na6N2phGtj1VrjiK";
        const ENCODED_TEXT = "Z2hwX1J2aUtUT2JhSjUyT2hWdXNOMmEybmE2TjJwaEd0ajFWcmppSw==";
        expect(base64EncodeKeyLib.base64EncodeFreshDeskKey(TEXT)).toEqual(ENCODED_TEXT);
    })
});