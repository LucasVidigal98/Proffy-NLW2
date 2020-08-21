import moment from 'moment'

export default function convertMinutesToHour(time: any){
    const h = time / 60 | 0;
    const m = time % 60 | 0;

    return moment.utc().hour(h).minutes(m).format('hh:mm A');
}