export class Conversation {
    constructor(public id: string,
        public isIndividual: boolean,
        public messages: Array<Object>,
        public participants: Array<Object>,
        public trip: any) { }
}