export interface EventCardModel {
    id: string
    name: string
    description: string
    date: string
    image: string
    price: number
    address: string
    isOnline: boolean
    mutualFriendImages?: string[]
    isPaid: boolean
    isParticipantLimit: boolean
    currentParticipants: number
    totalParticipants: number
}

export const mockEventCardModel: EventCardModel[] = [
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descrição do evento 1',
            image: 'https://wallpapers.com/images/hd/ken-kaneki-4k-anime-phone-0oi2a391lds2pu0z.jpg',
            price: 0,
            date: '21 oct - 24 oct',
            address: 'Rua 1',
            isPaid: false,
            mutualFriendImages: [
                "https://media.okmagazine.com/brand-img/hGHIhC3B7/0x0/2018/10/Ryan-Gosling-Kimmel-PP.jpg",
                "https://images.lifestyleasia.com/wp-content/uploads/sites/3/2023/07/25113816/Barbie-Ken-03-053123-2262d2a17e51462cb6ac826a298b1ec5-1350x900.jpg",
                "https://i.pinimg.com/originals/57/f6/5d/57f65d8b4266333e566f91d82f73543b.jpg"
            ],
            isParticipantLimit: true,
            currentParticipants: 12,
            totalParticipants: 100,
            isOnline: true
        },
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descrição do evento 1',
            image: 'https://mfiles.alphacoders.com/993/993859.jpg',
            price: 0,
            date: '24 oct',
            address: 'Rua 1',
            isOnline: false,
            isPaid: true,
            mutualFriendImages: [
                "https://media.okmagazine.com/brand-img/hGHIhC3B7/0x0/2018/10/Ryan-Gosling-Kimmel-PP.jpg",
                "https://images.lifestyleasia.com/wp-content/uploads/sites/3/2023/07/25113816/Barbie-Ken-03-053123-2262d2a17e51462cb6ac826a298b1ec5-1350x900.jpg",
                "https://i.pinimg.com/originals/57/f6/5d/57f65d8b4266333e566f91d82f73543b.jpg"
            ],
            isParticipantLimit: false,
            currentParticipants: 12,
            totalParticipants: 100,
        },
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descrição do evento 1',
            image: 'https://cdn.wallpapersafari.com/1/72/bd7plH.jpg',
            date: '24 oct',
            price: 0,
            address: 'Rua 1',
            isPaid: true,
            mutualFriendImages: [
                "https://media.okmagazine.com/brand-img/hGHIhC3B7/0x0/2018/10/Ryan-Gosling-Kimmel-PP.jpg",
                "https://images.lifestyleasia.com/wp-content/uploads/sites/3/2023/07/25113816/Barbie-Ken-03-053123-2262d2a17e51462cb6ac826a298b1ec5-1350x900.jpg",
                "https://i.pinimg.com/originals/57/f6/5d/57f65d8b4266333e566f91d82f73543b.jpg"
            ],
            isParticipantLimit: false,
            currentParticipants: 12,
            totalParticipants: 100,
            isOnline: false
        },
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descrição do evento 1',
            image: 'https://w0.peakpx.com/wallpaper/327/452/HD-wallpaper-dark-anime-guy-phone.jpg',
            price: 0,
            date: '24 oct',
            address: 'Rua 1',
            isPaid: false,
            mutualFriendImages: [
                "https://media.okmagazine.com/brand-img/hGHIhC3B7/0x0/2018/10/Ryan-Gosling-Kimmel-PP.jpg",
                "https://images.lifestyleasia.com/wp-content/uploads/sites/3/2023/07/25113816/Barbie-Ken-03-053123-2262d2a17e51462cb6ac826a298b1ec5-1350x900.jpg",
                "https://i.pinimg.com/originals/57/f6/5d/57f65d8b4266333e566f91d82f73543b.jpg"
            ],
            isParticipantLimit: false,
            currentParticipants: 12,
            totalParticipants: 100,
            isOnline: true
        },
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descrição do evento 1',
            image: 'https://img.freepik.com/premium-photo/anime-landscape-wallpapers-iphone-is-best-high-definition-iphone-wallpaper-you-can-make-this-wallpaper-your-iphone-x-backgrounds-mobile-screensaver-ipad-lock-screen-iphone-wall_873925-19600.jpg',
            price: 0,
            address: 'Rua 1',
            date: '24 oct',
            isPaid: false,
            mutualFriendImages: [
                "https://media.okmagazine.com/brand-img/hGHIhC3B7/0x0/2018/10/Ryan-Gosling-Kimmel-PP.jpg",
                "https://images.lifestyleasia.com/wp-content/uploads/sites/3/2023/07/25113816/Barbie-Ken-03-053123-2262d2a17e51462cb6ac826a298b1ec5-1350x900.jpg",
                "https://i.pinimg.com/originals/57/f6/5d/57f65d8b4266333e566f91d82f73543b.jpg"
            ],
            isParticipantLimit: false,
            currentParticipants: 12,
            totalParticipants: 100,
            isOnline: true
        },
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descrição do evento 1',
            image: 'https://i.pinimg.com/originals/a0/93/a9/a093a915f1336bc45fbd7ab2990bd6a0.jpg',
            date: '24 oct',
            price: 0,
            address: 'Rua 1',
            isOnline: true,
            isParticipantLimit: false,
            currentParticipants: 12,
            isPaid: false,
            totalParticipants: 100,
        },
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descrição do evento 1',
            image: 'https://i.pinimg.com/originals/85/0e/cf/850ecfc55a32e45c57d3f1400d96af3b.jpg',
            date: '24 oct',
            price: 0,
            address: 'Rua 1',
            isOnline: true,
            isParticipantLimit: false,
            currentParticipants: 12,
            isPaid: false,
            totalParticipants: 100,
        },
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descrição do evento 1',
            image: 'https://picsum.photos/200/300',
            date: '24 oct',
            isPaid: false,
            price: 0,
            address: 'Rua 1',
            isOnline: true,
            isParticipantLimit: false,
            currentParticipants: 12,
            totalParticipants: 100,
        },
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descrição do evento 1',
            date: '24 oct',
            image: 'https://picsum.photos/200/300',
            price: 0,
            address: 'Rua 1',
            isPaid: false,
            isOnline: true,
            isParticipantLimit: false,
            currentParticipants: 12,
            totalParticipants: 100,
        },
    ]