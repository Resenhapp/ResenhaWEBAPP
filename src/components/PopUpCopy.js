export default function PopUpCopy({ message }) {
    return (
        <div className="copy-popup fixed left-1/2 bottom-[5%] transform -translate-x-1/2 h-fit bg-purpleT2 ring-1 ring-purpleT4 shadow-md rounded-full z-[999] px-20 py-4 animate-slide-up">
            <p className="text-sm font-bold text-white">{message}</p>
        </div>
    );
}