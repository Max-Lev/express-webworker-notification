
onmessage = function (e) {
    console.log('result: ', e);
    postMessage('msg sent');
};

console.log(this);
