export class Trip {
    constructor(public id: string,
        public name: string,
        public destination: Array<String>,
        public description: String,
        public descriptionDetails: String,
        public requirements: String,
        public budgetFrom: number,
        public budgetTo: number,
        public approvedTravellersCount: number,
        public partnersReqd: number,
        public coverPhoto: Object,
        public organiser: Object,
        public dateStart: Date,
        public dateEnd: Date,
        public photos: Array<Object>,
        public tags: Array<String>,
        public travellers: Array<Object>) { }
}