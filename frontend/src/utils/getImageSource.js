import enviroments from "../config/enviroments";
import photo from '../resources/profile-photo.jpg'

const getImageUserResource = (imageUserResource) => {
    const resource = imageUserResource ? `${enviroments.apiBase}${imageUserResource}` : photo;
    return resource;
}

export {
    getImageUserResource
}