import React from 'react';

const EditInfoPage = ({ isOpen, togglePage, pageTitle, children, saveAction, handleAddressSelect }) => {
  return (
    <div className={`fixed bottom-0 left-0 w-full h-full bg-purpleT0 z-10 transition-transform duration-300 ease-in-out overflow-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex flex-row justify-between items-center w-full mt-0 px-6 pt-20">
        <button className='text-whiteT1' onClick={togglePage}>Cancelar</button>
        <h1 className='font-bold'>{pageTitle}</h1>
        <button onClick={saveAction} className='text-greenT3'>Salvar</button>
      </div>
      <hr className='border-purpleT3 mt-4' />
      <section className="flex flex-col flex- content-center items-center w-full max-w- justify-center p-8 gap-4">
        {React.Children.map(children, (child) => {
          if (child && child.type && child.type.name === 'PlacesAutocomplete') {
            return React.cloneElement(child, { setSelected: handleAddressSelect });
          }
          return child;
        })}
      </section>
    </div>
  );
};

export default EditInfoPage;
