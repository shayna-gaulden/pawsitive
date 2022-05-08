import {atom} from 'recoil';


export const dogsList = atom({
    key:'dogsList',
    default: []
});

export const bookingList = atom({
    key:'bookingList',
    default: []
});

export const calendarList = atom({
    key:'calendarList',
    default: []
})