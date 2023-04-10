import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";
import { Container, Header, Title, Subtitle, Form, Footer } from "./styles";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();
  const navigation = useNavigation();
  const theme = useTheme();

  async function handleSignIn() {
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: yup.string().required("Senha é obrigatória"),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert("error", error.message);
      } else {
        Alert.alert(
          "Erro na autentificação",
          "Ocorreu erro ao fazer login, verifique as credenciais"
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <Title>Estamos {"\n"}quase lá</Title>
            <Subtitle>
              Faça seu login para começar{"\n"}uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="senha"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="login"
              enabled={true}
              loading={false}
              onPress={handleSignIn}
            />
            <Button
              color={theme.colors.background_secondary}
              title="Criar conta gratuíta"
              onPress={handleNewAccount}
              enabled={true}
              light
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
