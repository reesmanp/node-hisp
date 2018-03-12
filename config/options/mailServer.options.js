import {
    onAuth,
    onData,
    onConnect
} from '../../util/optionFunctions';

export default {
    secure: true,
    //name
    authMethods: ['PLAIN', 'LOGIN'],
    onAuth: onAuth,
    onData: onData,
    onConnect: onConnect
};
