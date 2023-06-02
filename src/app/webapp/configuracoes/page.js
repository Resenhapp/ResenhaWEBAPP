import OutlinedButton from '@/src/components/OutlinedButton';
import MyEventsBanner from '@/src/components/MyEventsBanner';
import Button from '@/src/components/Button';
import NotificationsButton from '@/src/components/NotificationsButton';
import MenuButton from '@/src/components/MenuButton';
import SearchInput from '@/src/components/SearchInput';

export const metadata = {
    title: 'Resenha.app • Configurações',
    description: 'Venha fazer suas resenhas!',
}

export default function Settings() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <div className="flex flex-row justify-start items-center w-full max-w-md mb-16 p-4">
                <MenuButton />
                <h1 className='text-2xl ml-6 text-whiteT1 font-bold'>Configurações</h1>
            </div>
            <section className="flex flex-col flex-start items-center w-full max-w-md p-4">
                <SearchInput placeholder={'Pesquisar'} />
                <div className='h-fit w-full gap-2 mt-16 flex flex-col'>
                    <Button label={'Conta'} icon={'arrow'} />
                    <Button label={'Segurança'} icon={'arrow'} />
                    <Button label={'Privacidade'} icon={'arrow'} />
                    <Button label={'Pagamentos'} icon={'arrow'} />
                    <Button label={'Notificações'} icon={'arrow'} />
                </div>
            </section>
        </div>
    );
}
