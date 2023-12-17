'use client'

import PageHeader from '@/src/components/PageHeader';
import Loading from "@/src/components/Loading";
import EditInfoPage from '@/src/components/EditInfoPage';
import SearchInput from '@/src/components/SearchInput';
import FeedDualButton from '@/src/components/FeedDualButton';
import PartyBanner from '@/src/components/PartyBanner';
import Map from '@/src/components/Map';
import Modal from '@/src/components/Modal';
import Tag from '@/src/components/Tag';
import Cookies from 'js-cookie';

import React, { useState, useEffect } from 'react';

import { tagsData } from "@/src/components/tagsData"
import { interestsData } from '@/src/components/interestsData';

export default function Feed() {
  var token = Cookies.get('token');

  const axios = require('axios');
  const qs = require('qs');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isDisplayingEvents, setIsDisplayingEvents] = useState(true);
  const [isEditFilterPageOpen, setIsEditFilterPageOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditInterestsPageOpen, setIsEditInterestsPageOpen] = useState(false);
  const [userInterests, setUserInterests] = useState([]);

  const [tempUserInterests, setTempUserInterests] = useState(userInterests);
  const [inputRadiusValue, setInputRadiusValue] = useState(15);

  const [eventTags, setEventTags] = useState([]);
  const [tempEventTags, setTempEventTags] = useState(eventTags);

  const [userPosition, setUserPosition] = useState([-15.7801, -47.9292]);

  const reverseGeocode = async (lat, lon) => {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const addressDetails = res.data.address;
  
      const road = addressDetails.road || '';
      const suburb = addressDetails.suburb || addressDetails.neighbourhood || '';
      const city = addressDetails.city || '';
      const state = addressDetails.state || '';
  
      return `${road}, ${suburb}, ${city}`;
  }

  const handleSaveButton = async (party) => {
    const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
      request: 'switchSaveEvent',
      party: party.code,
      token: token,
    });
  };

  const setImpressionCount = async (party) => {
    const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
      request: 'tryToClickOnEvent',
      party: party.code,
      token: token
    });
  };

  const makeRequest = async (url, data) => {
      const response = await axios.post(url, qs.stringify(data));
      return response.data;
  };

  const fetchData = async () => {
    setLoading(true);
  
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    
        var newPosition = [position.coords.latitude, position.coords.longitude];
    
        const address = await reverseGeocode(newPosition[0], newPosition[1]);
    
        setInputValue(address);
    
        var filterParameters = {
          "coordinates": newPosition,
          "radius": inputRadiusValue
        };
    
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
          request: 'getFeedData',
          token: token,
          filterParameters: filterParameters
        });
  
        setData(response);
      } 
      
      catch (error) {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
          request: 'getFeedData',
          token: token
        });
    
        setData(response);
      }
    }

    setLoading(false);
  };

  const filterFeedData = async () => {
    toggleEditFilterPageOpen();

    setLoading(true);

    var filterParameters = {
      "address": inputValue,
      "radius": inputRadiusValue,
      "tags": tempEventTags,
      "vibe": tempUserInterests,
    };

    const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
      request: 'getFeedData',
      token: token,
      filterParameters: filterParameters
    });

    setData(response);

    setLoading(false);
  };

  const toggleEditFilterPageOpen = () => {
    setIsEditFilterPageOpen(!isEditFilterPageOpen);
  };

  const searchFeedData = async searchTerm => {
    setLoading(true);

    const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
      request: 'getFeedData',
      token: token,
      searchTerm: searchTerm
    });

    setData(response);

    setLoading(false);
  };

  const fetchHypedParties = async searchTerm => {
    setLoading(true);

    const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
      request: 'getFeedData',
      token: token,
      hype: true
    });

    setData(response);

    setLoading(false);
  };

  const handleAllParties = () => {
    fetchData();
  };

  const handleHypedParties = () => {
    fetchHypedParties();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLocationSelect = (location) => {
    setInputValue(location);
    toggleModal();
  };

  const handleLocationStart = (location) => {
    setInputValue(location);
  };

  const saveTags = () => {
    setEventTags(tempEventTags);
    toggleEditTagsPageOpen();
  };

  const [allTags, setAllTags] = useState(
    [...tagsData].map((tag) => {
      const isSelected = eventTags.includes(tag.id);
      return { ...tag, selected: isSelected };
    }).sort((a, b) => b.selected - a.selected)
  );

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

  const [allInterests, setAllInterests] = useState(
      [...interestsData].map((interest) => {
          const isSelected = userInterests.includes(interest.id);
          return { ...interest, selected: isSelected };
      }).sort((a, b) => b.selected - a.selected)
  );

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validUserInterests = userInterests.filter(interestId => allInterests.some(interest => interest.id === interestId));
  const renderInterests = validUserInterests.map(interestId => allInterests.find(interest => interest.id === interestId));

  const validEventTags = eventTags.filter(tagId => allTags.some(tag => tag.id === tagId));
  const renderTags = validEventTags.map(tagId => allTags.find(tag => tag.id === tagId));

  if (!data) {
    return (
        <div className="h-screen w-full flex justify-center content-center items-center">
            <Loading/>
        </div>
    );
  }

  return (
    <div className='flex flex-col w-screen h-screen'>
      <EditInfoPage isOpen={isEditFilterPageOpen} pageTitle={'Filtros'} togglePage={toggleEditFilterPageOpen} saveAction={filterFeedData}>
        <div className='w-full flex flex-col max-w-md gap-2'>
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
              <Map onLocationSelect={handleLocationSelect} onLocationStart={handleLocationStart} partyData={data} />
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
      <PageHeader pageTitle={'Feed'} />
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <section className="flex flex-col flex-start items-center w-full max-w-md p-4">
          <div className='h3 w-full flex'>
            <div className='w-full flex flex-col'>
              <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                <div className="flex flex-col mb-4 gap-4 w-full">
                  <SearchInput placeholder="Busque pelo nome" onDelayedChange={searchFeedData} />
                  <FeedDualButton leftButtonText={"Todas"} rightButtonText={"Em alta"}
                    onRightClick={handleHypedParties} onLeftClick={handleAllParties}
                    onFilterClick={toggleEditFilterPageOpen} />
                  <div className='bg-scroll flex flex-col gap-2 h-[65vh] w-full overflow-y-auto'>
                    {loading ? (
                        <div className="h-screen w-full flex justify-center content-center items-center">
                          <Loading/>
                        </div>
                    ) : data.length > 0 ? (
                      data.map((party) => {
                        var { hash, price, start, confirmed, capacity, title, code, headers, guests, saved } = party;

                        const guestsImages = [];

                        guests.forEach((guest) => {
                          guestsImages.push(`https://media.resenha.app/u/${guest.hash}.png`);
                        });

                        if (headers.length >= 2) {
                          headers = [headers[0], headers[1]];
                        }

                        return (
                          <div key={hash}>
                            <PartyBanner
                                imageUrl={guestsImages}
                                eventName={title}
                                eventImage={`https://media.resenha.app/r/${hash}.png`}
                                eventHour={start}
                                eventGuests={confirmed}
                                eventMax={capacity}
                                eventPrice={price}
                                eventSaved={saved}
                                eventTags={headers}
                                eventCode={code}
                                handleSaveButton={() => handleSaveButton(party)}
                                setImpressionCount={() => setImpressionCount(party)}
                              />
                          </div>
                        );
                      })
                    ) : (
                      <p>Nenhuma resenha encontrada com os seus termos 🤐</p>
                    )}
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