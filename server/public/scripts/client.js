$(onReady);

function onReady() {
  console.log('ready!');
  getTasks();
  setupClickListeners();
  // $('.dropdown-toggle').dropdown(); // don't know if this should be here...
  // I never figured out how to get the dropdowns to work 😭 
  //(i did try a variety of things! And even more things on another branch!!)
}

function setupClickListeners() { // get user input and put in an object
  $('#submitBtn').on('click', function () {


    console.log($('#taskInput').val());
    let newTask = { //Creates object out of user input
      task: $('#taskInput').val(),
      priority: 'high',
      category: 'home',
      completed: false
    };
    console.log(newTask);

    // call newTask, passing the new object as argument
    insertTask(newTask); //calls the function to POST
  })
  $('#viewTasks').on('click', '.completeBtn', completeTask);

  $('#viewTasks').on('click', '.deleteBtn', deleteTask);
}

function insertTask(taco) {   // ajax call to add newTask object to DB
  console.log('in insertTask', taco);
  $.ajax({
    type: 'POST',
    url: '/todo',
    data: taco,
  }).then(function (response) {
    console.log('Response from server.', response);
    getTasks();
    $('#taskInput').val(''); //clears input field
  }).catch(function (error) {
    console.log('Error in POST', error)
    alert('Unable to add task at this time. Please try again later.');
  });

}

function deleteTask() { // ajax call to delete clicked item from DB
  let id = $(this).closest('tr').data('id'); //uses item ID stored on tr
  console.log('CLICKED DELETE', id);
  console.log(id);

  $.ajax({
    url: `/todo/${id}`,
    method: 'DELETE'
  }).then(function (response) {
    console.log('Deleted task');
    getTasks();
  }).catch(function (err) {
    console.log(err);
  })
}

function completeTask() { //ajax call to update (PUT) the completed status (boolean value) in DB
  let id = $(this).closest('tr').data('id'); //uses item ID stored on tr
  console.log('Clicked COMPLETE', id);
  console.log(id);

  $.ajax({
    url: `/todo/${id}`,
    method: 'PUT'
  }).then(function (response) {
    console.log('Completed task');
    getTasks();
  }).catch(function (err) {
    console.log(err);
  })
}

function getTasks() { // ajax call to server to get tasks from DB
  console.log('in connect to DB');
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

function renderTasks(tasks) { //will prepend current tasks on DOM in tbody
  $('#viewTasks').empty();

  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];

    if (task.completed === false) { //this will be default for new tasks, since they will always be 
      // "completed" = false
      let row = $(`
              <tr data-id=${task.id}>
              <td class="${task.priority}">${task.priority}</td>
              <td>${task.task}</td>
              <td class="${task.category}">${task.category}</td>
              <td><button class="btn btn-success completeBtn">Got 'er done!</button></td>
              <td><button class="btn btn-danger deleteBtn">Remove</button></td>
        </tr>
          `);
      $('#viewTasks').prepend(row);
      console.log(row.data('id'));
      // console.log(row.data('complete'));
  
    } else { // once 'got 'er done button is clicked, the next GET will trigger this version
      let row = $(`
              <tr data-id=${task.id}>
              <td class="noPriority"></td>
              <td>${task.task}</td>
              <td class="${task.category}">${task.category}</td>
              <td id="hands">🙌</td>
              <td><button class="btn btn-danger deleteBtn">Remove</button></td>
      </tr>
        `);
      $('#viewTasks').prepend(row); //actual prepend
      console.log(row.data('id'));
      console.log(row.data('complete'));
    }
  }
}

/*Below are the vestiges of a failed dropdown attempt...
Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }*/