import OutlinedButton from '@/src/components/OutlinedButton';
import MyEventsBanner from '@/src/components/MyEventsBanner';
import Button from '@/src/components/Button';
import NotificationsButton from '@/src/components/NotificationsButton';
import MenuButton from '@/src/components/MenuButton';
export const metadata = {
    title: 'Resenha.app • Resenhas',
    description: 'Venha fazer suas resenhas!',
}

export default function Home() {
    return (
        <div className='flex flex-col w-screen h-screen'>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <MenuButton />
                <NotificationsButton dotVisible={false} />
            </div>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-start items-center w-full max-w-md p-4">
                    <div className=' h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                                <h2>Suas resenhas</h2>
                                <OutlinedButton icon={'arrow'} label={'ver todas'} />
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <MyEventsBanner eventName={'Festa do João'} eventDate={'25 de maio'} eventHour={'21'} eventGuests={'10'} eventMax={'100'} />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex flex-col mb-4 w-[80%] mt-8 items-center justify-center content-center">
                    <Button label={'Criar resenha'} icon={'plus'} />
                </div>
            </div>
        </div>

    );
}
