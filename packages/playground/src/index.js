import React from 'react';
import * as ReactDom from 'react-dom/client'
import { Button } from 'antd-mobile';
import 'antd-mobile/es/global';

const App = () => {
    console.log('注入信息', process.env.SSH_HOST)
    return (
        < div >
            <h1>dev-sync-upload Playground</h1>
            <Button color='primary'>Ant Design Mobile Button123</Button>
        </div >
    )


};

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(<App />)
