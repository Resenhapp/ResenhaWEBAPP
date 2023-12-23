'use client'

import Accordion from "@/src/components/Accordion"

export default function Help({ returnToHome }) {
    const goBack = () => {
        returnToHome("Scanner")
    }

    const accordionData = [
        {
            title: 'Quanto vou receber',
            content: 'O valor a ser recebido depende das condições estabelecidas entre você e o organizador do evento. Recomendamos entrar em contato direto para esclarecer essa informação.'
        },
        {
            title: 'Perdi meu token',
            content: 'Se você perdeu seu token, entre em contato imediatamente com o suporte ou o organizador do evento para auxílio e reemissão de um novo token, se necessário.'
        },
        {
            title: 'Meu hospedeiro não responde',
            content: 'Pedimos paciência, pois o hospedeiro pode estar ocupado. No entanto, se a falta de resposta persistir, entre em contato com nosso suporte para que possamos ajudar na resolução do problema.'
        },
        {
            title: 'Não está funcionando',
            content: 'Se você está enfrentando problemas técnicos, tente reiniciar o aplicativo ou o dispositivo. Se o problema persistir, entre em contato com o suporte técnico.'
        },
        {
            title: 'O código é inválido',
            content: 'Certifique-se de que você está digitando o código corretamente, sem espaços ou caracteres especiais. Se o código ainda for inválido, entre em contato com o organizador do evento ou o suporte.'
        },
        {
            title: 'O código já foi usado',
            content: 'Se você recebeu uma mensagem informando que o código já foi usado, isso significa que ele não pode ser usado novamente. Entre em contato com o organizador do evento ou o suporte para maiores informações.'
        },
        {
            title: 'O código é grande demais',
            content: 'Nossos códigos têm um limite de 4 números. Se o código que você está tentando inserir é maior, pode ser que ele não seja válido. Verifique o código e tente novamente.'
        },
    ];
    
    return (
        <div className="flex flex-col  w-full bg-scroll items-center justify-center content-center gap-2 p-4 overflow-y-auto mt-12 z-[100]">
            <div className="h-[70vh] bg-scroll overflow-y-auto gap-2 flex flex-col w-full">
                {accordionData.map((item, index) => (
                    <Accordion key={index} data={[item]} />
                ))}
            </div>
            <div className='flex flex-row gap-2 mt-8 z-[4]'>
                    <p className=''>Encontrou o que queria? </p><p className='font-bold' onClick={() => goBack()}>Toque aqui</p>
                  </div>
        </div>
    )
}