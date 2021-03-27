import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Tags from './components/Tags'
import Jobs from './components/Jobs'
import Candidates from './components/Candidates'
import Emails from './components/Emails'

function App() {
    const [loaded, setLoaded] = useState(false)
    //
    // const state = useSelector(state => state.app)
    // useEffect(async () => {
    //     if (loaded) {
    //         try {
    //             const res = await fetch('https://api.jsonbin.io/v3/b/605ec31a838e525f31195330',
    //             {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': "application/json",
    //                     'X-Master-Key': '$2b$10$dxptl2u8gH5s4y/KRE50HuHVeMtmeF0RKYwdkXCn6x1bGVKehmUGy',
    //                 },
    //                 body: JSON.stringify(state)
    //             }).then(res => res.json())
    //             console.log(res)
    //         }
    //         catch (err) {
    //             console.log(err)
    //         }
    //     }
    // }, [state])

    useEffect(async () => {
        // try {
        //     const res = await fetch('https://api.jsonbin.io/v3/b/605ec31a838e525f31195330', {
        //         headers: {
        //             'X-Master-Key': '$2b$10$dxptl2u8gH5s4y/KRE50HuHVeMtmeF0RKYwdkXCn6x1bGVKehmUGy',
        //         }
        //     }).then(res => res.json())
        //     console.log(res.record)
        //     localStorage.setItem('state', JSON.stringify(res.record))
        // }
        // catch (err) {
        //     console.log(err)
        // }

        setLoaded(true)
    }, [])

    if (loaded) {
        return (
            <div className="App">
                <Tags />
                <Jobs />
                <Candidates />
                <Emails />
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }

}

export default App;
