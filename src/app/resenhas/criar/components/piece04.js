import React, { useState, useEffect } from 'react';
import Vector from '@/src/components/Vector';
import Tag from '@/src/components/Tag';
import { tagsData } from '@/src/components/tagsData';
import EditInfoPage from '@/src/components/EditInfoPage';
import Modal from '@/src/components/Modal';

const Piece04 = ({descriptionContent, selectedTags}) => {
    const [isEditTagsPageOpen, setIsEditTagsPageOpen] = useState(false);

    const toggleEditTagsPageOpen = () => {
        setIsEditTagsPageOpen(!isEditTagsPageOpen);
    };

    const [eventDescription, setEventDescription] = useState('');
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
        } 
        
        else {
            setTempEventTags(tempEventTags.filter(tagIdTemp => tagIdTemp !== tagId));
        }
    };

    const saveTags = () => {
        setEventTags(tempEventTags);
        toggleEditTagsPageOpen();
        selectedTags(tempEventTags);
    };

    const validEventTags = eventTags.filter(tagId => allTags.some(tag => tag.id === tagId));
    const renderTags = validEventTags.map(tagId => allTags.find(tag => tag.id === tagId));

    const handleEventDescriptionChange = (description) => {
        const value = description.target.value;
        setEventDescription(value)
        descriptionContent(value);
    }

    return (
        <div className="w-full flex flex-col h-fit gap-3">
            <div className=''>
                <p className='text-md font-bold mb-2'>Descrição</p>
                <div className="h-fit ring-1 p-3 ring-inset ring-purpleT4 bg-purpleT1 rounded-2xl">
                    <textarea
                        className={`w-full h-32 resize-none bg-transparent sm:text-sm outline-none text-whiteT1 placeholder-purpleT5`}
                        placeholder={'Exemplo: Vai ter beerpong e bebida liberada pra GERAL, só não dá pra colar depois da meia noite.'}
                        value={eventDescription}
                        onChange={handleEventDescriptionChange}
                    />
                </div>
            </div>
            <div>
                <p className='text-md font-bold mb-2'>Tags</p>
                <div onClick={(e) => { e.stopPropagation(); toggleEditTagsPageOpen(); }} className="flex flex-col w-full h-fit gap-2 rounded-2xl" >
                    <div className="flex flex-wrap gap-2">
                        {renderTags.length > 0 ?
                            renderTags.map((tag) => (
                                <Tag
                                    key={tag.id}
                                    tagname={tag.name}
                                    type={tag.type}
                                    colorName={tag.colorName}
                                    highlightColor={tag.highlightColor}
                                    isEditable={false}
                                    ringThickness={tag.ringThickness}
                                    ringColor={tag.ringColor}
                                    weight={tag.weight}
                                />
                            ))
                            :
                            <p className='py-1 px-2 bg-purpleT1 rounded-full ring-1 flex flex-row items-center gap-2 ring-inset ring-purpleT3'>Toque aqui para escolher tags! <Vector vectorname={'plus02'} /></p>
                        }
                    </div>
                </div>
            </div>
            <EditInfoPage isOpen={isEditTagsPageOpen} pageTitle={'Tags da resenha'} saveAction={saveTags} togglePage={toggleEditTagsPageOpen}>
                <div className='w-full'>
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
                <div>
                    <p className='text-sm'>
                        As tags da resenha são palavras-chave que você pode incluir para ajudar a descrever e categorizar o seu evento. Elas serão visíveis aos convidados quando acessarem o convite e podem ajudar a dar uma ideia rápida do que esperar da resenha. Escolha tags que representem bem o tema, o estilo ou a vibe da sua resenha.
                    </p>
                </div>
            </EditInfoPage>
        </div>
    );
};

export default Piece04;
