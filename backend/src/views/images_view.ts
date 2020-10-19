import Image from '../models/Image';

let url = 'http://192.168.237.64:4343/storage/images';

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `${url}/${image.path}`
        };
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }

};