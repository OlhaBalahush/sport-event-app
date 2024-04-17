export type Challenge = {
    id: string,
    name: string,
    organizationName: string,
    organizationLink: string,
    img: {
        String: string,
        Valid: boolean,
    },
    deadline: string,
    aim: string,
    overview: string,
    award: string,
    detailsRules: string,
    createdAt: string,
    points: number,
}