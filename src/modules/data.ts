import dayjs, { ManipulateType } from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

const now = dayjs();
const date: string = now.format("YYYY-MM-DD");
const datetime: string = now.format("YYYY-MM-DD hh:mm");
const dayofweek: string = now.format("d");

export const currentDate: string = date;
export const currentDateTime: string = datetime;
export const currentDayOfWeek: string = dayofweek;
export const DayOfWeeks: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const Days = (date: string) => {
  const dateData = dayjs(date);
  const data = [];
  const endOfDay = Number(dateData.endOf("month").format("D"));
  const month = dateData.format("M");
  const year = dateData.format("YYYY");
  let arr = Array(7).fill(null);
  for (let i = 1; i <= endOfDay; i++) {
    const week = Number(dayjs(`${year}-${month}-${i}`).format("d"));
    if (i > 1 && week === 0) {
      data.push(arr);
      arr = Array(7).fill(null);
    }
    if (i === 1 && week > 0) {
      const prevEndOfDay = Number(
        dayjs(`${year}-${Number(month) - 1}-${i}`)
          .endOf("month")
          .format("D")
      );
      arr = arr.map(
        (v, i) =>
          i < week && { value: prevEndOfDay - (week - i - 1), month: "prev" }
      );
    }
    arr[week] = { value: i, month: "now" };
    if (i === endOfDay) {
      arr.forEach((v, i) => {
        if (i > week) {
          arr[i] = { value: i - week, month: "next" };
        }
      });
      data.push(arr);
    }
  }
  return data;
};

export const yearData = (date: string) => dayjs(date).format("YYYY");

export const monthData = (date: string) => dayjs(date).format("MM");

export const dayData = (date: string) => dayjs(date).format("D");

export const hourData = (date: string) => dayjs(date).format("HH");

export const minuteData = (date: string) => dayjs(date).format("mm");

export const prevDate = (date: string, isTime: boolean) =>
  dayjs(date)
    .subtract(1, "M")
    .format(isTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD");

export const nextDate = (date: string, isTime: boolean) =>
  dayjs(date)
    .add(1, "M")
    .format(isTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD");

export const prevDateTime = (date: string, key: ManipulateType) =>
  dayjs(date).subtract(1, key).format("YYYY-MM-DD HH:mm");

export const nextDateTime = (date: string, key: ManipulateType) =>
  dayjs(date).add(1, key).format("YYYY-MM-DD HH:mm");

export const clickDateHandle = (
  year: string,
  month: string,
  day: number,
  hour: string,
  minute: string,
  isMonth: string,
  isTime: boolean
) => {
  const format = isTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD";
  const date = dayjs(`${year}-${month}-${day} ${hour}:${minute}`);
  switch (isMonth) {
    case "now":
      return date.format(format);
    case "prev":
      return date.subtract(1, "M").format(format);
    case "next":
      return date.add(1, "M").format(format);
    default:
      return dayjs().format(format);
  }
};

export const inputDateTimeHandle = (
  year: string,
  month: string,
  day: string,
  hour: string,
  minute: string,
  date: string
) => {
  const format = "YYYY-MM-DD HH:mm";
  if (isNaN(Number(hour))) {
    return dayjs(date).format(format);
  }
  const dateData = dayjs(`${year}-${month}-${day} ${hour}:${minute}`);
  return dateData.format(format);
};
