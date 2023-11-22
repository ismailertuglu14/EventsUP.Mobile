export enum TabNames {
    Activities = 'Activities',
    Posts = 'Posts',
    Events = 'Events',
    Communities = 'Communities',
    Saved = 'Saved'
}
export type TabModel = {
    name: TabNames;
    isActive: boolean;
    isShownOwnProfile: boolean;
}

export const TABS: TabModel[] = [
    {
        name: TabNames.Activities,
        isActive: true,
        isShownOwnProfile: false
    },
    {
        name: TabNames.Posts,
        isActive: false,
        isShownOwnProfile: false
    },
    {
        name: TabNames.Events,
        isActive: false,
        isShownOwnProfile: false
    },
    {
        name: TabNames.Communities,
        isActive: false,
        isShownOwnProfile: false
    },
    {
        name: TabNames.Saved,
        isActive: false,
        isShownOwnProfile: true
    }
]