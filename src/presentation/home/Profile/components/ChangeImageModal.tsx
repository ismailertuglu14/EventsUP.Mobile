import React from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, Image } from "react-native"
import styled from "styled-components/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../features/helpers/screen_helpers";
type ChangeImageModalProps = {
    isModalOpen: boolean;
    handleCloseModal: () => void;

}
const ChangeImageModal = ({ isModalOpen, handleCloseModal }: ChangeImageModalProps) => {
    return (
        <Modal visible={isModalOpen} transparent={true}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                }}
                onPress={() => handleCloseModal()}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={{ width: SCREEN_WIDTH / 2.4, height: SCREEN_HEIGHT * 0.3, backgroundColor: 'white', alignItems: 'center' }}>

                        <Text style={{ marginTop: 20, marginBottom: 5 }}>Profile Image</Text>
                        <SelectImageChoiceContainer>
                            <Text>From Camera</Text>
                        </SelectImageChoiceContainer>

                        <SelectImageChoiceContainer>
                            <Text>From Gallery</Text>
                        </SelectImageChoiceContainer>

                        <Text style={{ marginTop: 10, marginBottom: 10 }}>Banner Image</Text>
                        <SelectImageChoiceContainer>
                            <Text>From Camera</Text>
                        </SelectImageChoiceContainer>

                        <SelectImageChoiceContainer>
                            <Text>From Gallery</Text>
                        </SelectImageChoiceContainer>

                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}
const SelectImageChoiceContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
`;
export default ChangeImageModal;