export type Notification = {
    id: number,
    receiverId: string,
    data: NotificationData,
    status: string,
    createdAt: string
}

export type NotificationData = {
    type: string,
    userID: string,
    username: string,
    userImg: string,
    eventID: string
    eventName: string
    eventImg: string
}