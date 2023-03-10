import * as React from "react";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Container } from "./Container";
import { TimeText, TimeInput } from "./Text";
import { Button } from "./Button";
import {
  yearData,
  monthData,
  dayData,
  prevDateTime,
  nextDateTime,
  inputDateTimeHandle,
} from "../../modules/data";
import { UpIcon, DownIcon } from "./Icon";

export const TimeField = (props: Props) => {
  const { date, hour, minute, setDate, mainColor, textColor, outlineColor } =
    props;

  const hourRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const minuteRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  useEffect(() => {
    if (hourRef.current) {
      hourRef.current.value = hour;
    }

    if (minuteRef.current) {
      minuteRef.current.value = minute;
    }
  }, [hour, minute]);

  return (
    <Container alignItems="center" justidyContent="center" width="250px">
      <Container alignItems="center">
        <Container
          direction="column"
          justidyContent="center"
          alignItems="center"
        >
          <Button onClick={() => setDate(prevDateTime(date, "h"))}>
            <UpIcon color={mainColor ? mainColor : "#000"} />
          </Button>
          <TimeInput
            ref={hourRef}
            type="text"
            defaultValue={hour}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setDate(
                inputDateTimeHandle(
                  yearData(date),
                  monthData(date),
                  dayData(date),
                  e.currentTarget.value,
                  minute,
                  date
                )
              )
            }
            color={textColor ? textColor : "#000"}
            outlineColor={outlineColor ? outlineColor : "currentColor"}
          />
          <Button onClick={() => setDate(nextDateTime(date, "h"))}>
            <DownIcon color={mainColor ? mainColor : "#000"} />
          </Button>
        </Container>
        <TimeText>:</TimeText>
        <Container
          direction="column"
          justidyContent="center"
          alignItems="center"
        >
          <Button onClick={() => setDate(prevDateTime(date, "m"))}>
            <UpIcon color={mainColor ? mainColor : "#000"} />
          </Button>
          <TimeInput
            ref={minuteRef}
            type="text"
            defaultValue={minute}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setDate(
                inputDateTimeHandle(
                  yearData(date),
                  monthData(date),
                  dayData(date),
                  hour,
                  e.currentTarget.value,
                  date
                )
              )
            }
            color={textColor ? textColor : "#000"}
            outlineColor={outlineColor ? outlineColor : "currentColor"}
          />
          <Button onClick={() => setDate(nextDateTime(date, "m"))}>
            <DownIcon color={mainColor ? mainColor : "#000"} />
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

interface Props {
  date: string;
  hour: string;
  minute: string;
  setDate: Dispatch<SetStateAction<string>>;
  mainColor?: string;
  textColor?: string;
  outlineColor?: string;
}
