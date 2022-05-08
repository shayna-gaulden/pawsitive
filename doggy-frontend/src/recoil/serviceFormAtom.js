import {atom} from 'recoil';

export const editServiceData = atom({
    key: 'editServiceData', // unique ID (with respect to other atoms/selectors)
    default: JSON.stringify({
        'DEPARTMENT':'',
        'SERIVCE':'',
        'DETAILS':'',
        'PRICE':'',
    }), // default value (aka initial value)
});

export const editServicePath = atom({
    key:'editServicePath',
    default:[]
})