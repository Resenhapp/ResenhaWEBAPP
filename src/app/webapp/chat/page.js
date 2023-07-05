'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import ChatInput from '@/src/components/ChatInput';
import ChatBubble from '@/src/components/ChatBubble';

export const metadata = {
    title: 'Resenha.app • Chat',
    description: 'Venha fazer suas resenhas!',
}

export default function Chat() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };


    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Chat" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                    <div className="w-full flex flex-col">
    <div className="h-fit w-full gap-2 flex flex-col">
        <div class="bg-scroll flex flex-col gap-2 h-[65vh] w-full overflow-y-auto">
            <ChatBubble imageUrl='https://resenha.app/publico/recursos/imagens/u/fe.jpg' message='Mano, você já imaginou como seria viver em Marte?' timestamp='10:12' sent={false} />
            <ChatBubble imageUrl='https://resenha.app/publico/recursos/imagens/u/rg.jpg' message='Haha, que viagem! Literalmente.' timestamp='10:15' sent={true} />
            <ChatBubble imageUrl='https://resenha.app/publico/recursos/imagens/u/fe.jpg' message='Sério, pense nisso. A NASA diz que até 2030 poderíamos ter humanos lá.' timestamp='10:20' sent={false} />
            <ChatBubble imageUrl='https://resenha.app/publico/recursos/imagens/u/rg.jpg' message='E o que faríamos lá? Plantar batatas como o Matt Damon?' timestamp='10:23' sent={true} />
            <ChatBubble imageUrl='https://resenha.app/publico/recursos/imagens/u/fe.jpg' message='Bem, a ideia seria fazer pesquisas e talvez até começar a terraformação do planeta.' timestamp='10:25' sent={false} />
            <ChatBubble imageUrl='https://resenha.app/publico/recursos/imagens/u/rg.jpg' message='Terraformação? Isso parece coisa de ficção científica.' timestamp='10:28' sent={true} />
            <ChatBubble imageUrl='https://resenha.app/publico/recursos/imagens/u/fe.jpg' message='Pode até parecer, mas há muitos cientistas e engenheiros trabalhando nisso agora mesmo!' timestamp='10:31' sent={false} />
            <ChatBubble imageUrl='https://resenha.app/publico/recursos/imagens/u/rg.jpg' message='Maiumi🤤' timestamp='10:33' sent={true} />
        </div>
        <ChatInput />
    </div>
</div>

                    </div>
                </section>
            </div>
        </div>
    )
}
