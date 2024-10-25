import { evalScript } from "@src/utils/eval";

const packedDecode = (str: string) => {
    return evalScript(str.trim().replace("eval", ""));
};

export default packedDecode;
