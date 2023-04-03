import { IconGridDots, IconSettings } from "@tabler/icons"

export const stats=[
    {
        id:1,
        name:'Post',
        stats:1000
    },
    {
        id:2,
        name:'Following',
        stats:1000
    },
    {
        id:3,
        name:'Followers',
        stats:1000
    },
]



export const navigations=[
    {
        id:1,
        name:'Feed',
        icon:<IconHom/>,
        url:'/'
    },
    {
        id:2,
        name:'My Profile',
        url:'/profile'
    },
    {
        id:3,
        name:'Direct',
        icon:<IconSend/>,
        url:'/'
    },
    {
        id:4,
        name:'Status',
        icon:<IconGridDots/>,
        url:'/'
    },
    {
        id:5,
        name:'Setting',
        icon:<IconSettings/>,
        url:'/'
    }

]
