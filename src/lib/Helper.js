import moment from 'moment';

const BANDWIDTH_PERIOD = 86400;
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

export const defaultavt = "https://www.showflipper.com/thumb.php?src=default.jpg&t=a&w=100&h=100"
export const serverurl = "http://localhost:3010/";

export async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export const calculateBandwidth = (usedbandwidth, bandwidthTime, balance) => {
    const diff = bandwidthTime
        ? moment().unix() - moment(bandwidthTime).unix()
        : BANDWIDTH_PERIOD;
    const bandwidthLimit = balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;
    // 24 hours window max 65kB
    const bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * usedbandwidth);
    return (bandwidthLimit - bandwidth).toFixed()
};

export const base64Img = (binaryImg) => {
    return "data:image/jpeg;base64," + Buffer.from(binaryImg).toString('base64');
};