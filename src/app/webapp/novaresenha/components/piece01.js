import React from 'react';
import InputField from '@/src/components/InputField';
import AddressField from '@/src/components/AddressField';
import Toggle from '@/src/components/Toggle';

const Piece01 = ({}) => {
    return (
        <div className='w-full flex flex-col h-fit gap-3'>
            <InputField Icon={'thunder'} showIcon={true} placeholder={'Nome da resenha'} />
            <AddressField initialAddress={''} onAddressSelect={''} placeholder={'Endereço'} />
            <Toggle labelText={'Resenha para +18?'} questionAction={''} showLabel={true} showQuestion={false} startToggled={true} textColor={'white'} />
        </div>
    )
}

export default Piece01;