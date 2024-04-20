export type Event = {
    id: string;
    name: string;
    description: string;
    location: string;
    dateStart: string;
    dateEnd: string;
    createdAt: string;
    organizerId: string;
    preparation: string;
    requirements: string;
    attendees: number;
    price: {
        Float64: number,
        Valid: boolean
    };
    imgs: string[] | null;
}