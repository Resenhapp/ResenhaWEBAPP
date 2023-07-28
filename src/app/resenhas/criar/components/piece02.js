import React, { useState, useEffect, useCallback } from 'react';
import DateScroll from '@/src/components/DateScroll';
import Vector from '@/src/components/Vector';
import EventHour from '@/src/components/EventHourModule';
import Toggle from '@/src/components/Toggle';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from '@/src/components/Modal';
import ptBR from 'date-fns/locale/pt-BR';
import TimePicker from '@/src/components/TimePicker';
import ReactInputMask from 'react-input-mask';

registerLocale('pt', ptBR)


const Piece02 = ({ onDateSelect, onStartHourSelect, onEndHourSelect, onToggleChange, filled }) => {
    const [hasEnd, setHasEnd] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [isStartTimeModalOpen, setIsStartTimeModalOpen] = useState(false);
    const [isEndTimeModalOpen, setIsEndTimeModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [toggleValue, setToggleValue] = useState(true);
    const [isDateSelected, setIsDateSelected] = useState(false);
    // const [isHourSelected, setIsHourSelected] = useState(false);

    const [tempStart, setTempStart] = useState('');
    const handleStartSet = (event) => {
        setTempStart(event.target.value);
        setStartHourSelected(true);
    };
    const [tempEnd, setTempEnd] = useState('');

    const handleEndSet = (event) => {
        setTempEnd(event.target.value);
        setEndHourSelected(true);
    };
    const [startHourSelected, setStartHourSelected] = useState(false);
    const [endHourSelected, setEndHourSelected] = useState(false);
    useEffect(() => {
        if (isDateSelected && startHourSelected && (!hasEnd || endHourSelected)) {
            filled(true);
        } else {
            filled(false);
        }
    }, [isDateSelected, startHourSelected, endHourSelected, hasEnd, filled])
    const handleToggleChange = (isChecked) => {
        setToggleValue(!isChecked);
        onToggleChange(!isChecked);
        setHasEnd(isChecked);
        if (isChecked) {
            setEndHourSelected(true);
        }
    };
    const handleDateChange = (date) => {
        setSelectedDay(date.getDate());
        setSelectedMonth(date.getMonth() + 1);
        setSelectedYear(date.getFullYear());
        setIsDateSelected(true);
        setSelectedDate(date);
        onDateSelect(date);
    };
    useEffect(() => {
        if (selectedDay && selectedMonth && selectedYear) {
            onDateSelect(selectedDay, selectedMonth, selectedYear);
        }
    }, [selectedDay, selectedMonth, selectedYear, onDateSelect]);
    // const currentTime = new Date().toLocaleTimeString([], {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     hour12: false,
    // });
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 2);
    // const lateTime = currentDate.toLocaleTimeString([], {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     hour12: false,
    // });

    // const handleStartChange = (date) => {
    //     setStartHourSelected(true);
    //     onStartHourSelect(date);
    // }

    // const handleEndChange = (date) => {
    //     setEndHourSelected(true);
    //     onEndHourSelect(date);
    // }

    // const onStartTimeSelect = useCallback((time) => {
    //     const newStartTime = new Date(startTime);
    //     newStartTime.setHours(time.hour, time.minute);
    //     setStartTime(newStartTime);
    //     handleStartChange(newStartTime);
    // }, [startTime, handleStartChange, setStartTime]);

    // const onEndTimeSelect = useCallback((time) => {
    //     const newEndTime = new Date(endTime);
    //     newEndTime.setHours(time.hour, time.minute);
    //     setEndTime(newEndTime);
    //     handleEndChange(newEndTime);
    // }, [endTime, handleEndChange, setEndTime]);
    return (
        <div className="w-full flex flex-col h-fit gap-6">
            <div className="flex flex-row flex-end">
                <button
                    className="flex flex-row gap-1 items-center bg-purpleT2 w-fit px-4 py-2 rounded-full ring-1 ring-inset ring-purpleT4"
                    onClick={() => setIsOpen(true)}
                >
                    <Vector vectorname={'calendar03'} />
                    <h1>Escolha uma data</h1>
                </button>
                <Modal show={isOpen} close={() => setIsOpen(false)}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        locale="pt"
                    />
                    <div className='w-full flex-end'>
                        <button onClick={() => setIsOpen(false)} className='bg-purpleT3 ring-1 ring-purpleT4 rounded-full ring-inset py-2 px-4'>Fechar</button>
                    </div>
                </Modal>
            </div>
            <DateScroll onDateSelect={handleDateChange} />
            <hr className='bg-purpleT4 h-[2px] border-none rounded-full' />
            <div className='flex flex-col gap-2'>
                <EventHour
                    hasEnd={hasEnd}
                    placeHolderStart={startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    placeHolderEnd={endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    onStartTimeClick={() => setIsStartTimeModalOpen(true)}
                    onEndTimeClick={() => setIsEndTimeModalOpen(true)}
                />
                {isStartTimeModalOpen &&
                    <Modal show={isStartTimeModalOpen} close={() => setIsStartTimeModalOpen(false)}>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='text-center text-xl mb-4'>Digite o horário que sua resenha começa</h1>
                            <ReactInputMask
                                mask="99:99"
                                maskChar=""
                                value={tempStart}
                                onChange={handleStartSet}
                            >
                                {(inputProps) =>
                                    <input
                                        {...inputProps}
                                        className='w-full text-center text-4xl mb-4 bg-transparent placeholder-purpleT1 text-whiteT1 font-bold'
                                        placeholder='Toque aqui'
                                        type='tel'
                                    />
                                }
                            </ReactInputMask>
                            {/* <TimePicker onTimeSelect={onStartTimeSelect} /> */}
                            <div className='flex flex-row justify-around w-full'>
                                <button onClick={() => setIsStartTimeModalOpen(false)} className='px-8 py-4  text-whiteT1 rounded-full mt-4'>Cancelar</button>
                                <button onClick={() => setIsStartTimeModalOpen(false)} className='px-8 py-4 bg-whiteT1 text-purpleT3 rounded-full mt-4'>Salvar</button>
                            </div>
                        </div>
                    </Modal>
                }
                {isEndTimeModalOpen &&
                    <Modal show={isEndTimeModalOpen} close={() => setIsEndTimeModalOpen(false)}>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='text-center text-xl mb-4'>Digite o horário que sua resenha termina</h1>
                            <ReactInputMask
                                mask="99:99"
                                maskChar=""
                                value={tempEnd}
                                onChange={handleEndSet}
                            >
                                {(inputProps) =>
                                    <input
                                        {...inputProps}
                                        className='w-full text-center text-4xl mb-4 bg-transparent placeholder-purpleT1 text-whiteT1 font-bold'
                                        placeholder='Toque aqui'
                                        type='tel'
                                    />
                                }
                            </ReactInputMask>
                            {/* <TimePicker onTimeSelect={onEndTimeSelect} /> */}
                            <div className='flex flex-row justify-around w-full'>
                                <button onClick={() => setIsEndTimeModalOpen(false)} className='px-8 py-4  text-whiteT1 rounded-full mt-4'>Cancelar</button>
                                <button onClick={() => setIsEndTimeModalOpen(false)} className='px-8 py-4 bg-whiteT1 text-purpleT3 rounded-full mt-4'>Salvar</button>
                            </div>
                        </div>
                    </Modal>
                }
                <Toggle
                    labelText={'Tem hora pra acabar'}
                    questionAction={''}
                    showLabel={true}
                    showQuestion={false}
                    startToggled={false}
                    textColor={'white'}
                    onToggle={handleToggleChange}
                />
            </div>
        </div>
    );
};

export default Piece02;