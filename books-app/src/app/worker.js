var workerService = function () {

  this.onmessage = function (responseData) {
    console.log('onmessage recieved: ', responseData);
    postMessage({
      data: responseData
    });
  };

  console.log('worker init');

};

var workerService = new workerService();

/* onmessage recieved from worker caller */
onmessage = function (e) {
  getData();
};

function getData() {

  var promise = new Promise((resolve, reject) => {

    fetch('http://localhost:8080/getBooks').then((response) => {
      return response.json();
    }).then((data) => {
      resolve(data);
      return data;
    }).catch((err) => {
      return err;
    });

  });

  promise.then((data) => {
    /* return message to worker subscriber/instance */
    workerService.onmessage(data);
  });

};
