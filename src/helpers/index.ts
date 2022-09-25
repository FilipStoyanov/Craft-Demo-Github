export const base64EncodeFreshDeskKey = (key?: string): string => {
    let encodedFreshDeskToken = "";
    if (key) {
        encodedFreshDeskToken = Buffer.from(key).toString('base64');
    }
    return encodedFreshDeskToken;
}