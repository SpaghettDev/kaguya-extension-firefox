import { FileUrlType } from "./FileUrl";

export interface FontType {
    name: String;
    file: FileUrlType;
}

export default function Font(data: FontType) {
    return data;
}
