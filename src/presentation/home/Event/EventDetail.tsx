import React, { useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'

import styled from 'styled-components/native'
import { User } from '../../../features/models/user'
import { useNavigation } from '@react-navigation/native'
import { LOCATION_ICON } from '../../../features/constants/image_constants'
import BackIcon from '../../../features/shared/icons/navigation/BackIcon'
import LinearGradient from 'react-native-linear-gradient';
import { GenderEnum } from '../../../features/models/gender_enum'
import EmptyImagePlaceHolder from '../../../features/shared/components/EmptyImagePlaceHolder'
import NavigationPath from '../../../core/navigation/navigation_paths'
const EventDetail = () => {
    const [tabs, setTabs] = useState([
        {
            name: 'Details',
            isActive: true
        },
        {
            name: 'Images',
            isActive: false
        },
        {
            name: 'Comments',
            isActive: false
        },

    ])
    return <View>
        <Header style={{ height: Dimensions.get('window').height * 0.25 }}>
            <Image source={{ uri: 'https://www.goto.com/-/media/blog/posts/2021/istock-688892392.jpg' }} style={{ width: '100%', height: '100%' }} />
            <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <BackIcon style={{ position: 'absolute', left: 24, top: 24, }} color='white' />
        </Header>

        <View style={{ width: '100%', paddingHorizontal: '6%', paddingTop: '4%', paddingBottom: '2%', alignItems: 'flex-start' }}>
            <EventName name={"Lolcü Agalarla Toplantı"} />
            <EventOrganizer organizer={{ id: '1', fullName: 'Ismail Ertuğlu', profileImage: 'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg', gender: GenderEnum.Male, userName: 'ismailertgl' }} />
            <Location />
            <FriendGoesThisEvent images={[
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
                "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/04/jujutsu-kaisen-geto-asking-gojo-a-question.jpeg",
            ]} />
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
            {
                tabs.map((tab, index) => <TouchableOpacity key={index} onPress={() => {
                    const updatedTabs = tabs.map(tab => ({
                        ...tab,
                        isActive: false
                    }));
                    updatedTabs[index].isActive = true;
                    setTabs(updatedTabs);
                }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: tab.isActive ? 'purple' : 'black', fontSize: 20, fontWeight: 'bold' }}>Details</Text>
                        {
                            tab.isActive && <View style={{
                                width: '100%', height: 4, backgroundColor: 'purple', marginTop: 4, borderTopLeftRadius: 20, borderTopRightRadius: 20
                            }} />
                        }
                    </View>
                </TouchableOpacity>
                )
            }
        </View>
    </View>
}

const EventName = ({ name }: { name: string }) => {
    return <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Lolcü Agalarla Toplantı</Text>
}
const EventOrganizer = ({ organizer }: { organizer: User }) => {
    const navigation = useNavigation() as any;

    const navigateToOrganizerProfile = () => {
        navigation.navigate(NavigationPath.PROFILE, { id: organizer.id })
    }

    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {
            organizer.profileImage && organizer.profileImage.length > 0 ?
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigateToOrganizerProfile()}>
                    <Image source={{ uri: organizer.profileImage }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }} />
                </TouchableOpacity>
                : <EmptyImagePlaceHolder gender={organizer.gender} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }} />
        }
        <Text style={{ color: 'gray', fontSize: 20, fontWeight: '500' }}>
            Organized by {' '}
            <Text style={{ color: 'black', fontSize: 21, fontWeight: '600' }}>{organizer.fullName}</Text>
        </Text>
    </View>
}
const Location = () => {
    return <View style={{
        flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginTop: 16
    }}>
        <Image source={LOCATION_ICON} style={{ width: 40, height: 24, marginRight: 14 }} resizeMode='contain' />
        <Text style={{ color: 'gray', fontSize: 16, fontWeight: '500' }}>İstanbul, Turkey</Text>
    </View>
}

const FriendGoesThisEvent = ({ images }: { images: string[] }) => {
    return <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 8, marginTop: 16, marginLeft: 50 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            {
                images.map((image, index) => <Image key={index} source={{ uri: image }} style={{ width: 50, height: 44, borderRadius: 20, marginRight: 12 }} />)
            }
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: 12, marginLeft: 4, }}>
            <Text style={{ color: 'gray', fontSize: 16, fontWeight: '500', letterSpacing: 0.8, padding: 4 }}><Text style={{ fontWeight: 'bold', color: 'black' }}>156</Text> people are going</Text>
            <TouchableOpacity style={{ padding: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', }}>See all</Text>

            </TouchableOpacity>
        </View>
    </View>
}

const Header = styled.View`
    align-items: center;
    justify-content: space-between;
    width: max-content;
`

export default EventDetail;