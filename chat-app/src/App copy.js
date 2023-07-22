import React, { useState } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import Bar from './Bar';
import BoxContainer from './BoxContainer';


function App() {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [serverResponses, setServerResponses] = useState({
        response_ERC1: "",
        response_ERC2: "",
        response_ERC3: "",
        plan: ""
    });
    const [status, setStatus] = useState("HEALTHY");
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
            setStatus(serverResponses.status)
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

        setMessage("");
    }




    return (<>
        <div style={{width : '98vw', display : 'flex', flexDirection : 'row', justifyContent : 'space-around'}}>
                <div className={styles.App} style={{width : '60vw', height : 'auto'}}>                   
                    <h1 className={styles.header}><b>Neura</b>Kink ~</h1>
                    <div>
                    {/* <input className={styles.input} type="text" value={message} onChange={(event) => setMessage(event.target.value)} /> */}
                    <input className={styles.input} type="text" value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => {if (event.key === 'Enter' || event.keyCode === 13) { sendMessage(); }}}/>
                    <button className={styles.button} onClick={sendMessage} disabled={isLoading}>{isLoading ? 'LOADING..' : 'Chat'}</button>
                    </div> 
                    <div style={{display : 'flex' , flexDirection : 'row'}}>
                        <div style={{width : '60vw'}}>
                            <div style={{marginTop : '20px'}}>ERC1 RESPONSE</div>
                            <div className={styles.response} style={{fontSize : '13px' , color : 'grey'}}>{serverResponses.response_ERC1}</div>
                            <div style={{marginTop : '20px'}}>ERC2 RESPONSE</div>
                            <div className={styles.response} style={{fontSize : '13px' , color : 'grey'}}>{serverResponses.response_ERC2}</div>
                            <div style={{marginTop : '20px'}}>ERC3 RESPONSE <sup>BETA</sup></div>
                            <div className={styles.response} style={{fontSize : '14px' , color : '#00bbbb'}}>{serverResponses.response_ERC3}</div>
                        </div>
                        <div>
                            <div style={{width : '20vw' , height : '240px' , backgroundColor : '#121212' , marginTop : '40px'}}> 
                        </div>
                    </div>
                    </div>
                    <div className="line" style={{minWidth : '50vw' , minHeight : '0.2px' , backgroundColor : 'white' , margin: '20px'}}></div>
                    <div className={styles.response} style={{backgroundColor : '#121212' , fontSize : '12px' , width : '90%'}}>Plan: {serverResponses.plan}</div>
                    
                </div>
                <div style={{display : 'flex', flexDirection : 'column'}}>
                    <div className={styles.App} style={{width : '20vw', height : '500px', border: '1px solid #00AAAA'}}>
                        <div style={{marginTop : '16px' , marginBottom : '10px'}}> USER NTVs</div>
                        <Bar name="Dopamine" load={serverResponses.dopamine_level_user}/>
                        <Bar name="Endorphin" load={serverResponses.endorphin_level_user}/>
                        <Bar name="Oxytocin" load={serverResponses.oxytocin_level_user}/>
                        <Bar name="Adrenaline" load={serverResponses.adrenaline_level_user}/>
                        <div className="line" style={{minWidth : '20vw' , minHeight : '0.2px' , backgroundColor : 'white' , marginTop : '10px'}}></div>
                        <div style={{marginTop : '16px' , marginBottom : '10px'}}> ERC3<sup>BETA</sup> NTVs</div>
                        <Bar name="Dopamine" load={serverResponses.ntv1}/>
                        <Bar name="Endorphin" load={serverResponses.ntv_2}/>
                        <Bar name="Oxytocin" load={serverResponses.ntv_3}/>
                        <Bar name="Adrenaline" load={serverResponses.ntv_4}/>
                        <div className="line" style={{minWidth : '20vw' , minHeight : '0.2px' , backgroundColor : 'white' , marginTop : '10px'}}></div>
                        <div style={{marginTop : '16px' , marginBottom : '10px'}}> Memory Stream</div>
                        <BoxContainer n={serverResponses.num} />

                        <div className="line" style={{minWidth : '20vw' , minHeight : '0.2px' , backgroundColor : 'white' , marginTop : '10px'}}></div>
                        <p style={{marginTop : '16px', color : 'cyan' , opacity : '70%'}}> STATUS  :  {status}</p>
                    </div>
                </div>
        </div>
        <div className={styles.App} style={{width : '88vw', height : '200px' , backgroundColor : '#151515'}}>
                        <p style={{margin : '20px', opacity : '90%'}}>COMMANDS</p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><b>/start</b>  :  <i>to start synthesizing memory object</i></p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><b>/end</b>  :  <i>to finish synthesizing</i></p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><b>/set _neurotransmitter_  _value_</b>  :  <i>eg. /set oxytocin high set adrenaline low</i></p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><b>/reset future</b>  :  <i>chances are that the future plans may get fucked up due to excessive chatting</i></p>
                        <p style={{margin : '25px', marginTop : '40px' , opacity : '60%', alightSelf : 'center' , textAlign : 'center' , fontSize : '12px'}}>An official product of NeuraKink Inc.</p>
                    </div>
                        

        </>
    );
}

export default App;
