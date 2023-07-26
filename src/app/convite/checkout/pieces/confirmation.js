import Button from '@/src/components/Button';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Confirmation({
  PartyImage,
  PartyName,
  PartyOwner,
  PartyDateDay,
  PartyDay,
  PartyMonth,
  PartyHour,
  PartyAddress,
  InviteCode,
  buttonsVisible,
  InviteQrCodeUrl,
  save,
}) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(buttonsVisible);
  }, [buttonsVisible]);

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col items-center w-full max-w-md">
        <div className="flex flex-col items-center justify-center h-fit px-4">
          <section className="flex flex-col items-center w-full max-w-md">
            <div className="flex flex-col w-full">
              <div className="flex flex-col rounded-2xl ring-1 ring-whiteT2 bg-white p-4">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <div className="flex items-center rounded-md ring-1 w-fit h-fit ring-whiteT2 justify-center">
                      <Image
                        src={PartyImage}
                        width={50}
                        height={50}
                        alt="QR Code"
                        className="z-1 rounded-md object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h1 className="font-bold text-xl h-fit text-blackT1">{PartyName}</h1>
                      <h3 className="font-bold text-sm h-fit text-blackT1">Por: {PartyOwner}</h3>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 mt-4">
                    <div className="flex flex-col">
                      <div>
                        <h1 className="font-bold text-sm text-grayT0">Data:</h1>
                        <h3 className="font-bold text-blackT1">{PartyDateDay} de {PartyMonth}</h3>
                      </div>
                      <div>
                        <h1 className="font-bold text-sm text-grayT0">Horário:</h1>
                        <h3 className="font-bold text-blackT1">às {PartyHour}</h3>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div>
                        <h1 className="font-bold text-sm text-grayT0">Endereço:</h1>
                        <h3 className="font-bold text-blackT1">{PartyAddress}</h3>
                      </div>
                      <div>
                        <h1 className="font-bold text-sm text-grayT0">Código:</h1>
                        <h3 className="font-bold text-blackT1">{InviteCode}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mt-6 justify-between h-[0px] rounded-full outline-dotted bg-whiteT2" />
                <div className="flex items-center mt-4 justify-center">
                  <img
                    src={InviteQrCodeUrl}
                    width={240}
                    height={240}
                    alt="QR Code"
                    className="z-1 object-cover"
                  />
                </div>
              </div>
            </div>
            {visible == true ? (
              <div className="flex flex-row-reverse gap-2 items-center mb-4 mt-4 w-full" id="idOfElementToHide">
                <Button
                  label={'Salvar'}
                  icon={'arrowDown'}
                  action={save}
                  iconSide="right"
                  height={1}
                  width={1}
                  textAlign="center"
                />
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </div>
  );
}
