import TimeSelectList from "./TimeSelectList";
import { useState, useEffect, useRef } from "react";

const TimePicker = ({ onTimeSelect }) => {
    const [selectedHour, setSelectedHour] = useState(0);
    const [selectedMinute, setSelectedMinute] = useState(0);

    // Save previous state
    const prevHourRef = useRef();
    const prevMinuteRef = useRef();

    useEffect(() => {
        prevHourRef.current = selectedHour;
        prevMinuteRef.current = selectedMinute;
    });

    // Get previous state
    const prevHour = prevHourRef.current;
    const prevMinute = prevMinuteRef.current;

    if (selectedHour !== prevHour || selectedMinute !== prevMinute) {
        onTimeSelect({ hour: selectedHour, minute: selectedMinute });
    }

    return (
        <div className="flex flex-row items-center gap-1">
            <TimeSelectList range={24} onClick={setSelectedHour} selected={selectedHour} />
            <h1 className="text-3xl mb-2">:</h1>
            <TimeSelectList range={60} onClick={setSelectedMinute} selected={selectedMinute} />
        </div>
    );
};

export default TimePicker;
