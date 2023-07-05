'use client'
import Button from '@/src/components/Button';
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import Accordion from '@/src/components/Accordion';
import { useState } from "react";
import { useEffect } from 'react';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';
import EditInfoPage from '@/src/components/EditInfoPage';
import SearchInput from '@/src/components/SearchInput';
import FeedDualButton from '@/src/components/FeedDualButton';
import MyInvitesDisplay from '@/src/components/MyInvitesDisplay';
import MyEventsDisplay from '@/src/components/MyEventsDisplay';
import PartyBanner from '@/src/components/PartyBanner';
import Map from '@/src/components/Map';
import Modal from '@/src/components/Modal';
import Tag from '@/src/components/Tag';
import { tagsData } from "@/src/components/tagsData"
import { interestsData } from '@/src/components/interestsData';
export const metadata = {
  title: 'Resenha.app • Explorar',
  description: 'Venha fazer suas resenhas!',
}

export default function Feed() {
  const id = Cookies.get('user');

  const exampleNameEvent = "BAILE FUNK NA CAVALHADA";
  const exampleDateEvent = "16/09/2023";
  const exampleHourEvent = "20";
  const exampleGuestsEvent = "10";
  const exampleLimitEvent = "100";
  const exampleImageEvent = "https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png";
  const examplePriceEvent = 100;
  const exampleSavedEvent = false;
  const exampleTagsEvent = [0, 1]

  const [isDisplayingEvents, setIsDisplayingEvents] = useState(true);

  const [isEditFilterPageOpen, setIsEditFilterPageOpen] = useState(false);
  const toggleEditFilterPageOpen = () => {
    setIsEditFilterPageOpen(!isEditFilterPageOpen);
  };


  const handleDisplayToggle = () => {
    setIsDisplayingEvents(!isDisplayingEvents);
  };
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLocationSelect = (location) => {
    setInputValue(location);
    toggleModal();  // Fechar o modal após a seleção de localização
  };
  const exampleImagesEvent = ['https://resenha.app/publico/recursos/imagens/u/fe.jpg', 'https://resenha.app/publico/recursos/imagens/u/fe.jpg', 'https://resenha.app/publico/recursos/imagens/u/fe.jpg']

  const [inputRadiusValue, setInputRadiusValue] = useState(15);
  const [eventTags, setEventTags] = useState([]);
  const [tempEventTags, setTempEventTags] = useState(eventTags);

  const [allTags, setAllTags] = useState(
    [...tagsData].map((tag) => {
      const isSelected = eventTags.includes(tag.id);
      return { ...tag, selected: isSelected };
    }).sort((a, b) => b.selected - a.selected)
  );

  useEffect(() => {
    setTempEventTags(eventTags);
  }, [eventTags]);

  useEffect(() => {
    setAllTags(
      [...tagsData].map((tag) => {
        const isSelected = tempEventTags.includes(tag.id);
        return { ...tag, selected: isSelected };
      }).sort((a, b) => b.selected - a.selected)
    );
  }, [tempEventTags]);

  const handleTagClick = (tagId) => {
    let updatedTags = allTags.map((tag) => {
      if (tag.id === tagId) {
        return { ...tag, selected: !tag.selected };
      } else {
        return tag;
      }
    });
    setAllTags(updatedTags);
    if (updatedTags.find(tag => tag.id === tagId).selected) {
      setTempEventTags([...tempEventTags, tagId]);
    } else {
      setTempEventTags(tempEventTags.filter(tagIdTemp => tagIdTemp !== tagId));
    }
  };

  const saveTags = () => {
    setEventTags(tempEventTags);
    toggleEditTagsPageOpen();
  };

  const validEventTags = eventTags.filter(tagId => allTags.some(tag => tag.id === tagId));
  const renderTags = validEventTags.map(tagId => allTags.find(tag => tag.id === tagId));

  const [isEditInterestsPageOpen, setIsEditInterestsPageOpen] = useState(false);
  const [userInterests, setUserInterests] = useState([]);
  const [tempUserInterests, setTempUserInterests] = useState(userInterests);

  const [allInterests, setAllInterests] = useState(
      [...interestsData].map((interest) => {
          const isSelected = userInterests.includes(interest.id);
          return { ...interest, selected: isSelected };
      }).sort((a, b) => b.selected - a.selected)
  );

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

  const saveInterests = () => {
      setUserInterests(tempUserInterests);
      toggleEditInterestsPageOpen();
      setHasChange(true);
  };

  const validUserInterests = userInterests.filter(interestId => allInterests.some(interest => interest.id === interestId));
  const renderInterests = validUserInterests.map(interestId => allInterests.find(interest => interest.id === interestId));


  return (
    <div className='flex flex-col w-screen h-screen'>
      <EditInfoPage isOpen={isEditFilterPageOpen} pageTitle={'Filtros'} togglePage={toggleEditFilterPageOpen}>
        <div className='w-full flex flex-col gap-2'>
          <p>Filtre a resenha ideal para você!</p>
          <div className='flex flex-col gap-4 bg-purpleT1 bg-opacity-30 px-4 py-4 rounded-2xl'>
            Local:
            <input
              placeholder='Região'
              className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
              value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <div className='flex flex-col'>
              Num raio de:
              <div className='flex flex-row'>
                <input
                  value={inputRadiusValue}
                  onChange={(e) => setInputRadiusValue(e.target.value)}
                  placeholder='20'
                  type="tel"
                  className='w-1/5 bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                ></input>
                km
              </div>
            </div>
            <button className='px-4 text-purpleT3 rounded-full mt-2 py-1 bg-whiteT1' onClick={toggleModal}>
              Ver no mapa
            </button>
            <Modal show={isModalOpen} close={toggleModal}>
              <Map onLocationSelect={handleLocationSelect} />
            </Modal>
          </div>
          <div className='flex flex-col gap-4 bg-purpleT1 bg-opacity-30 px-4 py-4 rounded-2xl'>
            Tags:
            <div className='flex flex-wrap gap-2 overflow-auto' style={{ maxHeight: '200px' }}>
              {[...allTags].sort((a, b) => b.selected - a.selected).map((tag) => (
                <Tag
                  key={tag.id}
                  tagname={tag.name}
                  type={tag.type}
                  colorName={tag.colorName}
                  highlightColor={tag.highlightColor}
                  isEditable={true}
                  onClick={() => handleTagClick(tag.id)}
                  selected={tag.selected}
                  ringColor={tag.ringColor}
                  ringThickness={tag.ringThickness}
                  weight={tag.weight}
                />
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-4 bg-purpleT1 bg-opacity-30 px-4 py-4 rounded-2xl'>
            Vibe:
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
        </div>
      </EditInfoPage>
      <PageHeader pageTitle={'Explorar'} />
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <section className="flex flex-col flex-start items-center w-full max-w-md p-4">
          <div className='h3 w-full flex'>
            <div className='w-full flex flex-col'>
              <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                <div className="flex flex-col mb-4 gap-4 w-full">
                  <SearchInput placeholder={"Busque por nome ou tag"} />
                  <FeedDualButton leftButtonText={"Todas"} rightButtonText={"Em alta"}
                    onRightClick={handleDisplayToggle} onLeftClick={handleDisplayToggle}
                    onFilterClick={toggleEditFilterPageOpen} />
                  <div className='bg-scroll flex flex-col gap-2 h-[65vh] w-full overflow-y-auto'>
                    <PartyBanner imageUrl={exampleImagesEvent} eventName={exampleNameEvent} eventImage={exampleImageEvent} eventDate={exampleDateEvent} eventHour={exampleHourEvent} eventGuests={exampleGuestsEvent} eventMax={exampleLimitEvent} eventPrice={examplePriceEvent} eventSaved={exampleSavedEvent} eventTags={exampleTagsEvent} />
                    <PartyBanner imageUrl={exampleImagesEvent} eventName={exampleNameEvent} eventImage={exampleImageEvent} eventDate={exampleDateEvent} eventHour={exampleHourEvent} eventGuests={exampleGuestsEvent} eventMax={exampleLimitEvent} eventPrice={examplePriceEvent} eventSaved={exampleSavedEvent} eventTags={exampleTagsEvent} />
                    <PartyBanner imageUrl={exampleImagesEvent} eventName={exampleNameEvent} eventImage={exampleImageEvent} eventDate={exampleDateEvent} eventHour={exampleHourEvent} eventGuests={exampleGuestsEvent} eventMax={exampleLimitEvent} eventPrice={examplePriceEvent} eventSaved={exampleSavedEvent} eventTags={exampleTagsEvent} />
                    <PartyBanner imageUrl={exampleImagesEvent} eventName={exampleNameEvent} eventImage={exampleImageEvent} eventDate={exampleDateEvent} eventHour={exampleHourEvent} eventGuests={exampleGuestsEvent} eventMax={exampleLimitEvent} eventPrice={examplePriceEvent} eventSaved={exampleSavedEvent} eventTags={exampleTagsEvent} />
                    <PartyBanner imageUrl={exampleImagesEvent} eventName={exampleNameEvent} eventImage={exampleImageEvent} eventDate={exampleDateEvent} eventHour={exampleHourEvent} eventGuests={exampleGuestsEvent} eventMax={exampleLimitEvent} eventPrice={examplePriceEvent} eventSaved={exampleSavedEvent} eventTags={exampleTagsEvent} />
                    <button className='w-full h-fit px-4 py-5 mt-2 bg-purpleT2 text-whiteT1 rounded-xl'>Carregar mais...</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}