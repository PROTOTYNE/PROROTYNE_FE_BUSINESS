import styled from "@emotion/styled";
import { useParams } from "react-router";

import { GrayBackground } from "@/entities";
import { colors, ReviewService } from "@/shared";
import { Loading } from "@/entities";
import { useState } from "react";

export const SurveyModal = ({
  id,
  onClose,
  questions,
}: {
  id: string;
  onClose: () => void;
  questions: string[];
}) => {
  const { investmentId } = useParams();

  const { useGetReview, grantPenalty } = ReviewService();

  const [clientPenalty, setClientPenalty] = useState(false);

  const { data, isLoading } = useGetReview(investmentId!, id);

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  const objectives = [
    data?.result.answer1,
    data?.result.answer2,
    data?.result.answer3,
    data?.result.answer4,
  ];

  console.log(objectives);

  return (
    <GrayBackground onClose={onClose}>
      <Container>
        <Title>
          신청자 설문 결과<div>신청자 ID: {id}</div>
        </Title>

        <SubContainer>
          {objectives.map((objective, index) => (
            <Question key={index}>
              <Label>{index + 1 + ". " + questions[index]}</Label>
              <RadioGroup>
                {["1", "2", "3", "4", "5"].map((level) => (
                  <RadioButton key={level} selected={objective + "" === level}>
                    <input
                      type="radio"
                      name={index + ""}
                      value={level}
                      checked={objective + "" === level}
                    />
                    {level}
                  </RadioButton>
                ))}
              </RadioGroup>
            </Question>
          ))}

          <Question>
            <Label>5. {questions[4]}</Label>
            <TextArea>{data?.result.answer5}</TextArea>
          </Question>

          <Question>
            <Label>6. 재구매 의사에 대해 알려주세요.</Label>
            <RadioGroup>
              <RadioButton selected={data!.result.answer6}>
                <input
                  type="radio"
                  name="6"
                  value={1}
                  checked={data?.result.answer6}
                />
                할래요
              </RadioButton>
              <RadioButton selected={!data?.result.answer6}>
                <input
                  type="radio"
                  name="6"
                  value={2}
                  checked={!data?.result.answer6}
                />
                안할래요
              </RadioButton>
            </RadioGroup>
          </Question>

          <Question>
            <Label>7. 첨부 이미지</Label>
            <ImgContainer>
              {data?.result.imagefiles.map((imageUrl, index) => (
                <ImageBlock key={index} src={imageUrl}></ImageBlock>
              ))}
            </ImgContainer>
          </Question>
        </SubContainer>

        <ButtonGroup>
          <Button primary onClick={onClose}>
            확인 완료
          </Button>
          {clientPenalty || data?.result.penalty ? (
            <Button penalty>페널티 부여 완료</Button>
          ) : (
            <Button
              onClick={() => {
                grantPenalty(investmentId!, id);
                setClientPenalty(true);
              }}
            >
              페널티 부여
            </Button>
          )}
        </ButtonGroup>
      </Container>
    </GrayBackground>
  );
};

const Container = styled.div`
  width: 85%;
  height: 90%;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;

  > div {
    font-size: 13px;
    color: ${colors.gray[1]};
    margin-top: 5px;
  }
`;

const Question = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const SubContainer = styled.div`
  overflow-y: auto;

  height: 70%;
  width: 105%;

  margin-bottom: 30px;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: start;
`;

const RadioGroup = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const RadioButton = styled.label<{ selected: boolean }>`
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: ${({ selected }) => (selected ? colors.main : colors.gray[1])};

  input {
    margin-right: 8px;
  }
`;

const TextArea = styled.div`
  width: 94%;
  height: 80px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ primary?: boolean; penalty?: boolean }>`
  padding: 10px 20px;
  width: 140px;
  text-align: center;

  font-size: 15px;
  color: ${({ penalty }) => (!penalty ? colors.white : colors.error)};

  background-color: ${({ primary, penalty }) =>
    primary ? colors.main : penalty ? colors.white : colors.error};

  border: 2px solid ${({ primary }) => (primary ? colors.main : colors.error)};
  border-radius: 4px;
  cursor: pointer;
`;

const ImageBlock = styled.div`
  width: 101px;
  height: 101px;

  background-image: url(${(props: { src: string }) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 5px;

  margin-right: 10px;
  margin-top: 5px;
`;

//TEST

/* const result = {
  penalty: false,

  answer1: "3",
  answer2: "3",
  answer3: "3",
  answer4: "3",
  answer5: "string",
  answer6: false,

  imageFiles: [
    "https://prototyne.s3.ap-northeast-2.amazonaws.com/test/f38213c9-3164-4e23-b6a0-2402ea4f96c9.jpg",
    "https://prototyne.s3.ap-northeast-2.amazonaws.com/test/f38213c9-3164-4e23-b6a0-2402ea4f96c9.jpg",
    "https://prototyne.s3.ap-northeast-2.amazonaws.com/test/f38213c9-3164-4e23-b6a0-2402ea4f96c9.jpg",
  ],
};
 */
