import TimeSelectList from "./TimeSelectList";
import { useState, useEffect } from "react";
const TimePicker = ({ onTimeSelect }) => {
    const [selectedHour, setSelectedHour] = useState(0);
    const [selectedMinute, setSelectedMinute] = useState(0);

    useEffect(() => {
        onTimeSelect({ hour: selectedHour, minute: selectedMinute });
    }, [selectedHour, selectedMinute, onTimeSelect]);

    return (
        <div className="flex flex-row items-center gap-1">
            <TimeSelectList range={24} onClick={setSelectedHour} selected={selectedHour} />
            <h1 className="text-3xl mb-2">:</h1>
            <TimeSelectList range={60} onClick={setSelectedMinute} selected={selectedMinute} />
        </div>
    );
};

export default TimePicker;