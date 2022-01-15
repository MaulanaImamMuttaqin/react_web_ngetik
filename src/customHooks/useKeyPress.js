import React, { useEffect, useState } from 'react'

const useKeyPress = (targetKey, event) => {
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

        window.addEventListener(`${event}down`, downHandler);
        window.addEventListener(`${event}up`, upHandler);

        return () => {
            window.removeEventListener(`${event}down`, downHandler);
            window.removeEventListener(`${event}up`, upHandler);
        };
    }, []);

    return keyPressed;

};

export default useKeyPress
