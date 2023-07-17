'use client'

import React, { useState } from 'react';
import ProgressBar from '@/src/components/ProgressBar';
import Piece01 from './components/piece01';
import Piece02 from './components/piece02';
import Piece03 from './components/piece03';
import Piece04 from './components/piece04';
import Piece05 from './components/piece05';
import Loading from '@/src/components/Loading';
import Button from '@/src/components/Button';
import Cookies from 'js-cookie';

export const metadata = {
  title: 'Resenha.app • Nova resenha',
  description: 'Venha fazer suas resenhas!',
};

export default function NewEvent() {
  const username = Cookies.get('username');
  const validator = Cookies.get('validator');

  if (!username || !validator) {
    window.location.href = '/login';
  }

  const axios = require('axios');
  const qs = require('qs');

  const [progress, setProgress] = useState(1);
  const maxProgress = 5;

  const makeRequest = async (url, data) => {
    try {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    }

    catch (error) {
        throw new Error(`Request failed: ${error}`);
    }
  };

  const handleNextStep = async () => {
    if (progress + 1 > maxProgress) {  
      const details = {
        name,
        address,
        isForAdults,
        hasTimeToEnd,
        start,
        end,
        dateSelected,
        selectedGuests,
        selectedPrice,
        descriptionContent,
        tagsContent
      };

      try {
        const response = await makeRequest('http://localhost/resenha.app/api/', { 
          request: 'tryToCreateEvent',
          username: username,
          validator: validator,
          details: details
        });

        if (!response.error) {
          window.location.href = '/webapp/resenhas/';
        }
      } 
      
      catch (error) {
        console.error(error);
      }
    } 
    
    else {
      setProgress(progress + 1);
    }
  };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isForAdults, setIsForAdults] = useState(false);
  const [hasTimeToEnd, setHasTimeToEnd] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [dateSelected, setDateSelected] = useState(null);
  const [selectedGuests, setSelectedGuests] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [descriptionContent, setDescriptionContent] = useState('');
  const [tagsContent, setTagsContent] = useState([]);

  const handlePiece01NameChange = (value) => {
    setName(value);
  };

  const handlePiece01AddressChange = (value) => {
    setAddress(value);
  };

  const handlePiece01ToggleChange = (isChecked) => {
    setIsForAdults(isChecked);
  };

  const handlePiece02ToggleChange = (isChecked) => {
    setHasTimeToEnd(!isChecked);
  };

  const handlePiece02StartHourSelect = (startHour) => {
    setStart(startHour);
  };

  const handlePiece02EndHourSelect = (endHour) => {
    setEnd(endHour);
  };

  const handlePiece02CalendarSelect = (dateSelected) => {
    setDateSelected(dateSelected);
  };

  const handlePiece03GuestsSelect = (guests) => {
    setSelectedGuests(guests);
  };

  const handlePiece03PriceSelect = (price) => {
    setSelectedPrice(price);
  };

  const handlePiece04DescriptionChange = (content) => {
    setDescriptionContent(content);
  };

  const handlePiece04TagsChange = (content) => {
    setTagsContent(content);
  };

  const renderPiece = () => {
    switch (progress) {
      case 0:
        return <Loading />;
      case 1:
        return (
          <Piece01
            onNameFieldChange={handlePiece01NameChange}
            onAddressFieldChange={handlePiece01AddressChange}
            onToggleChange={handlePiece01ToggleChange}
          />
        );
      case 2:
        return (
          <Piece02
          onToggleChange={handlePiece02ToggleChange}
          onStartHourSelect={handlePiece02StartHourSelect}
          onEndHourSelect={handlePiece02EndHourSelect}
          onDateCalendarSelect={handlePiece02CalendarSelect}
          onDateScrollSelect={(day, month, year) => {setDateSelected(day+"/"+month+"/"+year)}}
        />
        );
      case 3:
        return (<Piece03 
        guestsAmount={handlePiece03GuestsSelect}
        priceAmount={handlePiece03PriceSelect}/>);
      case 4:
        return (<Piece04 
        descriptionContent={handlePiece04DescriptionChange}
        selectedTags={handlePiece04TagsChange}/>);
      case 5:
        return <Piece05/>;
      default:
        return null;
    }
  };

  let title, subtitle, buttonText;
  switch (progress) {
    case 0:
      title = '';
      subtitle = '';
      window.location.href = '/webapp/resenhas/';
    case 1:
      title = 'Vamos criar uma resenha?';
      subtitle = 'Primeiro, comece dando um nome para a sua resenha e defina o lugar onde ela vai acontecer:';
      buttonText = 'Próximo';
      break;
    case 2:
      title = 'E quando vai ser?';
      subtitle = 'Agora, defina a <b>data</b> e o <b>horário</b> em que ela vai ocorrer:';
      buttonText = 'Próximo';
      break;
    case 3:
      title = 'E quem entra?';
      subtitle = 'Agora, defina a <b>quanto é para entrar</b> e o <b>limite máximo</b> de convidados:';
      buttonText = 'Próximo';
      break;
    case 4:
      title = 'Algo a acrescentar?';
      subtitle = 'E por fim, adicione uma <b>descrição</b> (como regras, brincadeiras e tals) e <b>tags</b> para sua resenha:';
      buttonText = 'Próximo';
      break;
    case 5:
      title = 'E que tal uma foto?';
      subtitle = 'Pronto! Agora é só escolher uma <b>imagem</b> pra ser a cara da sua resenha! (este passo é opcional):';
      buttonText = 'Criar!';
      break;
    default:
      title = '';
      subtitle = '';
      break;
  }

  return (
    <div className='flex flex-col justify-around w-screen h-screen'>
      <div className='w-full gap-4 align-center mt-8 flex flex-col content-center py-2 px-4'>
        <h1 className='text-[39px] leading-[50px] items-center font-bold text-center'>
          {title}
        </h1>
        <p className='text-center leading-[30px] text-[20px]' dangerouslySetInnerHTML={{ __html: subtitle }}>
        </p>
      </div>
      <div className='flex flex-col h-full items-center justify-end px-4'>
        <section className='flex h-full content-center justify-between flex-col items-center w-full mt-8 max-w-md p-4'>
          {renderPiece()}
          <div className='flex flex-row justify-between w-full'>
            {progress > 0 && (
              <button className='py-4 px-8' onClick={() => setProgress(progress - 1)}>
                Voltar
              </button>
            )}
            <Button
              label={buttonText}
              action={handleNextStep}
              icon={'arrow'}
              iconSide='right'
              height={1}
              width={3}
              textAlign='center'
            />
          </div>
        </section>
        <div className='pb-12 w-full'>
          <ProgressBar barAmount={5} barDone={progress} />
        </div>
      </div>
    </div>
  );
}
