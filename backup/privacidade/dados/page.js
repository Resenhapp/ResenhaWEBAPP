'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import ConfigDropDown from '@/src/components/ConfigDropDown';

export default function PrivacyData() {

    const allData = ['Todos', 'Nenhum']
    const dataShare = ['Todos', 'Nenhum']
    const [method, setMethod] = useState('');

    const handleSelectChange = (event) => {
        setMethod(event.target.value);
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Gerenc. de dados" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <p className="text-whiteT1 text-sm font-semibold">Dados usados para melhorar o app</p>
                                <ConfigDropDown
                                    options={allData}
                                    defaultOption={allData[0]}  //Também possível colocar apenas a string da array options
                                    action={handleSelectChange}
                                />
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">Dados compartilhados entre empresas</p>
                                <ConfigDropDown
                                    options={dataShare}
                                    defaultOption={dataShare[0]}  //Também possível colocar apenas a string da array options
                                    action={handleSelectChange}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}