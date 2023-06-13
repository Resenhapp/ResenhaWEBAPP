'use client'
import Button from '@/src/components/Button';

export const metadata = {
    title: 'Resenha.app • Menu',
    description: 'Venha fazer suas resenhas!',
}

export default function Menu() {
    return (
        <div className='flex flex-col w-screen h-screen'>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <h1 className='text-2xl px-4 text-purpleT5 font-light'>Menu</h1>
            </div>
            <section className="flex flex-col flex-start items-center w-full max-w-md p-4 gap-4">
            </section>
            <div className="flex flex-col items-center justify-center px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-2 mt-16 flex flex-col'>
                                <Button label={'Perfil'} icon={'user'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Carteira'} icon={'wallet'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Resenhas'} icon={'thunder'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Configurações'} icon={'gear'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Recepcionistas'} icon={'trusted'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Ajuda'} icon={'question'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                            </div>
                            <div className='mt-10'>
                                <Button label={'Nova Resenha'} icon={'plus'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
