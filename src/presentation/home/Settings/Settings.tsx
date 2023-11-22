import { Text, TouchableOpacity, View } from "react-native"
import CacheManager from "../../../core/cache/cache_manager"
import CacheEnum from "../../../core/cache/cache_enums"
import { useNavigation } from "@react-navigation/native"
import NavigationPath from "../../../core/navigation/navigation_paths"

const Settings = () => {
    const navigation: any = useNavigation();
    const logout = async () => {
        await CacheManager.getInstance().remove(CacheEnum.TOKEN)
        navigation.replace(NavigationPath.SIGNIN)
    }

    return <View>
        <TouchableOpacity onPress={logout}>
            <Text>Logout</Text>
        </TouchableOpacity>
    </View>
}

export default Settings