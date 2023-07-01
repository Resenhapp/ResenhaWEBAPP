'use client'
import Button from '@/src/components/Button';
import Back from '@/src/components/Back';
import PartyPortrait from '@/src/components/PartyPortrait';
import DefaulEventImage from '@/assets/images/default.jpg'
import PageHeader from '@/src/components/PageHeader';
export const metadata = {
    title: 'Resenha.app • Todas as Resenhas',
    description: 'Venha fazer suas resenhas!',
}

export default function MyParties() {
    return (
        <div className='flex flex-col w-screen h-screen'>
               <PageHeader pageTitle={'Suas resenhas'} isBack={true} checker={()=>{null}}/>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-start items-center w-full max-w-md p-4">
                    <div className=' h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                                <h2>Aqui estão todas as suas resenhas</h2>
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <div class="bg-scroll flex flex-col gap-2 h-[55vh] w-full overflow-y-auto">
                                    <PartyPortrait partyDate={'25/07'} partyGuests={'22'} 
                                    partyHour={'20:00'} partyImage={DefaulEventImage} partyMaxGuests={'123'} 
                                    partyName={'Resenha no Terraço'} />
                                    <PartyPortrait partyDate={'25/07'} partyGuests={'22'} 
                                    partyHour={'20:00'} partyImage={DefaulEventImage} partyMaxGuests={'123'} 
                                    partyName={'Resenha no Terraço'} canBeDeleted={false} />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex flex-col mb-4 w-[90%] mt-8 items-center justify-center content-center">
                <Button label={'Criar resenha'} icon={'plus'} action={() => { }} iconSide='right' height={1} width={1} textAlign='center' />
                </div>
            </div>
        </div>
    );
}
