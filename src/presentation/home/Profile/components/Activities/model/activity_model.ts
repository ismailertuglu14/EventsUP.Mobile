import { GenderEnum } from "../../../../../../features/models/gender_enum";
import { User } from "../../../../../../features/models/user";
import { ActivityType } from "./activity_type";

export type ActivityModel = {
    id: string;
    user: User;
    type: ActivityType;
    title: string;
    description: string;
}

export const mockActivities: ActivityModel[] = [
    {
        id: '1',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.EVENTS,
        title: 'is going to an event',
        description: "Microservice Nasıl Yapılmaz? Monolith vs Microservice"
    },
    {
        id: '2',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.EVENTS,
        title: 'is going to an event',
        description: "Microservice Nasıl Yapılmaz? Monolith vs Microservice"
    },
    {
        id: '3',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.COMMUNITY,
        title: 'is created a new community',
        description: "Java Community"
    },
    {
        id: '4',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.POST,
        title: 'is shared a new post',
        description: ""
    },
    {
        id: '5',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.EVENTS,
        title: 'is going to an event',
        description: "Microservice Nasıl Yapılmaz? Monolith vs Microservice"
    },
    {
        id: '53',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.EVENTS,
        title: 'is going to an event',
        description: "Microservice Nasıl Yapılmaz? Monolith vs Microservice"
    },
    {
        id: '54',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.EVENTS,
        title: 'is going to an event',
        description: "Microservice Nasıl Yapılmaz? Monolith vs Microservice"
    },
    {
        id: '5356',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.EVENTS,
        title: 'is going to an event',
        description: "Microservice Nasıl Yapılmaz? Monolith vs Microservice"
    },
    {
        id: '255',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.EVENTS,
        title: 'is going to an event',
        description: "Microservice Nasıl Yapılmaz? Monolith vs Microservice"
    },
    {
        id: '455',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.EVENTS,
        title: 'is going to an event',
        description: "Microservice Nasıl Yapılmaz? Monolith vs Microservice"
    },
    {
        id: '535',
        user: {
            id: '1',
            fullName: 'İsmail Ertuğlu',
            gender: GenderEnum.Male,
            userName: 'ismail',
            profileImage: 'https://i.pravatar.cc/100?img=1'
        },
        type: ActivityType.EVENTS,
        title: 'is going to an event',
        description: "Microservice Nasıl Yapılmaz? Monolith vs Microservice"
    }
]