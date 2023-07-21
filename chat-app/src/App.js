import React, { useState } from 'react';
import axios from 'axios';
import styles from './App.module.css';


function App() {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [serverResponses, setServerResponses] = useState({
        response_ERC1: "",
        response_ERC2: "",
        response_ERC3: "",
        plan: ""
    });

    const sendMessage = () => {
        setIsLoading(true);
        axios.post('http://localhost:5000/chat', {
            msg: message
        })
        .then((response) => {
            setServerResponses({
                response_ERC1: response.data.response_ERC1,
                response_ERC2: response.data.response_ERC2,
                response_ERC3: response.data.response_ERC3,
                plan: response.data.plan,
                dopamine_level_user: response.data.dopamine_level_user,
                endorphin_level_user: response.data.endorphin_level_user,
                oxytocin_level_user: response.data.oxytocin_level_user,
                adrenaline_level_user: response.data.adrenaline_level_user,
                ntv1: response.data.ntv1,
                ntv2: response.data.ntv2,
                ntv3: response.data.ntv3,
                ntv4: response.data.ntv4,
                num: response.data.num, 
                status: response.data.status
            });
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

        setMessage("");
    }

    return (<div style={{width : '98vw', display : 'flex', flexDirection : 'row', justifyContent : 'space-around'}}>
                <div className={styles.App} style={{width : '60vw'}}>
                    <h1 className={styles.header}>The Rise of Juan</h1>
                    <div>
                    <input className={styles.input} type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
                    <button className={styles.button} onClick={sendMessage} disabled={isLoading}>{isLoading ? 'Working...' : 'Chat'}</button>
                    </div> 
                    <div style={{marginTop : '40px'}}>ERC1 RESPONSE</div>
                    <div className={styles.response} style={{border: '1px solid white'}}>{serverResponses.response_ERC1}</div>
                    <div style={{marginTop : '40px'}}>ERC2 RESPONSE</div>
                    <div className={styles.response} style={{border: '1px solid white'}}>{serverResponses.response_ERC2}</div>
                    <div style={{marginTop : '40px'}}>ERC3 RESPONSE (beta)</div>
                    <div className={styles.response} style={{border: '1px solid cyan'}}>{serverResponses.response_ERC3}</div>
                    <div className={styles.response} style={{border: '1px solid cyan'}}>Plan: {serverResponses.plan}</div>
                    
                </div>
                <div style={{display : 'flex', flexDirection : 'column'}}>
                    <div className={styles.App} style={{width : '20vw', height : '370px', border: '1px solid cyan'}}>
                        <div style={{margin : '20px'}}>USER NTVs</div>
                        <div>Dopamine:  {serverResponses.dopamine_level_user}</div>
                        <div>Endorphin:  {serverResponses.endorphin_level_user_level_user}</div>
                        <div>Oxytocin:  {serverResponses.oxytocin_level_user}</div>
                        <div>Adrenaline:  {serverResponses.adrenaline_level_user_level_user}</div>
                        <div>_____________________</div>
                        <div style={{margin : '20px'}}>ECR3 NTVs</div>
                        <div>Dopamine:  {serverResponses.ntv1}</div>
                        <div>Endorphin:  {serverResponses.ntv2}</div>
                        <div>Oxytocin:  {serverResponses.ntv3}</div>
                        <div>Adrenaline:  {serverResponses.ntv4}</div>
                        <div>_____________________</div>
                        <div style={{marginTop : '20px'}}>#Memory Objects in Memory Stream:  {serverResponses.num}</div>

                    </div>
                    <div className={styles.App} style={{width : '20vw', height : '200px', border: '1px solid cyan'}}>
                        <p style={{margin : '20px'}}>COMMANDS: /start: to start synthesizing memory object. /end: to finish synthesizing. /set _neurotransmitter_ _value_ (eg. /set oxytocin high set adrenaline low) /reset future</p>
                        <p style={{margin : '20px', color : 'cyan'}}>{serverResponses.status}</p>
                    </div>
                </div>
        </div>
    );
}

export default App;
