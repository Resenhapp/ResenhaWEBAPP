
import OutlinedButton from '@/src/components/OutlinedButton';
import MyEventsBanner from '@/src/components/MyEventsBanner';
import Button from '@/src/components/Button';
import NotificationsButton from '@/src/components/NotificationsButton';
import MenuButton from '@/src/components/MenuButton';
import Back from '@/src/components/Back';
import PartyPortrait from '@/src/components/PartyPortrait';
import DefaulEventImage from '@/assets/images/default.jpg'
export const metadata = {
    title: 'Resenha.app • Todas as Resenhas',
    description: 'Venha fazer suas resenhas!',
}

export default function MyParties() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <div className="flex flex-row justify-between items-center w-full max-w-md mb-4 p-4">
                <Back />
                <h1 className='text-2xl font-bold'>Suas resenhas</h1>
            </div>
            <section className="flex flex-start items-center w-full max-w-md p-4">
                <div className=' h3 w-full flex'>
                    <div className='w-full flex flex-col'>
                        <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                            <h2>Aqui estão todas as suas resenhas</h2>
                        </div>
                        <div className='w-full h-full flex flex-col'>
                            <div class="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                                <PartyPortrait partyDate={'2312'} partyGuests={'22'} partyHour={'21312'} partyImage={DefaulEventImage} partyMaxGuests={'123'} partyName={'daviloide'} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-col mb-4 w-[80%] mt-8 items-center justify-center content-center">
                <Button label={'Criar resenha'} icon={'plus'}/>
            </div>
        </div>
    );
}
