'use client';

import { useState } from "react";
import Button from "@/src/components/Button";
import Link from "next/link";
import Vector from "@/src/components/Vector";
import Info from "./pieces/info";
import Loading from "@/src/components/Loading";
import Pix from "./pieces/pix";
import Card from "./pieces/card";
import Cash from "./pieces/cash";
import Confirmation from "./pieces/confirmation";

export default function Checkout() {

    const [progress, setProgress] = useState(1);
    const maxProgress = 5;
    const [isFilled, setIsFilled] = useState(false);

    const [partyName, setPartyName] = useState('Resenha no Terraço');
    const [partyPrice, setPartyPrice] = useState(20.0);
    const [canBeUnderaged, setCanBeUnderaged] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [ticketsAmount, setTicketsAmount] = useState(0);
    const [customerIsEighteen, setCustomerIsEighteen] = useState(true);

    const getValues = () => {
        console.log(`Customer Name: ${customerName}`);
        console.log(`Customer Email: ${customerEmail}`);
        console.log(`Tickets Amount: ${ticketsAmount}`);
        console.log(`Is Eighteen: ${customerIsEighteen}`);
        console.log(`Payment Method: ${paymentMethod}`);
    }

    var method = 'pix';
    const renderPiece = () => {
        switch (progress) {
            case 0:
                return <Loading />;
            case 1:
                return <Info
                    setPaymentMethod={setPaymentMethod}
                    setCustomerName={setCustomerName}
                    setCustomerEmail={setCustomerEmail}
                    setSelectionAmout={setTicketsAmount}
                    getPartyName={partyName}
                    getPartyPrice={partyPrice}
                    setIsFilled={setIsFilled}
                    setCustomerIsEighteen={setCustomerIsEighteen}
                    canBeUnderaged={canBeUnderaged}
                />;
            case 2:
                if (paymentMethod === 'Pix') {
                    return <Pix setPixKey={'sdkasdk-w3d20dk20kd0kdf00-dk29kf0f-f92kf29fj'}
                        setPixQrCodeUrl={'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=ODFKFDkfdssssskc0K)CJ3wf03jf30ftgj030sd-ssss0K)CJ3wf03jf30ftgj030sd-sssssssssssskc0K)CJ3wf03sssssssskc0K)CJ3wf03jf30ftgj0tjfg30tjk320tj2[dasdasdssck03qwkc0K)CJ3wf03jf30ftgj0tjfg30tjk320tj2[dasdasdasdasdddddddddddd3d3df3f-g&chld=L|1&choe=UTF-8'} />
                }
                else if (paymentMethod === 'Dinheiro') {
                    return <Cash setIsFilled={setIsFilled}/>
                }
                else if (paymentMethod === 'Cartão') {
                    return <Card setIsFilled={setIsFilled}/>
                }
            case 3:
                return (
                    <Confirmation />
                )
            default:
                return null;
        }
    }

    const handleNextStep = async () => {
        if (progress + 1 > maxProgress) {
            const details = {
                content,
            };

            try {
                const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
                    request: 'tryToCreateEvent',
                    token: token,
                    details: details
                });

                if (!response.error && typeof window !== 'undefined') {
                    window.location.href = '/webapp/resenhas/';
                }
            }

            catch (error) {
                console.error(error);
            }
        }

        else {
            setProgress(progress + 1);
            setIsFilled(!isFilled)
        }
    };

    let title, subtitle, button, action;
    switch (progress) {
        case 0:
            title = '';
            subtitle = '';
            if (typeof window !== 'undefined') {
                window.location.href = '/webapp/resenhas/';
            }
        case 1:
            title = 'Informações';
            subtitle = 'Antes de continuar, precisamos de algumas informações...';
            button = 'Próximo';
            action = handleNextStep;
            break;
        case 2:
            if (paymentMethod === 'pix') {
                title = 'Pagamento com pix';
                subtitle = 'Realize o pagamento copiando o código abaixo e colando no aplicativo do seu banco.';
                button = 'Próximo';
                action = handleNextStep;
            }
            else if (paymentMethod === 'Cartão') {
                title = 'pagamento com cartão';
                subtitle = 'Insira os dados do seu cartão abaixo para efetuar o pagamento:';
                button = 'Pagar!';
                action = getValues;
            }
            else if (paymentMethod === 'Dinheiro') {
                title = 'Pagamento com dinheiro'
                subtitle = 'Siga as instruções abaixo para pagar com dinheiro no dia da resenha:';
                button = 'Próximo';
                action = handleNextStep;
            }
            break;
        default:
            title = '';
            subtitle = '';
            break;
    }


    return (
        <div className="flex flex-col justify-between h-screen p-4">
            <div className='w-full flex flex-col gap-2'>
                <div className="flex flex-row justify-center mt-8">
                    <Vector vectorname={'logo'} />
                </div>
                <div className="">
                    <p className="text-xl text-center font-bold">{title}</p>
                    <p className="text-sm font-thin text-center">{subtitle}</p>
                </div>
            </div>
            {renderPiece()}
            <footer className="flex flex-col gap-12">
                <div className="flex flex-row w-full">
                    <button className="px-12" onClick={() => setProgress(progress - 1)}>Voltar</button>
                    <Button label={button} icon={'arrow'} action={action} iconSide='right' height={1} width={1} textAlign='center' active={isFilled} />
                </div>
                <div className="flex items-center justify-center">
                    <p className="mr-1">Tem uma conta?</p>
                    <Link href="/cadastro" className="font-bold">Entre aqui!</Link>
                </div>
            </footer>
        </div>
    )
}