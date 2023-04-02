import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  justify-content: center;

  background-color: ${(props) => props.theme.colors.header};
`;
