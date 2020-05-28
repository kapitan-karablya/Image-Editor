import {updateImage} from "../components/Home/index.js";


export default async function loadImage(){
    let response = await fetch('https://localhost:5001/api/getimage', {
        method:'GET',
        credentials:'include',
    });
    let text = "data:image/jpeg;base64,";
    if (response.ok) {
        text += await response.text();
        updateImage(text);
        console.log(text);
        return text;
    }
    else{
      console.log("fdsf");
        return false;
    }
}