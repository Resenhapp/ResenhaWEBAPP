'use client'

import Button from '@/src/components/Button';
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import Accordion from '@/src/components/Accordion';
import { useState } from "react";
import { useEffect } from 'react';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';

export default function Help() {
    const copyVector = () => {
        return (
            <div className='inline-flex bg-purpleT2 ring-purpleT3 mx-2 ring-inset rounded-full ring-1 w-6 h-6 align-center justify-center items-center'>
                <svg width="10" height="10" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.76608 10.1782H2.33751C1.54853 10.1782 0.908936 9.56691 0.908936 8.81281V2.27451C0.908936 1.52041 1.54853 0.909088 2.33751 0.909088H6.62322C7.4122 0.909088 8.05179 1.52041 8.05179 2.27451V3.63994H9.48036C10.2693 3.63994 10.9089 4.25126 10.9089 5.00537V11.5437C10.9089 12.2978 10.2693 12.9091 9.48036 12.9091H5.19465C4.40567 12.9091 3.76608 12.2978 3.76608 11.5437V10.1782ZM6.26608 2.27451C6.46332 2.27451 6.62322 2.42735 6.62322 2.61587V3.63994H5.19465C4.40567 3.63994 3.76608 4.25126 3.76608 5.00537V8.81281H2.69465C2.49741 8.81281 2.33751 8.65998 2.33751 8.47145L2.33751 2.61587C2.33751 2.42735 2.49741 2.27451 2.69465 2.27451H6.26608Z" fill="#F1F1F1" />
                </svg>
            </div>
        )
    }

    const id = Cookies.get('user');

    const [data, setData] = useState(null);
    const fetchData = async () => {
        try {
            const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'getHelpData'});
            setData(response);
        }

        catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const axios = require('axios');
    const qs = require('qs');

    const makeRequest = async (url, data) => {
        try {
            const response = await axios.post(url, qs.stringify(data));
            return response.data;
        }

        catch (error) {
            throw new Error(`Request failed: ${error}`);
        }
    };


    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    return (
        <div className='flex flex-col w-screen h-screen'>
          <PageHeader pageTitle={'Ajuda'} />
          <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-col flex-start items-center w-full max-w-md p-4">
              <div className=' h3 w-full flex'>
                <div className='w-full flex flex-col'>
                  <div className='w-full align-center justify-between items-center mb-2 flex flex-row'>
                    <h2>Aqui estão as dúvidas mais frequentes. Caso você precise saber sobre algo mais específico toque em Entrar em contato na parte inferior da página.</h2>
                  </div>
                  <div className='bg-scroll flex flex-col gap-2 h-[50vh] w-full overflow-y-auto'>
                    {data.map((categoryData, index) => {
                      const category = Object.keys(categoryData)[0];
                      const questions = categoryData[category];
                      return (
                        <div key={index}>
                          <h1 className='text-purpleT5 text-xl mt-2'>{category}</h1>
                          <div className='w-full h-[1px] bg-purpleT5 mt-1 mb-2' />
                          <div className='flex flex-col gap-2'>
                            {questions.map((qa, qIndex) => (
                              <Accordion key={qIndex} data={[{ title: qa.question, content: qa.answer }]} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
            <div className="flex flex-col mb-4 w-[90%] mt-8 items-center justify-center content-center">
              <Button
                label={'Entrar em contato'}
                icon={'arrow'}
                action={() => window.open("https://wa.me/5551998261235?text=Ol%C3%A1%2C+eu+preciso+de+ajuda+com+o+Resenha.app", "_blank")}
                iconSide='right'
                height={1}
                width={1}
                textAlign='center'
              />
            </div>
          </div>
        </div>
      );
}