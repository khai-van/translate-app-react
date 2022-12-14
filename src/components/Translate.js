import React, { useState } from 'react';
import {
    Form,
    TextArea,
    Button,
    Icon,
} from 'semantic-ui-react';
import axios from 'axios';

let HOST="https://4fd0-35-229-31-183.ngrok.io"

export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [resultText1, setResultText1] = useState('');
    const [resultText2, setResultText2] = useState('');
    const [resultText3, setResultText3] = useState('');
    const [resultText4, setResultText4] = useState('');
    const [isSubmitting, setSubmmitting] = useState(false)

    const translateText = () => {
        setSubmmitting(true)
        setResultText1("")
        setResultText2("")
        setResultText3("")
        setResultText4("")

        const translate_at = axios.get(HOST + `/translate/baseAT/` + inputText)
        const translate_nat = axios.get(HOST + `/translate/baseNAT/` + inputText)
        const translate_levT = axios.get(HOST + `/translate/baseLevT/` + inputText)
        const translate_levT_2 = axios.get(HOST + `/translate/upgradeLevT/` + inputText)

        axios.all([translate_at, translate_nat, translate_levT, translate_levT_2]).then(axios.spread((...responses) => {
            const response_translate_at = responses[0]
            const response_translate_nat = responses[1]
            const respones_translate_levT = responses[2]
            const respones_translate_levT_2 = responses[3]
            
            setResultText1(response_translate_at.data.response)
            setResultText2(response_translate_nat.data.response)
            setResultText3(respones_translate_levT.data.response)
            setResultText4(respones_translate_levT_2.data.response)
            setSubmmitting(false)
          })).catch(errors => {
            // react on errors.
            setSubmmitting(false)
              
          })
    }


    return (
        <div>
            <div className="app-header">
                <h2 className="header">MÔ HÌNH DỊCH MÁY ANH - VIỆT</h2>
            </div>

            <div className='app-body'>
                <div>
                    <Form>
                        <Form.Field
                            control={TextArea}
                            placeholder='Nhập tiếng anh vào đây để dịch...'
                            onChange={(e) => setInputText(e.target.value)}
                        />

                        <Form.Field
                            control={TextArea}
                            placeholder='Kết quả mô hình base Transformer'
                            value={resultText1}
                            label='AT' 
                        />
                        <Form.Field
                            control={TextArea}
                            placeholder='Kết quả mô hình base Non-autoregressive Transformer'
                            value={resultText2}
                            label='NAT'
                        />
                        <Form.Field
                            control={TextArea}
                            placeholder='Kết quả mô hình Levenshtein Transformer'
                            value={resultText3}
                            label='LevT'
                        />
                        <Form.Field
                            control={TextArea}
                            placeholder='Kết quả mô hinh Levenshtein Transformer có reranking'
                            value={resultText4}
                            label='Upgraded LevT'
                        />
                        

                        <Button 
                            color="orange"
                            size="large"
                            onClick={translateText}
                            loading={isSubmitting}
                        >
                            <Icon name='translate' />
                            Translate
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
