import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import StudyCard from "../../components/StudyCard";
import MainCategory from "../../components/Nav";
import Footer from "./../../components/Footer";
import Address from "../../components/Address";

export default function Main({ list }) {
  return (
    <MainContainer>
      <Input />
      <MainCategory />
      {list.map((el, idx) => {
        return (
          <Link to={`/PartyDetail/${el.study_no}`} key={idx}>
            <StudyCard index={idx} item={el} />
          </Link>
        );
      })}
      <Footer />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding-top: 56px;

  .test {
    height: 900px;
    border: 1px solid black;
  }
`;
