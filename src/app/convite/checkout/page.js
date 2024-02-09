'use client';

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
import html2canvas from 'html2canvas';

import { useState, useRef, useEffect } from "react";

export default function Checkout() {
    var token = Cookies.get('token');

    const maxProgress = 5;

    let code = '';
    let promoter = '';

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        code = urlParams.get('c');

        if (urlParams.get('p')) {
            promoter = urlParams.get('p');
        }
    }

    const [progress, setProgress] = useState(1);
    const [isFilled, setIsFilled] = useState(false);
    const [loading, setLoading] = useState(false);

    const [partyName, setPartyName] = useState('');
    const [partyImage, setPartyImage] = useState('');
    const [partyOwner, setPartyOwner] = useState('');
    const [partyDateDay, setPartyDateDay] = useState('');
    const [partyDay, setPartyDay] = useState('');
    const [partyMonth, setPartyMonth] = useState('');
    const [partyHour, setPartyHour] = useState('');
    const [partyAddress, setPartyAddress] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [inviteQrCodeUrl, setInviteQrCodeUrl] = useState('https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=ODFKFDkfd30qfik0KF)-t23t-23tg-32g-2-g&chld=L|1&choe=UTF-8');

    const [partyPrice, setPartyPrice] = useState('');
    const [canBeUnderaged, setCanBeUnderaged] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerIsEighteen, setCustomerIsEighteen] = useState(true);
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cardCpf, setCardCpf] = useState('');
    const [pixData, setPixData] = useState(null);

    const [ticketsAmount, setTicketsAmount] = useState(1);
   
    const [hidestyle, setHideStyle] = useState(!false);
    const [data, setData] = useState(null);

    const axios = require('axios');
    const qs = require('qs');

    const payRequest = async () => {
        setLoading(true);

        var cardObject = {
            cardHolder,
            cardNumber,
            cardExpiration,
            cardCvv,
            cardCpf
        };

        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'tryToCreateGuest',
            token: token,
            name: customerName,
            email: customerEmail,
            maiority: customerIsEighteen,
            method: paymentMethod,
            card: cardObject,
            entries: ticketsAmount,
            code: code,
            promoter: promoter
        });


        if (!response.error) {
            setProgress(progress + 1);
            setInviteCode(response.code);
        }

        else {
            // MOSTRAR ERRO AQUI response.error
        }

        setLoading(false);
    }

    const generateCash = async () => {
        const response = await fetchData();
    }

    const generatePix = async () => {
        const response = await fetchData();

        console.log(response)

        var data = {
            text: response.qrcode.text,
            url: response.qrcode.url,
            charge: response.charge
        };

        setPixData(data);
        setLoading(false);
    }

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const fetchPartyData = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getInviteData',
            code: code
        });

        setData(response);
        setPartyName(response.title);
        setPartyPrice(response.ticket)
        setPartyOwner(response.host)
        setPartyAddress(response.address)
        setPartyHour(response.hour.start)
        setPartyDateDay(response.date.day)
        setPartyDay(response.date.dayString)
        setPartyMonth(response.date.monthString)
        setPartyImage(`https://media.resenha.app/r/${response.hash}.png`)

        if (response.guests.confirmed == response.guests.capacity) {
            window.history.back();
        }
    };

    const fetchData = async () => {
        setLoading(true);

        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'tryToCreateGuest',
            token: token,
            name: customerName,
            email: customerEmail,
            maiority: customerIsEighteen,
            method: paymentMethod,
            code: code,
            entries: ticketsAmount,
            promoter: promoter
        });

        if (response.error) {
            window.history.back();
        }

        setInviteCode(response.code);

        setLoading(false);
        
        return response;
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
                    }
                    
                    else {
                        window.open(data);
                    }
                }, 3);
            }, 3);
        }, 3);
    }
    
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
                if (paymentMethod === 'Pix' && pixData) {
                    return <Pix setPixKey={pixData["text"]} setPixQrCodeUrl={pixData["url"]} transactionCharge={pixData["charge"]} setIsFilled={setIsFilled} setProgress={setProgress} progress={progress} />
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

    const handleNextStep = () => {
        if (paymentMethod === "Pix"){
            generatePix();
        }

        if (progress == 2) {
            if (paymentMethod == "Dinheiro") {
                generateCash();
            }
        }

        if (progress + 1 > maxProgress) {

        }

        else {
            setProgress(progress + 1);
            setIsFilled(!isFilled)
        }
        
    };

    let title, subtitle, button, action;

    switch (progress) {
        case 0:
            if (typeof window !== 'undefined') {
                window.history.back();
            }
        case 1:
            title = 'Informações';
            subtitle = 'Para continuar, precisamos de algumas informações...';
            button = 'Próximo';
            action = handleNextStep;
            break;
        case 2:
            if (paymentMethod === 'Pix') {
                title = 'Pagamento com pix';
                subtitle = 'Realize o pagamento copiando o código abaixo e colando no aplicativo do seu banco. Caso não seja você quem vai pagar, também pode usar o QR Code.';
                button = 'Já paguei';
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

        setLoading(false);
    };

    const handleButtonClick = () => {
        if (progress == 1) {
            window.history.back();
        }

        else {
            setProgress(progress - 1);
            setPaymentMethod(0)
        }
    };

    useEffect(() => {
        if ((paymentMethod === 'Pix' || paymentMethod === 'Dinheiro' || paymentMethod === 'Cartão') && (canBeUnderaged || customerIsEighteen)) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [paymentMethod, customerIsEighteen, canBeUnderaged]);
    
    useEffect(() => {
        if (token) {
          fetchUserData();
        }
    }, []);

    useEffect(() => {
        fetchPartyData();
    }, []);

    if (!data || loading) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
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
                        <button className="px-12" onClick={handleButtonClick}>
                            Voltar
                        </button>
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