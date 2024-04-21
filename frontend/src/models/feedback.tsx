export type Feedback = {
    id: number;
    eventId: string;
    userId: string;
    comment: string;
    img: {
        String: string,
        Valid: boolean,
    },
    rate: number;
    createdAt: string;
}