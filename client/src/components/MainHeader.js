import React from "react";
import styled from "styled-components";

import HeaderImg from "../img/pro.png";

export default function MainHeader({ userId }) {
  // 로그인 성공시, 사용자가 갖고있는 열매 갯수를 보여준다.
  return (
    <MainHeaderContainer>
      <img className="headerImg" src={HeaderImg} alt="상단 더미 이미지" />
      {userId}
    </MainHeaderContainer>
  );
}

const MainHeaderContainer = styled.section`
  border: 1px solid #e37b01;
  margin-bottom: 20px;
  border-radius: 25px;
  margin: 20px 21px;
  .headerImg {
    padding: 10px;
    width: 100%;
  }
`;