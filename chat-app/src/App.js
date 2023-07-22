import React, { useState } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import Bar from './Bar';
import BoxContainer from './BoxContainer';


function App() {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [erc1, seterc1] = useState("");
    const [erc2, seterc2] = useState("");
    const [erc3, seterc3] = useState("");
    const [plan, setPlan] = useState("");
    const [status, setStatus] = useState("HEALTHY");
    const [dopamine_level_user, setDopamine_level_user] = useState(0);
    const [oxytocin_level_user, setOxytocin_level_user] = useState(0);
    const [endorphin_level_user, setEndorphin_level_user] = useState(0);
    const [adrenaline_level_user, setAdrenaline_level_user] = useState(0);
    const [nt1, setnt1] = useState(0);
    const [nt2, setnt2] = useState(0);
    const [nt3, setnt3] = useState(0);
    const [nt4, setnt4] = useState(0);
    const [num, setnum] = useState(0);
    const [chat_synopsis3, setchat_synopsis3] = useState("");
    const refresh = () =>{
        setStatus("REFRESHING")
        axios.post('http://localhost:5000/refresh', {
        })
        .then((response) => {
            setAdrenaline_level_user(0);
            setDopamine_level_user(0);
            setEndorphin_level_user(0);
            setOxytocin_level_user(0);
            setchat_synopsis3('');
            setPlan('');
            seterc1('');
            seterc2('');
            seterc3('');
            setnt1(0);
            setnt2(0);
            setnt3(0);
            setnt4(0);
            setStatus("HEALTHY");
        //     setServerResponses({response_ERC1: "", response_ERC2: "", response_ERC3: "", plan: "", dopamine_level_user: dopamine_level_user, oxytocin_level_user: oxytocin_level_user, endorphin_level_user: endorphin_level_user, adrenaline_level_user: adrenaline_level_user, ntv_1: 0, ntv_2: 0, ntv_3: 0, ntv_4: 0, status: "HEALTHY", num: 0,})
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    }
    const sendMessage = () => {
        setIsLoading(true);

        axios.post('http://localhost:5000/writememory', {
            msg: message
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

        axios.post('http://localhost:5000/get_user_ntv', {
            msg: message
        })
        .then((response) => {
            setAdrenaline_level_user(response.data.adrenaline_level_user*2)
            setDopamine_level_user(response.data.dopamine_level_user*2)
            setEndorphin_level_user(response.data.endorphin_level_user*2)
            setOxytocin_level_user(response.data.oxytocin_level_user*2)
            setIsLoading(false);
            setchat_synopsis3(response.data.chat_synopsis3)
        //     setServerResponses({response_ERC1: "", response_ERC2: "", response_ERC3: "", plan: "", dopamine_level_user: dopamine_level_user, oxytocin_level_user: oxytocin_level_user, endorphin_level_user: endorphin_level_user, adrenaline_level_user: adrenaline_level_user, ntv_1: 0, ntv_2: 0, ntv_3: 0, ntv_4: 0, status: "HEALTHY", num: 0,})
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            
        });

        axios.post('http://localhost:5000/ntv', {
        })
        .then((response) => {
            setnt1(response.data.nt1*2);
            setnt2(response.data.nt2*2);
            setnt3(response.data.nt3*2);
            setnt4(response.data.nt4*2);
            console.log(nt1);

        //     setServerResponses({response_ERC1: "", response_ERC2: "", response_ERC3: "", plan: "", dopamine_level_user: dopamine_level_user, oxytocin_level_user: oxytocin_level_user, endorphin_level_user: endorphin_level_user, adrenaline_level_user: adrenaline_level_user, ntv_1: 0, ntv_2: 0, ntv_3: 0, ntv_4: 0, status: "HEALTHY", num: 0,})
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

        axios.post('http://localhost:5000/num_mem_objects', {
            msg: message
        })
        .then((response) => {
            setIsLoading(false);
            setnum(response.data.num)
            // setServerResponses({response_ERC1: "", response_ERC2: "", response_ERC3: "", plan: "", dopamine_level_user: dopamine_level_user, oxytocin_level_user: oxytocin_level_user, endorphin_level_user: endorphin_level_user, adrenaline_level_user: adrenaline_level_user, ntv_1: 0, ntv_2: 0, ntv_3: 0, ntv_4: 0, status: "HEALTHY", num: num,})
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

        axios.post('http://localhost:5000/status', {
            msg: message
        })
        .then((response) => {
            setStatus(response.data.status);
            setIsLoading(false);
            // setServerResponses({response_ERC1: "", response_ERC2: "", response_ERC3: "", plan: "", dopamine_level_user: dopamine_level_user, oxytocin_level_user: oxytocin_level_user, endorphin_level_user: endorphin_level_user, adrenaline_level_user: adrenaline_level_user, ntv_1: 0, ntv_2: 0, ntv_3: 0, ntv_4: 0, status: get_status, num: num,})
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

        axios.post('http://localhost:5000/plan', {
            msg: message
        })
        .then((response) => {
            setPlan(response.data.plan);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

        axios.post('http://localhost:5000/erc1_chat', {
            msg: message
        })
        .then((response) => {
            seterc1(response.data.erc1_response)
            setIsLoading(false);
            // setServerResponses({response_ERC1: "", response_ERC2: "", response_ERC3: "", plan: plan, dopamine_level_user: dopamine_level_user, oxytocin_level_user: oxytocin_level_user, endorphin_level_user: endorphin_level_user, adrenaline_level_user: adrenaline_level_user, ntv_1: 0, ntv_2: 0, ntv_3: 0, ntv_4: 0, status: get_status, num: num,})
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

        axios.post('http://localhost:5000/erc2_chat', {
            msg: message
        })
        .then((response) => {
            seterc2(response.data.erc2_response);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

        axios.post('http://localhost:5000/erc3_chat', {
            msg: message,
            chat_synopsis3 : chat_synopsis3
        })
        .then((response) => {
            seterc3(response.data.erc3_response);
            setIsLoading(false);
            
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
                            <div className={styles.response} style={{fontSize : '13px' , color : 'grey'}}>{erc1}</div>
                            <div style={{marginTop : '20px'}}>ERC2 RESPONSE</div>
                            <div className={styles.response} style={{fontSize : '13px' , color : 'grey'}}>{erc2}</div>
                            <div style={{marginTop : '20px'}}>ERC3 RESPONSE <sup>BETA</sup></div>
                            <div className={styles.response} style={{fontSize : '14px' , color : '#00bbbb'}}>{erc3}</div>
                        </div>
                        <div>
                            {/* <div style={{width : '20vw' , height : '240px' , backgroundColor : '#121212' , marginTop : '40px'}}>  */}
                        {/* </div> */}
                    </div>
                    </div>
                    <div className="line" style={{minWidth : '50vw' , minHeight : '0.2px' , backgroundColor : 'white' , margin: '20px'}}></div>
                    <div className={styles.response} style={{backgroundColor : '#121212' , fontSize : '12px' , width : '90%'}}>Plan: {plan}</div>
                    
                </div>
                <div style={{display : 'flex', flexDirection : 'column'}}>
                    <div className={styles.App} style={{width : '20vw', height : '530px', border: '1px solid #00AAAA'}}>
                        <div style={{marginTop : '16px' , marginBottom : '10px'}}> USER NTVs</div>
                        <Bar name="Dopamine" load={dopamine_level_user}/>
                        <Bar name="Endorphin" load={endorphin_level_user}/>
                        <Bar name="Oxytocin" load={oxytocin_level_user}/>
                        <Bar name="Adrenaline" load={adrenaline_level_user}/>
                        <div className="line" style={{minWidth : '20vw' , minHeight : '0.2px' , backgroundColor : 'white' , marginTop : '10px'}}></div>
                        <div style={{marginTop : '16px' , marginBottom : '10px'}}> ERC3<sup>BETA</sup> NTVs</div>
                        <Bar name="Dopamine" load={nt1}/>
                        <Bar name="Endorphin" load={nt2}/>
                        <Bar name="Oxytocin" load={nt3}/>
                        <Bar name="Adrenaline" load={nt4}/>
                        <div className="line" style={{minWidth : '20vw' , minHeight : '0.2px' , backgroundColor : 'white' , marginTop : '10px'}}></div>
                        <div style={{marginTop : '16px' , marginBottom : '10px'}}> Memory Stream</div>
                        <BoxContainer n={num} />
                        <div className="line" style={{minWidth : '20vw' , minHeight : '0.2px' , backgroundColor : 'white' , marginTop : '10px'}}></div>
                        <p style={{marginTop : '16px', color : 'cyan' , opacity : '70%'}}> STATUS  :  {status}</p>
                        <button className={styles.button} onClick={refresh} disabled={isLoading}>{isLoading ? '....' : 'Refresh'}</button>
                    </div>
                </div>
        </div>
                    <div className={styles.App} style={{width : '88vw', height : '200px' , backgroundColor : '#151515'}}>
                        <p style={{margin : '20px', opacity : '90%'}}>COMMANDS</p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><b>/start</b>  :  <i>to start synthesizing memory object</i></p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><b>/end</b>  :  <i>to finish synthesizing</i></p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><b>/set _neurotransmitter_  _value_</b>  :  <i>eg. /set oxytocin high set adrenaline low</i></p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><b>/reset future</b>  :  <i>chances are that the future plans may get fucked up due to excessive chatting</i></p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><i> It is advised you press the refresh button whenever you want to start a new chat</i></p>
                        <p style={{margin : '2px', opacity : '60%', marginLeft : '22px'}}><i> If some replies dont show up, the the server is most likely overloaded. Please refresh with the button always!</i></p>
                        <p style={{margin : '25px', marginTop : '40px' , opacity : '60%',textAlign : 'center' , fontSize : '12px'}}>An official product of NeuraKink Inc.</p>
                    </div>
                        

        </>
    );
}

export default App;
