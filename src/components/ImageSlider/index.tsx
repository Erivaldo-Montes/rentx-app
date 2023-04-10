import React, { useRef, useState } from "react";
import { ViewToken, FlatList } from "react-native";
import { Bullet } from "../Bullet";
import { Container, ImageIndexes, CarImageWrapper, CarImage } from "./styles";

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
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
        {imagesUrl.map((item, index) => (
          <Bullet active={index === imagesIndex} key={item.id} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        horizontal
        onViewableItemsChanged={indexChanged.current}
        showsHorizontalScrollIndicator={false}
        renderItem={(props) => (
          <CarImageWrapper>
            <CarImage source={{ uri: props.item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}
