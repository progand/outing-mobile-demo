export class User {
    constructor(
        public id: string,
        public name: string,
        public bio: string,
        public email: String,
        public location: String,
        public since: Date,
        public uni: String,
        public coverPhoto: Object,
        public photo: Object,
        public wishlisted: Array<Object>,
        public photos: Array<Object>,
        public travellers: Array<Object>) { }
}