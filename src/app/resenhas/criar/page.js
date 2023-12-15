'use client'

import React, { useState, useEffect } from 'react';
import ProgressBar from '@/src/components/ProgressBar';
import Piece01 from './components/piece01';
import Piece02 from './components/piece02';
import Piece03 from './components/piece03';
import Piece04 from './components/piece04';
import Piece05 from './components/piece05';
import Loading from '@/src/components/Loading';
import Button from '@/src/components/Button';
import Cookies from 'js-cookie';

export default function NewEvent() {
  const token = Cookies.get('token');

  if (!token) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  const axios = require('axios');
  const qs = require('qs');

  const [progress, setProgress] = useState(1);
  const maxProgress = 5;

  const [partyCode, setPartyCode] = useState("");

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
    if (progress + 1 == maxProgress) {  
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
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
          request: 'tryToCreateEvent',
          token: token,
          details: details
        });

        if (!response.error && typeof window !== 'undefined') {
          setPartyCode(response.code);

          setProgress(progress + 1);
        }
      }
      
      catch (error) {
        console.error(error);
      }
    } 

    if (progress + 1 > maxProgress) {  
      window.location.href = '/resenhas/';
    } 
    
    else {
      setProgress(progress + 1);
      setIsFilled(!isFilled)
    }
  };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isForAdults, setIsForAdults] = useState(false);
  const [hasTimeToEnd, setHasTimeToEnd] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [dateSelected, setDateSelected] = useState(''); 

  const [selectedGuests, setSelectedGuests] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [descriptionContent, setDescriptionContent] = useState('');
  const [tagsContent, setTagsContent] = useState([]);

  const [isFilled, setIsFilled] = useState(false);

  const handlePiece01NameChange = (value) => {
    setName(value);
  };

  const handlePiece01AddressChange = (value) => {
    setAddress(value);
  };

  const handlePiece01ToggleChange = (isChecked) => {
    setIsForAdults(isChecked);
  };

  const handlePiece02StartHourSelect = (startHour) => {
    const date = new Date(startHour);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedStartHour = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setStart(formattedStartHour);
    console.log(formattedStartHour);
};

const handlePiece02EndHourSelect = (endHour) => {
    const date = new Date(endHour);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedEndHour = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setEnd(formattedEndHour);
    console.log(formattedEndHour);
};

  const handlePiece02DateSelect = (dateSelected) => {
    if (!(dateSelected instanceof Date && !isNaN(dateSelected))) {
        return;
    }

    const date = new Date(dateSelected);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    setDateSelected(formattedDate);
};

  const handlePiece03GuestsSelect = (guests) => {
    setSelectedGuests(guests);
  };

  const handlePiece03PriceSelect = (price) => {
    setSelectedPrice(price);
  };

  const handlePiece04DescriptionChange = (content) => {
    setDescriptionContent(content);
    setIsFilled(true)
  };

  const handlePiece04TagsChange = (content) => {
    setTagsContent(content);
  };

  const handleCancel = () => {
    window.history.back();
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
            filled={setIsFilled}
          />
        );
      case 2:
        return (
          <Piece02
            onToggleChange={setHasTimeToEnd}
            onStartHourSelect={handlePiece02StartHourSelect}
            onEndHourSelect={handlePiece02EndHourSelect}
            onDateSelect={handlePiece02DateSelect}
            filled={setIsFilled}
          />
        );
      case 3:
        return (<Piece03 
          guestsAmount={handlePiece03GuestsSelect}
          priceAmount={handlePiece03PriceSelect}
          onFillingComplete={setIsFilled}
        />);
      case 4:
        return (<Piece04 
        descriptionContent={handlePiece04DescriptionChange}
        selectedTags={handlePiece04TagsChange}/>);
      case 5:
        return (<Piece05
        filled={setIsFilled} partyCode={partyCode}
        />);
      default:
        return null;
    }
  };

  let title, subtitle, buttonText;
  
  switch (progress) {
    case 0:
      title = '';
      subtitle = '';
      if (typeof window !== 'undefined') {
        window.location.href = '/resenhas/';
      }
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
      buttonText = 'Criar!';
      break;
    case 5:
      title = 'E que tal uma foto?';
      subtitle = 'Agora é só escolher uma <b>imagem</b> pra ser a cara da sua resenha! (este passo é opcional):';
      buttonText = 'Concluir!';
      break;
    default:
      title = '';
      subtitle = '';
      break;
  }

  return (
    <div className='flex flex-col justify-around w-screen h-screen'>
      <div className='w-full gap-4 align-center mt-8 flex flex-col content-center py-2 px-8'>
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
            {progress > 1 && progress !== 5 && (
              <button className='py-4 px-8' onClick={() => setProgress(progress - 1)}>
                Voltar
              </button>
            )}
            
            {progress == 1 && (
              <button className='py-4 px-8' onClick={handleCancel}>
                Cancelar
              </button>
            )}

            {progress == 5 && (
              <button className='py-4 px-8' onClick={handleNextStep}>
               Pular
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
              active={isFilled}
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
