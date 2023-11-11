import { ChangeEvent, useEffect, useState } from "react";
import { Flex, SimpleGrid, Switch, Text } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { ISchedule } from "../services/Dentist";

type defaultScheduleItem = {
  day: string;
  startTime: string;
  endTime: string;
  isSelected: boolean;
};

const defaultSchedule: defaultScheduleItem[] = [
  {
    day: "Monday",
    startTime: "18:00",
    endTime: "21:00",
    isSelected: true,
  },
  {
    day: "Tuesday",
    startTime: "18:00",
    endTime: "21:00",
    isSelected: true,
  },
  {
    day: "Wednesday",
    startTime: "18:00",
    endTime: "21:00",
    isSelected: true,
  },
  {
    day: "Thursday",
    startTime: "18:00",
    endTime: "21:00",
    isSelected: true,
  },
  {
    day: "Friday",
    startTime: "18:00",
    endTime: "21:00",
    isSelected: true,
  },
  {
    day: "Saturday",
    startTime: "18:00",
    endTime: "21:00",
    isSelected: true,
  },
  {
    day: "Sunday",
    startTime: "18:00",
    endTime: "21:00",
    isSelected: true,
  },
];

type TimeSelectorProps = {
  getSelectedDays: (selectedDays: ISchedule[]) => void;
};

const TimeSelector = ({ getSelectedDays }: TimeSelectorProps) => {
  const [selectedDays, setSelectedDays] =
    useState<defaultScheduleItem[]>(defaultSchedule);

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    console.log({ e });
    const position = index;
    setSelectedDays((prev) => {
      return prev.map((item, index) => {
        if (index === position) {
          return {
            ...item,
            isSelected: e.target.checked,
          };
        }
        return item;
      });
    });
  };

  const handleStartTimeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log({ e, index });
    const position = index;
    setSelectedDays((prev) => {
      return prev.map((item, index) => {
        if (index === position) {
          return {
            ...item,
            startTime: e.target.value,
          };
        }
        return item;
      });
    });
  };

  const handleEndTimeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log({ e, index });
    const position = index;
    setSelectedDays((prev) => {
      return prev.map((item, index) => {
        if (index === position) {
          return {
            ...item,
            endTime: e.target.value,
          };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    const selectedDaysWithoutIsSelected = selectedDays
      .filter((item) => item.isSelected)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ isSelected, ...rest }) => rest);

    getSelectedDays(selectedDaysWithoutIsSelected);
  }, [selectedDays]);

  return (
    <div>
      <SimpleGrid cols={2} spacing={20}>
        {selectedDays.map((item, index) => (
          <Flex key={index} align="center" gap={16} mb={8}>
            <Switch
              checked={item.isSelected}
              value={item.day}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDayChange(e, index)
              }
            />
            <Text style={{ width: "100px" }}>{item.day}</Text>
            <TimeInput
              label="Start Time"
              withSeconds={false}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleStartTimeChange(e, index)
              }
              value={item.startTime}
            />{" "}
            -{" "}
            <TimeInput
              label="End Time"
              value={item.endTime}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleEndTimeChange(e, index)
              }
              withSeconds={false}
            />
          </Flex>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default TimeSelector;
