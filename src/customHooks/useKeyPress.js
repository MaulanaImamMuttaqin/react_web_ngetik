import React, { useEffect, useState } from 'react'

const useKeyPress = (targetKey, event, reference) => {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({ key }) => {
        if (event === 'mouse') {
            setKeyPressed(true)
            console.log(key)
        }
        else if (targetKey.includes(key)) {
            setKeyPressed(true)
        };
    };

    const upHandler = ({ key }) => {
        if (event === 'mouse') setKeyPressed(false)
        else if (targetKey.includes(key)) setKeyPressed(false);
    };


    useEffect(() => {

        reference.addEventListener(`${event}down`, downHandler);
        reference.addEventListener(`${event}up`, upHandler);

        return () => {
            reference.removeEventListener(`${event}down`, downHandler);
            reference.removeEventListener(`${event}up`, upHandler);
        };
    }, []);

    return keyPressed;

};

export default useKeyPress
