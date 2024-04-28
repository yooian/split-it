import * as React from 'react';
import { useState } from 'react';

import { useLocation } from 'react-router-dom';


function I_Page_3() {
    const { listorder } = location.state || {};

    return (
        <p>{listorder}</p>
    );

            
   
}

export default I_Page_3;