import React, { useState } from "react";
import {
  ContentCard,
  ContentCardText,
  ContentImage,
  ContentPosition,
  ContentSideContainer,
} from "../pages/home/homeStyle";

interface IInputOutput {
  image: string;
  position: string;
}

const InputOutput = ({ image = "", position }: IInputOutput) => {
  return (
    <ContentSideContainer>
      {image ? (
        <ContentImage src={image} />
      ) : position === "Input" ? (
        <ContentCard>
          <ContentCardText>No Image Uploaded</ContentCardText>
        </ContentCard>
      ) : (
        <ContentCard>
          <ContentCardText>No Image Predicted</ContentCardText>
        </ContentCard>
      )}
      <ContentPosition>{position}</ContentPosition>
    </ContentSideContainer>
  );
};

export default InputOutput;
