$(onReady);

function onReady() {
  console.log('ready!');
  getTasks();
  setupClickListeners();
  // $('.dropdown-toggle').dropdown();
}

function setupClickListeners() {
  $('#submitBtn').on('click', function(){
    
  // get user input and put in an object

  console.log($('#taskInput').val());
  let newTask = {
    task: $('#taskInput').val(),
    priority: 'high',
    category: 'home',
    completed: false
  };
  console.log(newTask);
  insertTask(newTask);
  
  // call newTask with the new object
  // insertTask(newTask);

  // $('#viewTasks').on('click', '.completeBtn', console.log('clicked complete'));

  // $('#viewTasks').on('click', '.deleteBtn', console.log('clicked delete'));
})
}

function insertTask(taco) {
  console.log('in insertTask', taco);
  // ajax call to server to get koalas
  // $.ajax({
  //   type: 'POST',
  //   url: '/todo',
  //   data: taco,
  // }).then(function (response) {
  //   console.log('Response from server.', response);
  //   getKoalas();
  // }).catch(function (error) {
  //   console.log('Error in POST', error)
  //   alert('Unable to add task at this time. Please try again later.');
  // });

}

// Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }

function getTasks() {
  console.log('in connect to DB');
  // ajax call to server to get tasks from DB
  $.ajax({
    type: 'GET',
    url: '/todo'
  }).then(function (response) {
    // console.log(response);
    renderTasks(response); //to append current tasks on DOM
  }).catch(function (error) {
    console.log('error in GET', error);
  });

}

function renderTasks(tasks) {
  $('#viewTasks').empty();

  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];

    if (task.completed === false) {
      let row = $(`
          <tr>
              <td class="priorityClass highPriority">hardcoded as highPriority</td>
              <td>hardcoded task!</td>
              <td>hardcoded home</td>
              <td><button class="btn btn-success completeBtn">Got 'er done!</button></td>
              <td><button class="btn btn-danger deleteBtn">Remove</button></td>
        </tr>
          `);
      row.data('task', task);
      $('#viewTasks').append(row);
      // console.log(row.data('task'));
    } else {
      let row = $(`
      <tr>
              <td class="priorityClass highPriority">hardcoded as highPriority</td>
              <td>hardcoded task!</td>
              <td>hardcoded home</td>
              <td></td>
              <td><button class="btn btn-danger deleteBtn">Remove</button></td>
      </tr>
        `);
      row.data('task', task);
      $('#viewTasks').append(row);
      // console.log(row.data('task'));
    }
  }
}
