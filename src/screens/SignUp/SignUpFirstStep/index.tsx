import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { BackButton } from "../../../components/BackButton";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

import {
  Container,
  Header,
  StepsSignUp,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";

export function SignUpFirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        email: Yup.string()
          .email("E-mail inválido")
          .required("E-mail é obrigatório"),
        name: Yup.string().required("Nome é obrigatório"),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);
      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("error", error.message);
      }
    }
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <StepsSignUp>
              <Bullet active={true} />
              <Bullet />
            </StepsSignUp>
          </Header>
          <Title>Crie sua {"\n"}conta</Title>
          <Subtitle>Faça seu cadastro de{"\n"}forma fácil e rápido</Subtitle>
          <Form>
            <FormTitle>01. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>
          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
