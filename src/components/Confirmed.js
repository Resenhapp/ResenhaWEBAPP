import React, { useState } from 'react';

const Confirmed = ({ initialConfirmation = false}) => {
    const [confirmed, setConfirmed] = useState(initialConfirmation);

    const toggleConfirmation = () => setConfirmed(!confirmed);

    const textColor = confirmed ? 'text-greenT3' : 'text-redT3';

    return (
        <div>
            <p className={`text-right w-full ${textColor}`}>{confirmed ? 'Confirmado' : 'Não confirmado'}</p>
        </div>
    );
}

export default Confirmed;
