export type Event = {
    ID: string;
    Name: string;
    Description: string;
    Location: string;
    DateStart: string;
    DateEnd: string;
    CreatedAt: string;
    OrganizerID: string;
    Preparation: string;
    Requirements: string;
    Imgs: string[] | null;
    Attendants: number;
}