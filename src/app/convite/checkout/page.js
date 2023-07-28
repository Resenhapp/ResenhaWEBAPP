'use client';

import { useState, useRef, useEffect } from "react";
import Button from "@/src/components/Button";
import Link from "next/link";
import Vector from "@/src/components/Vector";
import Info from "./pieces/info";
import Loading from "@/src/components/Loading";
import Pix from "./pieces/pix";
import Card from "./pieces/card";
import Cash from "./pieces/cash";
import Confirmation from "./pieces/confirmation";
import Cookies from 'js-cookie';

export default function Checkout() {
    var token = Cookies.get('token');

    const maxProgress = 5;

    let code = '';

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        code = urlParams.get('c');
    }

    const [progress, setProgress] = useState(1);
    const [isFilled, setIsFilled] = useState(false);
    const [loading, setLoading] = useState(false);

    const [partyName, setPartyName] = useState('Resenha no Terraço');
    const [partyImage, setPartyImage] = useState('https://media.resenha.app/r/37a8eec1ce19687d132fe29051dca629d164e2c4958ba141d5f4133a33f0688f.png');
    const [partyOwner, setPartyOwner] = useState('Vitor Prates');
    const [partyDateDay, setPartyDateDay] = useState('26');
    const [partyDay, setPartyDay] = useState('Quinta');
    const [partyMonth, setPartyMonth] = useState('Maio');
    const [partyHour, setPartyHour] = useState('21:00h');
    const [partyAddress, setPartyAddress] = useState('Rua Ramiro Barcelos 1450');
    const [inviteCode, setInviteCode] = useState('1352');
    const [inviteQrCodeUrl, setInviteQrCodeUrl] = useState('https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=ODFKFDkfd30qfik0KF)-t23t-23tg-32g-2-g&chld=L|1&choe=UTF-8');

    const [partyPrice, setPartyPrice] = useState(20.0);
    const [canBeUnderaged, setCanBeUnderaged] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [ticketsAmount, setTicketsAmount] = useState(0);
    const [customerIsEighteen, setCustomerIsEighteen] = useState(true);
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cardCpf, setCardCpf] = useState('');
   
    const [hidestyle, setHideStyle] = useState(!false);

    const axios = require('axios');
    const qs = require('qs');

    const payRequest = () => {
        console.log(`Credit card holder: ${cardHolder}`);
        console.log(`Credit card number: ${cardNumber}`);
        console.log(`Credit card expiration: ${cardExpiration}`);
        console.log(`Credit card cvv: ${cardCvv}`);
        console.log(`Credit card cpf: ${cardCpf}`);
    }

    const getValues = () => {
        console.log(`Customer Name: ${customerName}`);
        console.log(`Customer Email: ${customerEmail}`);
        console.log(`Tickets Amount: ${ticketsAmount}`);
        console.log(`Is Eighteen: ${customerIsEighteen}`);
        console.log(`Payment Method: ${paymentMethod}`);
    }

    const makeRequest = async (url, data) => {
        try {
            const response = await axios.post(url, qs.stringify(data));
            return response.data;
        } 
        
        catch (error) {
            throw new Error(`Request failed: ${error}`);
        }
    };

    const fetchData = async () => {
        try {
            const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
                request: 'tryToCreateGuest',
                token: token,
                name: customerName,
                email: customerEmail,
                maiority: customerIsEighteen,
                method: paymentMethod,
                code: code
            });

            if (response.error) {
                window.history.back();
            }

            var data = [
                response.code,
                response.qrcode
            ];
            
            return data;
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const printRef = useRef();
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
                    loadName={customerName}
                    loadEmail={customerEmail}
                    getPartyName={partyName}
                    getPartyPrice={partyPrice}
                    setIsFilled={setIsFilled}
                    setCustomerIsEighteen={setCustomerIsEighteen}
                    canBeUnderaged={canBeUnderaged}
                />;
                break;
            case 2:
                if (paymentMethod === 'Pix') {
                    var pixData = fetchData();

                    return <Pix setPixKey={pixData[0]} setPixQrCodeUrl={pixData[1]} />
                }

                else if (paymentMethod === 'Dinheiro') {
                    return <Cash setIsFilled={setIsFilled} />
                }

                else if (paymentMethod === 'Cartão') {
                    return <Card setIsFilled={setIsFilled}
                        setCardHolder={setCardHolder}
                        setCardNumber={setCardNumber}
                        setCardCPF={setCardCpf}
                        setCardCVV={setCardCvv}
                        setCardExpiration={setCardExpiration}
                    />
                }
                break;
            case 3:
                return (
                    <Confirmation save={saveInvite} buttonsVisible={hidestyle} 
                    InviteCode={inviteCode} 
                    InviteQrCodeUrl={inviteQrCodeUrl} 
                    PartyAddress={partyAddress} PartyDateDay={partyDateDay}
                    PartyDay={partyDay} PartyHour={partyHour} 
                    PartyImage={partyImage} PartyMonth={partyMonth}
                    PartyName={partyName} PartyOwner={partyOwner}/>
                )
                break;
            default:
                return null;
        }
    }

    const handleNextStep = async () => {
        console.log(progress);
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
            console.log(progress);
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
            if (paymentMethod === 'Pix') {
                title = 'Pagamento com pix';
                subtitle = 'Realize o pagamento copiando o código abaixo e colando no aplicativo do seu banco. Caso não seja você quem vai pagar, também pode usar o QR Code.';
                button = 'Próximo';
                action = handleNextStep;
            }
            else if (paymentMethod === 'Cartão') {
                title = 'Pagamento com cartão';
                subtitle = 'Insira os dados do seu cartão abaixo para efetuar o pagamento:';
                button = 'Pagar!';
                action = payRequest;
            }
            else if (paymentMethod === 'Dinheiro') {
                title = 'Pagamento com dinheiro'
                subtitle = 'Siga as instruções abaixo para pagar com dinheiro no dia da resenha:';
                button = 'Próximo';
                action = handleNextStep;
            }
            break;
        case 3:
            title = 'Pronto!'
            subtitle = 'Utilize o código abaixo no dia da resenha para entrar! Ele também será enviado ao e-mail informado anteriormente.';
            break;
        default:
            title = '';
            subtitle = '';
            break;
    }

    const fetchUserData = async () => {
        setLoading(true);
    
        try {
            const requested = [
                "name",
                "email"
            ];

            const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
                request: 'getUserData',
                token: token,
                requested: requested
            });

            if (response.name && response.email) {
                setCustomerName(response.name);
                setCustomerEmail(response.email);
            }
        }
        
        catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (token) {
          fetchUserData();
        }
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-around h-screen p-4" >
            <div className='w-full flex flex-col gap-2'>
                <div className="flex flex-row justify-center mt-8">
                    <Vector vectorname={'logo'} />
                </div>
                <div id="idOfElementToHide">
                    <p className="text-xl text-center font-bold">{title}</p>
                    <p className="text-sm font-thin text-center">{subtitle}</p>
                </div>
            </div>
            {renderPiece()}
            {
                progress < 3 ? (
                    <footer className="flex flex-col gap-12 w-full justify-center content-center items-center" >
                        <div className="flex flex-row w-full justify-center max-w-md">
                            <button className="px-12" onClick={() => setProgress(progress - 1)}>Voltar</button>
                            <Button label={button} icon={'arrow'} action={action} iconSide='right' height={1} width={1} textAlign='center' active={isFilled} />
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="mr-1">Tem uma conta?</p>
                            <Link href="/cadastro" className="font-bold">Entre aqui!</Link>
                        </div>
                    </footer>
                ) : null
            }
        </div>
    )
}