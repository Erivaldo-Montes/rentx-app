import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";
import { useNetInfo } from "@react-native-community/netinfo";
import { Button } from "../../components/Button";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButtom,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";

export function Profile() {
  console.log("profile");
  const { user, logOut, updateUser } = useAuth();
  const netInfo = useNetInfo();
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleLogout() {
    Alert.alert(
      "Tem certaza?",
      "Conecção com a internet será requerida ao fazer login novamente.",
      [
        {
          text: "cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => {
            logOut();
          },
        },
      ]
    );
  }

  function handleOptionChange(optionSelect: "dataEdit" | "passwordEdit") {
    if (netInfo.isConnected === false && optionSelect === "passwordEdit") {
      Alert.alert("conecte-se a rede, para mudar a senha");
    }
    setOption(optionSelect);
  }

  async function handleUpdatePhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      console.log(result.uri);
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = yup.object().shape({
        driverLicense: yup.string().required("CNH é obrigatória"),
        name: yup.string().required("Nome é obrigatório"),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      console.log(avatar);
      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        avatar,
        driver_license: driverLicense,
        token: user.token,
      });

      Alert.alert("perfil atualizado");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert("xiii!", error.message);
      } else {
        Alert.alert("Não foi possivel atualizar perfil");
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar perfil</HeaderTitle>
              <LogoutButton onPress={handleLogout}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButtom onPress={handleUpdatePhoto}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButtom>
            </PhotoContainer>
          </Header>
          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionChange("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="senha atual" />
                <PasswordInput iconName="lock" placeholder="nova senha" />
                <PasswordInput iconName="lock" placeholder="repetir senha" />
              </Section>
            )}
            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
