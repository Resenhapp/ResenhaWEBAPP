'use client'

import Button from '@/src/components/Button';
import PageHeader from '@/src/components/PageHeader';
import MyParty from '@/src/components/MyParty';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';

import { useState, useEffect } from "react";

export default function MyInvites() {
    const token = Cookies.get('token');

    if (!token && typeof window !== 'undefined') {
      window.location.href = '/login';
    }

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };
  
    const fetchData = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getUserData',
            token: token
        });
        
        setData(response);
    };

    const handleOpenClick = (party) => {
      window.location.href = `/convite?c=${party.code}`;
    };

    const handleCopyClick = async (party) => {
      const partyUrl = `https://resenha.app/convite?c=${party.code}`;

      const copyData = {
          text: `Vou colar nessa resenha! Bora junto? `,
          url: `${partyUrl}`,
      };

      const fullTextToCopy = `${copyData.text}${copyData.url}`;

      await navigator.clipboard.writeText(fullTextToCopy);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className='flex flex-col w-screen h-screen'>
          <PageHeader pageTitle={'Seus convites'} isBack={true} checker={() => null} userData={data} />
          <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-start items-center w-full max-w-md p-4">
              <div className='h3 w-full flex'>
                <div className='w-full flex flex-col'>
                  <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                    <h2>Aqui estão todos os seus convites:</h2>
                  </div>
                  <div className='w-full h-full flex flex-col'>
                    <div className="bg-scroll flex flex-col gap-2 h-[55vh] w-full overflow-y-auto">
                      {data.parties.went.map((party) => (
                        <div key={party.id}>
                          <MyParty
                            imageUrl={`https://media.resenha.app/r/${party.hash}.png`}
                            inviteCode={party.token}
                            partyCode={party.code}
                            viewChat={()=>(window.location.href = `/chat?r=${party.code}`)}
                            partyDate={party.date}
                            partyHour={party.start}
                            partyName={party.name}
                            partyPaid={party.paid}
                            shareParty={()=>{handleCopyClick(party)}}
                            viewParty={()=>{handleOpenClick(party)}}
                            viewReceipt={()=>(window.location.href = `/resenhas/comprovante?r=${party.code}&c=${party.token}`)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="flex flex-col mb-4 w-[90%] mt-8 items-center justify-center content-center">
              <Button label={'Descobrir resenhas'} icon={'arrow'} action={() => {window.location.href="/feed"}} iconSide='right' height={1} width={1} textAlign='center' />
            </div>
          </div>
        </div>
    );
}