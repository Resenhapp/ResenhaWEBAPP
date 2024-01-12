'use client'

import Image from 'next/image';
import Vector from '@/src/components/Vector';
import html2canvas from 'html2canvas';
import PageHeader from '@/src/components/PageHeader';
import Loading from '@/src/components/Loading';

import React, { useEffect, useState } from 'react';

export default function Receipt({}) {
  const axios = require('axios');
  const qs = require('qs');

  const [data, setData] = useState(null);

  let invite = '';
  let code = '';

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);

    invite = urlParams.get('r');
    code = urlParams.get('c');
  }

  const [visible, setVisible] = useState(true);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const [PartyName, setPartyName] = useState('');
  const [PartyOwner, setPartyOwner] = useState('');
  const [PartyDateDay, setPartyDateDay] = useState('');
  const [PartyMonth, setPartyMonth] = useState('');
  const [PartyHour, setPartyHour] = useState('');
  const [PartyAddress, setPartyAddress] = useState('');
  const [InviteCode, setInviteCode] = useState('');

  const [PartyImage, setPartyImage] = useState('')
  
  const [hidestyle, setHideStyle] = useState(!false);

  const makeRequest = async (url, data) => {
    const response = await axios.post(url, qs.stringify(data));
    return response.data;
  };

  const fetchData = async () => {
    const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
      request: 'getInviteData',
      code: invite
    });

    setData(response);

    setPartyName(response.title);
    setPartyOwner(response.host.name);
    setPartyDateDay(response.date.day);
    setPartyMonth(response.date.monthString);
    setPartyHour(response.hour.start);
    setPartyAddress(response.address);
    setInviteCode(code);
    setPartyImage(`https://media.resenha.app/r/${response.hash}.png`)
  };

  const saveInvite = async () => {
    setTimeout(() => {
        setHideStyle(false);
        setTimeout(() => {
            const elementToHide = document.getElementById('idOfElementToHide');
            elementToHide.style.display = 'none';
            setTimeout(async () => {
                const canvas = await html2canvas(document.body, {useCORS: true});
                const data = canvas.toDataURL('image/jpg');
                const link = document.createElement('a');

                elementToHide.style.display = '';

                if (typeof link.download === 'string') {
                    link.href = data;
                    link.download = 'ingresso.jpg';

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setTimeout(() => {
                        setHideStyle(true);
                    }, 500);
                } else {
                    window.open(data);
                }
            }, 3);
        }, 3);
    }, 3);
  }
  
  useEffect(() => {
    fetchData();

    setVisible(buttonsVisible);
  }, [buttonsVisible]);

  if (!data) {
    return (
        <div className="h-screen w-full flex justify-center content-center items-center">
            <Loading />
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 h-full">
      <PageHeader isBack={true} checker={() => { null }} pageTitle="Comprovante" />
      <section className="flex flex-col items-center w-full max-w-md h-full">
        <div className="flex flex-col items-center justify-center px-4 h-full">
          <section className="flex flex-col items-center w-full max-w-md h-full">
          <div className="flex flex-row justify-center mt-8">
                    <Vector vectorname={'logo'} />
                </div>
                <p className='text-center mt-4'>Abaixo está o seu comprovante para participar da resenha. Use o QR code ou a sequência numérica de 4 dígitos para participar.</p>
            <div className="flex flex-col w-full my-2">
              <div className="flex h-full flex-col rounded-2xl ring-1 ring-whiteT2 bg-white p-4">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <div className="flex items-center rounded-md ring-1 w-fit h-fit ring-whiteT2 justify-center">
                      <Image
                        src={PartyImage}
                        width={50}
                        height={50}
                        alt="QR Code"
                        className="z-1 rounded-md object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h1 className="font-bold text-xl h-fit text-blackT1">{PartyName}</h1>
                      <h3 className="font-bold text-sm h-fit text-blackT1">Por: {PartyOwner}</h3>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 mt-4">
                    <div className="flex flex-col">
                      <div>
                        <h1 className="font-bold text-sm text-grayT0">Data:</h1>
                        <h3 className="font-bold text-blackT1">{PartyDateDay} de {PartyMonth}</h3>
                      </div>
                      <div>
                        <h1 className="font-bold text-sm text-grayT0">Horário:</h1>
                        <h3 className="font-bold text-blackT1">às {PartyHour}</h3>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div>
                        <h1 className="font-bold text-sm text-grayT0">Endereço:</h1>
                        <h3 className="font-bold text-blackT1">{PartyAddress}</h3>
                      </div>
                      <div>
                        <h1 className="font-bold text-sm text-grayT0">Código:</h1>
                        <h3 className="font-bold text-blackT1">{InviteCode}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center content-center mt-4'>
                  <Vector vectorname={'dotted'} />
                </div>
                <div className="flex items-center mt-8 mb-4 justify-center">
                  <img
                    src={"https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+InviteCode}
                    width={210}
                    height={210}
                    alt="QR Code"
                    className="z-1 object-cover"
                  />
                </div>
              </div>
            </div>
            {visible == true ? (
              <div className="flex flex-row-reverse gap-2 items-center my-4 w-full" id="idOfElementToHide">
                {/* <Button
                  label={'Salvar'}
                  icon={'arrowDown'}
                  action={()=>{saveInvite()}}
                  iconSide="right"
                  height={1}
                  width={1}
                  textAlign="center"
                /> */}
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </div>
  );
}