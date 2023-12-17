'use client'

import PageHeader from '@/src/components/PageHeader';
import UserProfileEditor from '@/src/components/UserProfileEditor';
import Vector from '@/src/components/Vector';
import EditInfoPage from '@/src/components/EditInfoPage';
import Tag from '@/src/components/Tag';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

import React, { useState, useEffect } from 'react';

import { interestsData } from '@/src/components/interestsData';

export default function EditProfile() {
    var token = Cookies.get('token');

    const [newProfile, setNewProfile] = useState(null);
    const [data, setData] = useState(null);

    const axios = require('axios');
    const qs = require('qs');

    var [about, setAbout] = useState('');
    var [tempAbout, setTempAbout] = useState('');
    var [newTempAbout, setNewTempAbout] = useState('');
    var [isEditAboutPageOpen, setIsEditAboutPageOpen] = useState(false);

    var [name, setName] = useState(name);
    var [username, setUsername] = useState(username);
    var [tempName, setTempName] = useState('');
    var [newTempName, setNewTempName] = useState('');
    var [tempUsername, setTempUsername] = useState('');
    var [newTempUsername, setNewTempUsername] = useState('');
    var [isEditUsernamePageOpen, setIsEditUsernamePageOpen] = useState(false);

    const [isUsernameErrorVisible, setIsUsernameErrorVisible] = useState(false);
    const [errorIndex, setErrorIndex] = useState(null);

    const errors = [
        "0", // 0
        "O nome de usuário deve ter pelo menos 5 caracteres.", // 1
        "O nome de usuário deve começar com uma letra e pode conter apenas letras, números e sublinhados (_).", // 2
        "Este nome de usuário já existe.", // 3
        "O nome de usuário não pode ficar vazio.", // 4
        "O seu nome não pode ficar vazio.", // 5
        "O seu nome não pode conter caracteres especiais.",  // 6
        "Os campos de nome de usuário e nome não podem ficar vazios.", // 7
        "O nome de usuário e o nome não podem conter caracteres especiais.", // 8
        "Os campos de nome de usuário e nome devem ter pelo menos 5 caracteres.", // 9
        "Este nome de usuário já existe e o nome não pode ficar vazio.", // 10
        "Este nome de usuário já existe e o nome não pode conter caracteres especiais.", // 11
        "O nome de usuário e o nome devem começar com uma letra e podem conter apenas letras, números e sublinhados (_).", // 12
    ];
      
    const [isEditInterestsPageOpen, setIsEditInterestsPageOpen] = useState(false);
    const [userInterests, setUserInterests] = useState([]);
    const [tempUserInterests, setTempUserInterests] = useState(userInterests);

    if (!token) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
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
                request: 'getUserData',
                token: token
            });

            setData(response);

            setNewTempName(response.name);
            setTempName(response.name);
            setNewTempUsername(response.username);
            setTempUsername(response.username);
            setAbout(response.about);
            setNewTempAbout(response.about);
            setTempAbout(response.about);

            const interests = response.interests;
            const interestsAsIntegers = [];

            for (let i = 0; i < interests.length; i++) {
                const interest = parseInt(interests[i], 10);
                interestsAsIntegers.push(interest);
            }

            setUserInterests(interestsAsIntegers);
        }

        catch (error) {
            console.error(error);
        }
    };

    const sendEditRequest = async (data) => {
        try {
            const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
                request: 'editUserData',
                token: token,
                data: data
            });

            return response;
        }

        catch (error) {
            console.error(error);
        }
    };

    const toggleEditInterestsPageOpen = () => {
        if (isEditInterestsPageOpen) {
            setTempUserInterests(userInterests);
        }
        setIsEditInterestsPageOpen(!isEditInterestsPageOpen);
    };

    const handleInterestClick = (interestId) => {
        setTempUserInterests(
            tempUserInterests.includes(interestId)
                ? tempUserInterests.filter(id => id !== interestId)
                : [...tempUserInterests, interestId]
        );
    };

    const saveInterests = async () => {
        setUserInterests(tempUserInterests);

        const data = {
            interests: tempUserInterests
        };

        try {
            const response = await sendEditRequest(data);

            if (!response.error) {
                toggleEditInterestsPageOpen();
            }
        }

        catch (error) {
            console.error(error);
        }
    };

    const fixNameData = () => {
        setTempName(newTempName);
    }

    const toggleEditUsernamePageOpen = () => {
        setIsEditUsernamePageOpen(!isEditUsernamePageOpen);
        setIsUsernameErrorVisible(false);
    };

    const cancelNameUsernameChange = () => {
        if (tempUsername !== newTempUsername || tempName !== newTempName) {
            setNewTempName(tempName);
            setNewTempUsername(tempUsername);
        }
        setIsEditUsernamePageOpen(!isEditUsernamePageOpen);
    };

    const handleNameChange = (event) => {
        setNewTempName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setNewTempUsername(event.target.value);
    };

    const saveNameAndUsername = async () => {
        setName(prevName => {
            if (prevName !== newTempName) {
                setTempName(newTempName);
                return newTempName;
            }
            return prevName;
        });

        setUsername(prevUsername => {
            if (prevUsername !== newTempUsername) {
                setTempUsername(newTempUsername);
                return newTempUsername;
            }
            return prevUsername;
        });

        if (newTempUsername !== tempUsername || newTempName !== tempName) {
            const data = {};

            if (newTempUsername != tempUsername) {
                data.username = newTempUsername;
            }

            if (newTempName != tempName) {
                data.name = newTempName;
            }

            try {
                const response = await sendEditRequest(data);
                if (response.status = 'success'){toggleEditUsernamePageOpen};
                if (response.error) {
                  switch (response.error) {
                    case "used_username":
                      setErrorIndex(3);
                      break;
                    case "empty_username":
                      setErrorIndex(4);
                      break;
                    case "short_username":
                      setErrorIndex(1);
                      break;
                    case "invalid_username":
                      setErrorIndex(2);
                      break;
                    default:
                      console.error('Unhandled error type:', response.error);
                      break;
                  }
                  setIsUsernameErrorVisible(true);
                } 
                
                else {
                    setIsUsernameErrorVisible(false);
            toggleEditUsernamePageOpen();
                }
              } 
              
            catch (error) {
                console.error(error);
            }
        }

        else {
            toggleEditUsernamePageOpen();
        }
    };

    const fixAboutData = () => {
        setTempAbout(newTempAbout);
    }

    const cancelAboutChange = () => {
        if (tempAbout !== newTempAbout) {
            setNewTempAbout(tempAbout);
        }
        setIsEditAboutPageOpen(!isEditAboutPageOpen);
    }

    const toggleEditAboutPageOpen = () => {
        fixAboutData();
        setIsEditAboutPageOpen(!isEditAboutPageOpen);
    };

    const handleAboutChange = (event) => {
        setNewTempAbout(event.target.value);
    };

    const saveAbout = async () => {
        setAbout(prevAbout => {
            if (prevAbout !== newTempAbout) {
                setTempAbout(newTempAbout);
                return newTempAbout;
            }
            return prevAbout;
        });

        if (newTempAbout != tempAbout) {
            const data = {
                about: newTempAbout
            };

            try {
                const response = await sendEditRequest(data);

                if (!response.error) {
                    toggleEditAboutPageOpen();
                }
            }

            catch (error) {
                console.error(error);
            }
        }

        else {
            toggleEditAboutPageOpen();
        }
    };

    const [allInterests, setAllInterests] = useState(
        [...interestsData].map((interest) => {
            const isSelected = userInterests.includes(interest.id);
            return { ...interest, selected: isSelected };
        }).sort((a, b) => b.selected - a.selected)
    );

    useEffect(() => {
        if (!isEditAboutPageOpen) {
            setTempAbout(about);
        }
    }, [isEditAboutPageOpen]);

    useEffect(() => {
        setTempName(name);
        setTempUsername(username);
    }, [name, username]);

    useEffect(() => {
        setTempName(name);
        setTempUsername(username);
    }, [name, username]);

    useEffect(() => {
        setTempUserInterests(userInterests);
    }, [userInterests]);

    useEffect(() => {
        setAllInterests(
            [...interestsData].map((interest) => {
                const isSelected = tempUserInterests.includes(interest.id);
                return { ...interest, selected: isSelected };
            }).sort((a, b) => b.selected - a.selected)
        );
    }, [tempUserInterests]);

    useEffect(() => {
        fetchData();
    }, []);

    const validUserInterests = userInterests.filter(interestId => allInterests.some(interest => interest.id === interestId));
    const renderInterests = validUserInterests.map(interestId => allInterests.find(interest => interest.id === interestId));

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
            </div>
        );
    }

    var { name, username, about, verified, hash } = data

    return (
        <div>
            <div className='flex flex-col w-screen h-screen'>
                <PageHeader pageTitle={'Editar perfil'} isBack={true} destination={"/perfil?u=" + newTempUsername} checker={() => { null }} userData={data} />
                <div className="flex flex-col items-center justify-center h-screen px-4">
                    <section className="flex flex-col gap-4 h-full items-center w-full max-w-md p-4">
                        <EditInfoPage isOpen={isEditInterestsPageOpen} pageTitle={'Seus interesses'} saveAction={saveInterests} togglePage={toggleEditInterestsPageOpen}>
                            <div className='w-full'>
                                <div className='flex flex-wrap gap-2 overflow-auto' style={{ maxHeight: '200px' }}>
                                    {[...allInterests].sort((a, b) => b.selected - a.selected).map((interest) => (
                                        <Tag
                                            key={interest.id}
                                            tagname={interest.name}
                                            type={interest.type}
                                            colorName={interest.colorName}
                                            highlightColor={interest.highlightColor}
                                            isEditable={true}
                                            onClick={() => handleInterestClick(interest.id)}
                                            selected={interest.selected}
                                            ringColor={interest.ringColor}
                                            ringThickness={interest.ringThickness}
                                            weight={interest.weight}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className='text-sm'>
                                    Os interesses do usuário são palavras-chave que você pode incluir para ajudar a descrever e categorizar suas preferências. Eles serão visíveis a outros usuários ao visitarem seu perfil e podem ajudar a dar uma ideia rápida do que você gosta. Escolha interesses que representem bem suas preferências e estilo.
                                </p>
                            </div>
                        </EditInfoPage>
                        <EditInfoPage isOpen={isEditUsernamePageOpen} pageTitle={'Nome e @utilizador'} saveAction={saveNameAndUsername} togglePage={cancelNameUsernameChange}>
                            <div className='w-full'>
                                <label className='font-bold'>Nome:</label>
                                <input
                                    className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 '
                                    placeholder='Nome de usuário'
                                    value={newTempName}
                                    onChange={handleNameChange}
                                />
                                <label className='font-bold'>Nome de usuário:</label>
                                <input
                                    className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 '
                                    placeholder='@'
                                    value={newTempUsername}
                                    onChange={handleUsernameChange}

                                />
                            </div>
                            <p className={`text-redT4 ${isUsernameErrorVisible ? 'block' : 'hidden'}`}>{errors[errorIndex]}</p>

                            <p className='text-sm'>
                                Seu nome e nome de usuário são identificações importantes. O nome pode ser livremente escolhido e o nome de usuário é único, permitindo que outros usuários possam mencionar ou buscar você na plataforma. Escolha um que represente sua identidade.
                            </p>
                        </EditInfoPage>
                        <EditInfoPage isOpen={isEditAboutPageOpen} saveAction={saveAbout} pageTitle={'Sobre você'} togglePage={cancelAboutChange}>
                            <div className='w-full'>
                                <textarea
                                    rows="4"
                                    className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                                    placeholder='Fale sobre você'
                                    value={newTempAbout}
                                    onChange={handleAboutChange}
                                ></textarea>
                            </div>
                            <div>
                                <p className='text-sm'>
                                    Falar sobre você é uma grande oportunidade para se apresentar aos outros usuários.
                                    Essas informações serão visíveis no seu perfil, portanto, escreva de forma clara e atrativa, mostrando o que as pessoas podem esperar ao interagir com você.
                                </p>
                            </div>
                        </EditInfoPage>
                        <div className='w-full flex justify-center'>
                            <UserProfileEditor
                                currentProfile={`https://media.resenha.app/u/${hash}.png`}
                                newProfile={newProfile}
                                onChange={newImage => {
                                    setNewProfile(newImage);
                                }}
                            />
                        </div>
                        <div className='w-full flex flex-col items-center'>
                            <div onClick={() => {
                                fixNameData();
                                toggleEditUsernamePageOpen();
                            }} className='flex flex-row items-center gap-2 w-fit bg-purpleT ring-1 ring-inset ring-whiteT1 px-2 py-1 rounded-xl'>
                                <div className='flex flex-col items-center'>
                                    <div className='flex flex-row items-center justify-center content-center gap-1'>
                                        <h1 className='font-bold text-2xl'>{newTempName}</h1>{verified == true && <Vector vectorname={'verified02'} />}
                                    </div>
                                    <h3 className='font-normal text-sm'>@{newTempUsername}</h3>
                                </div>
                                <div className='right-0 top-0 rounded-full'>
                                    <Vector vectorname={'edit02'} />
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-fit'>
                            <div onClick={() => {
                                fixAboutData()
                                toggleEditAboutPageOpen();
                            }} className="bg-transparent ring-1 ring-inset ring-whiteT1 flex flex-col w-full h-fit p-2 rounded-2xl">
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className='font-bold text-lg'>Sobre</h1>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <p className="text-left h-fit" style={{ whiteSpace: "normal", overflowWrap: "break-word" }}>{newTempAbout}</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div onClick={(e) => {
                                e.stopPropagation();
                                toggleEditInterestsPageOpen();
                            }}
                                className="bg-transparent ring-1 ring-inset ring-whiteT1 flex flex-col w-full h-fit p-2 gap-2 rounded-2xl"
                            >
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className='font-bold text-lg'>Interesses</h1>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {renderInterests.map((interest) => (
                                        <Tag
                                            key={interest.id}
                                            tagname={interest.name}
                                            type={interest.type}
                                            colorName={interest.colorName}
                                            highlightColor={interest.highlightColor}
                                            isEditable={false}
                                            ringThickness={interest.ringThickness}
                                            ringColor={interest.ringColor}
                                            weight={interest.weight}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}