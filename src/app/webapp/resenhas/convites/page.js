'use client'
import Button from '@/src/components/Button';
import Back from '@/src/components/Back';
import PartyPortrait from '@/src/components/PartyPortrait';
import DefaulEventImage from '@/assets/images/default.jpg'
import PageHeader from '@/src/components/PageHeader';
import MyParty from '@/src/components/MyParty';
export const metadata = {
    title: 'Resenha.app • Meus convites',
    description: 'Venha fazer suas resenhas!',
}

export default function MyInvites() {
    return (
        <div className='flex flex-col w-screen h-screen'>
               <PageHeader pageTitle={'Seus convites'} isBack={true} checker={()=>{null}}/>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-start items-center w-full max-w-md p-4">
                    <div className=' h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                                <h2>Aqui estão todos os seus convites:</h2>
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <div class="bg-scroll flex flex-col gap-2 h-[55vh] w-full overflow-y-auto">
                                    <MyParty
                                    imageUrl={'https://resenha.app/publico/recursos/resenhas/QljskFiO.png'}
                                     partyCode={'3453'}
                                     partyGuests={'480'}
                                     partyDate={'17/12'}
                                     partyHour={'20:00'}
                                     partyName={'MATUÊ - Porto Alegre'} />
                                    <MyParty
                                    imageUrl={'https://resenha.app/publico/recursos/resenhas/QljskFiO.png'}
                                     partyCode={'3453'}
                                     partyGuests={'480'}
                                     partyDate={'17/12'}
                                     partyHour={'20:00'}
                                     partyName={'MATUÊ - Porto Alegre'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex flex-col mb-4 w-[90%] mt-8 items-center justify-center content-center">
                <Button label={'Descobrir resenhas'} icon={'arrow'} action={() => { }} iconSide='right' height={1} width={1} textAlign='center' />
                </div>
            </div>
        </div>
    );
}
