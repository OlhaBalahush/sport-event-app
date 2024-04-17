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
    imgs: string[] | null;
    attendants: number;
}