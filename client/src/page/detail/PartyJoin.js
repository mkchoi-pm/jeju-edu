import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { MdPeopleAlt } from "react-icons/md";

import Nav from "../../components/Nav";
import Modal from "../../components/modals/Modal";
import Footer from "../../components/Footer";
import { BsChevronLeft } from "react-icons/bs";

export default function PartyJoin() {
  const navigate = useNavigate();
  const { kakao } = window;
  const [open, setOpen] = useState(false);
  const [peopleNum, setPeopleNum] = useState(1);

  const [name, setName] = useState("");

  const partyName = useRef(); // 스터디 이름
  const partyDate = useRef(); // 스터디 모임 날짜
  const partyClose = useRef(); // 스터디 모짐마감 날짜
  const partyAddress = useRef(); // 스터디 모임 장소
  const partyDesc = useRef(); // 스터디 상세설명
  const partyPeople = useRef();
  let latLng; // 사용자가 입력한 주소의 위도값
  let lonLng; // 사용자가 입력한 주소의 경도값.

  let userId = useSelector((state) => {
    return state.user.id;
  });

  const [formData, setFormData] = useState({
    who_open: userId,
    study_title: "피아노", // partyName
    study_category: "보컬댄스", // 값을 받아낼 좋은 방법 추천좀.
    study_detail_description: "피아노를 가르켜줄게요", //partyDesc
    min_member_cnt: 4,
    studyAt_date: "2022-12-30 15:00:00",
    studyAt_location: "서귀포시 태평로 529-1", // 무슨 값을 보내줘야 할지 모르겠음.
    tmX: 33.449794,
    tmY: 126.918436,
    deadline: new Date(),
    status: 0,
  });

  const onSubmitHandler = async (e) => {
    console.log(userId);
    e.preventDefault();

    // post 요청 보낼 때 사용 될 변수
    let result = {
      who_open: userId,
      study_title: partyName.current.value,
      study_category: "프로그래밍",
      study_detail_description: partyDesc.current.value, //partyDesc
      min_member_cnt: peopleNum,
      studyAt_date: "2022-12-30 15:00:00",
      studyAt_location: partyAddress.current.value,
      tmX: latLng,
      tmY: lonLng,
      deadline: partyClose.current.value,
      status: 0,
    };

    setFormData(result);
    setTimeout(() => {
      console.log(result);
      axios.post(`/api/openStudy`, result).then((res) => console.log(res));
    }, 500);
  };

  const refCheck = () => {
    // input 에 값을 입력하고 ref확인 버튼을 누르면 console창에서 값을 확인할 수 있음.
    console.log(
      "who_open",
      userId,
      "study_title",
      partyName.current.value,
      "study_category",
      "프로그래밍",
      "study_detail_description",
      partyDesc.current.value, //partyDesc
      "min_member_cnt",
      peopleNum,
      "studyAt_date",
      "2022-12-30 15:00:00",
      "studyAt_location",
      partyAddress.current.value,
      "tmX",
      latLng,
      "tmY",
      lonLng,
      "deadline",
      partyClose.current.value,
      "status",
      0

      // partyName.current.value,
      // partyDate.current.value,
      // partyClose.current.value,
      // partyAddress.current.value,
      // // 위도 경도는 받아오고, TransformAddress 함수 적용할것.
      // partyDesc.current.value,
      // "lat :",
      // latLng,
      // "lon :",
      // lonLng,
      // peopleNum
    );
  };

  const handleAddressTransformLocation = (e) => {
    e.preventDefault();
    let location = partyAddress.current.value;
    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(`${location}`, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log(coords);
        latLng = coords.Ma;
        lonLng = coords.La;
        console.log(latLng, lonLng);
      } else {
        console.log("err");
      }
    });
  };

  const handlePlusPeople = (e) => {
    e.preventDefault();
    setPeopleNum(peopleNum + 1);
  };

  const handleMinusPeople = (e) => {
    e.preventDefault();
    setPeopleNum(peopleNum - 1);
    if (peopleNum < 2) {
      setPeopleNum(1);
      return alert("1 이하는 안됩니다.");
    }
  };

  const handlePeopleChange = (e) => {
    setPeopleNum(e.target.value);
  };

  return (
    <MainStyle>
      <BsChevronLeft className='header-goback' onClick={()=>navigate(-1)}/>
      <h1 className="header-title">스터디 개설하기</h1>
      <hr/>
      <Nav />
      <button onClick={refCheck}>ref 확인</button>
      <div className="wrapper">
        <form className="createParty">
          <div className="partName">
            <label className="labels" htmlFor="study_name">
              스터디 이름
            </label>
            <InputStyle
              id="studyName"
              ref={partyName}
              placeholder="스터디 이름을 입력해주세요"
              name="study_name"
            />
          </div>

          <label className="labels" htmlFor="studyDate">
            스터디 날짜
          </label>
          <input ref={partyDate} name="studyDate" type="datetime-local" />

          <label className="labels" htmlFor="studyClose">
            모집 마감 날짜
          </label>
          <input name="studyClose" ref={partyClose} type="datetime-local" />

          <PeopleCountContainer>
            <MdPeopleAlt />
            <button className="peopleBtn" onClick={(e) => handleMinusPeople(e)}>
              -
            </button>
            <div ref={partyPeople} onChange={(e) => handlePeopleChange(e)}>
              {peopleNum}
            </div>
            <button className="peopleBtn" onClick={(e) => handlePlusPeople(e)}>
              +
            </button>
          </PeopleCountContainer>

          <div className="partName">
            <label className="labels" htmlFor="location">
              스터디 장소
            </label>
            <InputStyle
              ref={partyAddress}
              placeholder="스터디 장소를 입력해주세요"
              name="location"
            />
            <button
              className="addressChecked"
              onClick={(e) => handleAddressTransformLocation(e)}
            >
              주소확인
            </button>
          </div>

          <label className="partyDescLabel labels">스터디 상세설명</label>
          <textarea
            ref={partyDesc}
            className="partyDesc"
            placeholder="스터디를 설명해주세요"
          />
          <button className="finish" onClick={onSubmitHandler}>
            스터디 개설 완료하기
          </button>
        </form>
      </div>
      <div className="modalLayout">
        <Modal open={open} handleClose={setOpen} status={0} />
      </div>
      <div>
        <Footer />
      </div>
    </MainStyle>
  );
}

const PeopleCountContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  input {
    width: 20%;
    border: 1px solid red;
  }

  .peopleBtn {
    margin: 0 20px;
    background-color: white;
    border: 1px solid black;
    border-radius: 50%;
    text-align: center;
  }
`;

const InputStyle = styled.input`
  width: 50%;
  height: 33px;
  border-radius: 15px;
  border: none;
`;

const MainStyle = styled.main`
  background-color: white;
  box-sizing: border-box;

  margin:32px 32px;
  .header-goback {
      float:left;
      color:#727272;
  }
  .header-title {
      text-align:center;
  }

  .wrapper {
    margin: 0 20px;
  }

  .createParty {
    margin-top: 20px;
  }

  .modalLayout {
    width: 100%;
    padding-bottom: 100px;
  }

  input {
    background-color: #faf6f2;
    width: 90%;
    border-radius: 16px;
    padding: 15px;
    border: none;
  }

  /* div {
    border: none;
  } */

  textarea {
    background-color: #faf6f2;
    border: none;
    padding: 15px;
  }

  .partyName {
    margin-top: 15px;
  }

  .addressChecked {
    float: right;
    border: 1px solid black;
    border-radius: 25px;
    padding: 5px;
    background-color: #faf6f2;
    transform: translate(-10%, -110%);
    cursor: pointer;
  }

  .partyDescLabel {
    margin-top: 25px;
  }

  .partyDesc {
    width: 90%;
    height: 117px;
  }

  .finish {
    width: 100%;
    height: 35px;
    border-radius: 30px;
    background-color: black;
    border: none;
    color: white;
    margin-top: 20px;
  }

  .labels {
    display: block;
    margin: 20px 0;
  }
`;
