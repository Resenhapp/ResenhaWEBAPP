'use client'
import MoneyDisplay from '@/src/components/MoneyDisplay';
import Button from '@/src/components/Button';
import PageHeader from '@/src/components/PageHeader';

export const metadata = {
    title: 'Resenha.app • Carteira',
    description: 'Venha fazer suas resenhas!',
}

export default function Wallet() {
    const handleNavigation = () => {
        window.location.href = `/webapp/carteira/saque`;
    };

    var availableCash = '1000,00';

    return (
        <div className='flex flex-col w-screen h-screen '>
            <PageHeader pageTitle={'Carteira'} />
            <div className="flex flex-col  justify-start h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex flex-col gap-16 mt-16'>
                        <div className='w-full flex flex-col items-center gap-4'>
                            <MoneyDisplay amount={100} cashType="available" />
                            <MoneyDisplay amount={100} cashType="secured" />
                            <MoneyDisplay amount={100} cashType="processing" />
                            <MoneyDisplay amount={100} cashType="requested" />
                        </div>
                        <div>
                        <Button label={'Solicitar saque'} icon={'arrow'} action={handleNavigation} iconSide='right' height={1} width={1} textAlign='left' />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}