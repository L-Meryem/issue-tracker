var bugStatus = document.querySelectorAll("#status");
var bugPriority = document.querySelectorAll("#priority");
var trash = document.getElementsByClassName("fa-trash");

Array.from(bugPriority).forEach(function (element) {
  element.addEventListener('click', function () {
    const newPriority = this.value;
    const id = this.parentNode.parentNode.childNodes[1].innerText
    console.log(newPriority);
    fetch('bugs/priority', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'id': id,
        'priority':newPriority
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(bugStatus).forEach(function (element) {
  element.addEventListener('click', function () {
    const newStatus = this.value;
    const id = this.parentNode.parentNode.childNodes[1].innerText
    console.log(newStatus);
    fetch('bugs/status', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'id': id,
        'status':newStatus
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});


Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const id = this.parentNode.parentNode.childNodes[1].innerText;
    fetch('bugs', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
