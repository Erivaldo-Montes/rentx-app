import React, { useRef, useState } from "react";
import { ViewToken, FlatList } from "react-native";
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: string[];
}
interface ChangedImagesProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImagesSlider({ imagesUrl }: Props) {
  const [imagesIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangedImagesProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });
  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <ImageIndex active={index === imagesIndex} key={index} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        horizontal
        onViewableItemsChanged={indexChanged.current}
        showsHorizontalScrollIndicator={false}
        renderItem={(props) => (
          <CarImageWrapper>
            <CarImage source={{ uri: props.item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}
