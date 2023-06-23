import React, { useState } from 'react';
import Vector from '@/src/components/Vector';
import Tag from '@/src/components/Tag';
import Modal from '@/src/components/Modal';

const Piece04 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allTags, setAllTags] = useState(['Nerd', 'Funk', 'Baile', 'Pop', 'Baderninha', 'Festa', 'Evento', 'Música ao vivo', 'DJ', 'Pista de Dança', 'Luzes', 'Balada', 'AfterParty', 'Universitário', 'Drinks', 'VIP', 'Lounge', 'Entrada', 'Banda', 'NightLife', 'Show']);
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full flex flex-col h-fit gap-3">
            <div className="h-fit ring-2 p-3 ring-inset ring-purpleT4 bg-purpleT1 rounded-2xl">
                <textarea
                    className={`w-full h-32 resize-none bg-transparent sm:text-sm outline-none text-whiteT1 placeholder-purpleT5`}
                    placeholder={'Exemplo: Vai ter beerpong e bebida liberada pra todo mundo, só não vai mijar no chão!'}
                />
            </div>
            <div className='flex flex-wrap gap-2'>
                
                {selectedTags.map(tag => <Tag key={tag} tagname={tag} />)}
                <button 
                    className="flex flex-row gap-1 items-center bg-purpleT2 w-fit px-3 py-2 rounded-full ring-2 ring-inset ring-purpleT4"
                    onClick={() => setIsModalOpen(true)}
                >
                    <h1>Nova tag</h1>
                    <Vector vectorname={'plus02'} />
                </button>
            </div>
            {isModalOpen && 
                <Modal show={isModalOpen} close={closeModal}>
                <h1 className='text-xl mb-2 font-bold'>Escolha Tags!</h1>
                <p>As tags servem para as pessoas entenderem melhor a vibe da sua resenha</p>
                <div className='flex flex-wrap gap-2 overflow-auto' style={{ maxHeight: '200px' }}>
                    {allTags.map(tag => (
                        <button 
                            className={`bg-purpleT2 p-2 rounded-lg ${selectedTags.includes(tag) ? 'ring-2 ring-inset ring-purpleT4' : ''}`}
                            onClick={() => toggleTag(tag)}
                            key={tag}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <div className='w-full flex justify-between flex-row-reverse mt-4 gap-3'>
                    <button onClick={closeModal} className='bg-purpleT3 ring-2 ring-purpleT4 rounded-full ring-inset py-2 px-4'>Salvar</button>
                    <button onClick={() => {setSelectedTags([]); closeModal();}} className='bg-purpleT3 ring-2 ring-purpleT4 rounded-full ring-inset py-2 px-4'>Cancelar</button>
                </div>
            </Modal>
            }
        </div>
    );
};

export default Piece04;
