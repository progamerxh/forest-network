import * as types from '../Actions/PostActionType'

const mocktransactions = [
    {
        account: "GAMKCQ2STC3NLPEHMYKQCT7MPBRB33YTQ2SJGDTYY3245QLREJX3VXHP",
        operation: "Create account",
        timestamp: "Tue Dec 1 2018 07:00:00 GMT+0700",
        params: {
            address: "GAMKCQ2STC3NLPEHMYKQCT7MPBRB33YTQ2SJGDTYY3245QLREJX3VXHP"
        },
        hash: "GAMKCQ2STC3NLPEHMYKQCT",
    },
    {
        account: "GAMKCQ2STC3NLPEHMYKQCT7MPBRB33YTQ2SJGDTYY3245QLREJX3VXHP",
        operation: "Create account",
        timestamp: "Tue Dec 1 2018 07:00:00 GMT+0700",
        params: {
            address: "GAMKCQ2STC3NLPEHMYKQCT7MPBRB33YTQ2SJGDTYY3245QLREJX3VXHP"
        },
        hash: "GAMKCQ2STC3NLPEHMYKQCT",
    },
    {
        account: "GAMKCQ2STC3NLPEHMYKQCT7MPBRB33YTQ2SJGDTYY3245QLREJX3VXHP",
        operation: "Create account",
        timestamp: "Tue Dec 1 2018 07:00:00 GMT+0700",
        params: {
            address: "GAMKCQ2STC3NLPEHMYKQCT7MPBRB33YTQ2SJGDTYY3245QLREJX3VXHP"
        },
        hash: "GAMKCQ2STC3NLPEHMYKQCT",
    },

]
export const transactionlist = (state = mocktransactions, action) => {
    switch (action.type) {

        default:
            return state;
    }
};