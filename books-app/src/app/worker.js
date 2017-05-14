onmessage = function (e) {
  console.log('onmessage recieved', e);
  postMessage('some data from worker');
};
