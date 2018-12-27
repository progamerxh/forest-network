import axios from 'axios';
import { sign, encode } from '../lib/tx';
import { serverurl } from '../lib/Helper';

const privnode = "http://localhost:26657/"

export const broadcastTx = (payload) => {
    return async (dispatch, getState) => {
        const { publicKey, secret, sequence } = getState().auth;
        const tx = {
            version: 1,
            sequence: sequence + 1,
            operation: payload.operation,
            params: payload.params,
            account: publicKey,
            memo: Buffer.alloc(0),
            signature: new Buffer(64),
        };
        sign(tx, secret);
        axios.post(privnode + `broadcast_tx_commit?tx=0x${encode(tx).toString('hex')}`)
            .then(res => {
                console.log(res);
                if (res.data.error)
                    alert(res.data.erorr.data);
                else if (res.data.result.check_tx.code)
                    alert(res.data.result.check_tx.log);
                else if (payload.operation === "create_account")
                    alert(`Create account success!\nAddress: ${payload.params.address}`);
                else if (payload.operation === "payment")
                    alert(`Transfer success!\nAddress: ${payload.params.address}\nAmount: ${payload.params.amount}`);
            })
    }
}
