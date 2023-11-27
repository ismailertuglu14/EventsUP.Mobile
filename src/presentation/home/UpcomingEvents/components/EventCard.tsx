import { TouchableOpacity, View, Text, Image } from "react-native";
import { EventCardModel } from "../models/event_model";
import { LOCATION_ICON, TL_ICON, WWW_ICON } from "../../../../features/constants/image_constants";
import { useMemo } from "react";
import { stringShortener } from "../../../../features/helpers/string_helpers";
import NavigationPath from "../../../../core/navigation/navigation_paths";

const EventCard = ({ event, navigation }: { event: EventCardModel, navigation: any }) => {

    const CARD_BORDER_RADIUS = 12;

    const navigateToEventDetails = (id: string) => {
        navigation.navigate(NavigationPath.EVENT_DETAIL, { id })
    }

    return <TouchableOpacity
        onPress={() => navigateToEventDetails(event.id)}
        activeOpacity={0.8}
        style={{ flex: 1, marginHorizontal: 12, flexDirection: 'row', alignItems: 'center', marginVertical: 24, borderRadius: CARD_BORDER_RADIUS }}>
        <Image
            source={{ uri: event.image }}
            resizeMode='cover'
            style={{
                borderRadius: CARD_BORDER_RADIUS,
                height: 280,
                width: '100%',
            }} />
        <View style={{
            flexDirection: 'column', position: 'absolute', left: 0, bottom: 0,
            borderRadius: CARD_BORDER_RADIUS,
            backgroundColor: 'rgba(0,0,0,0.4)', width: '100%', height: '35%', paddingHorizontal: 12, justifyContent: 'space-around'
        }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>
                {event.name}
            </Text>
            <EventDate date={event.date} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, }}>
                <EventPlatform isOnline={event.isOnline} />
                <EventAddress address={event.address} />
                <JoinedMutualFriends mutualFriendImages={event.mutualFriendImages} />
                <IsPaid isPaid={event.isPaid} />
                <View style={{ flex: 1 }} />
                <ParticipantsCount
                    isParticipantLimit={event.isParticipantLimit}
                    currentParticipants={event.currentParticipants}
                    totalParticipants={event.totalParticipants}
                />
            </View>
        </View>
    </TouchableOpacity>
}

const EventDate = ({ date }: { date: string }) => {
    return (
        <Text style={{ color: 'white' }}>
            {date}
        </Text>
    )
}
const EventPlatform = ({ isOnline }: { isOnline: boolean }) => {
    return isOnline ? <Image source={WWW_ICON} style={{ height: 20, width: 20 }} /> : <Image source={LOCATION_ICON} style={{ height: 18, width: 18 }} resizeMode='contain' />
}

const EventAddress = ({ address }: { address: string }) => {
    return <Text style={{ color: 'white', marginLeft: 4 }}>{stringShortener(address, 26)}</Text>
}

const JoinedMutualFriends = ({ mutualFriendImages }: { mutualFriendImages: string[] | undefined }) => {
    return <View style={{ flexDirection: 'row', marginLeft: 16, paddingVertical: 4 }}>
        {
            !!mutualFriendImages && mutualFriendImages.map((image, index) => <Image key={index} source={{ uri: image }} style={{ height: 20, width: 20, borderRadius: 12, marginLeft: -8 }} />)
        }
    </View>
}

const ParticipantsCount = ({ isParticipantLimit, currentParticipants, totalParticipants }: { isParticipantLimit: boolean, currentParticipants: number, totalParticipants: number }) => {
    return isParticipantLimit && <Text style={{ color: 'white', fontWeight: '500' }}>{currentParticipants} / {totalParticipants}</Text>
}

const IsPaid = ({ isPaid }: { isPaid: boolean }) => {
    return isPaid && <Image source={TL_ICON} style={{ height: 16, width: 16, marginLeft: 12 }} resizeMode="contain" />

}
export default EventCard;