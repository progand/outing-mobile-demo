import { Config } from "../../shared/config";

export function getPhoto(photo: any, size = "default") {
    let url: string = photo.sizes && photo.sizes[size] || photo.url;
    if (!url.startsWith('http')) {
        url = Config.apiUrl + url;
    }
    console.log(url);
    return url;
}