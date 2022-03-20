$(onReady);

// import { createPopper } from '@popperjs/core';

// const button = document.querySelector('#button');
// const tooltip = document.querySelector('#tooltip');

function onReady() {
  console.log('ready!');
  getTasks();
  setupClickListeners();
  // $('#priorityDropDown').on('show.bs.dropdown', function () {
  //   console.log('drop down clicked!');
  // })
}

function setupClickListeners() {
  $('#submitBtn').on('click', function () {// get user input and put in an object


    console.log($('#taskInput').val());
    let newTask = {
      task: $('#taskInput').val(),
      priority: 'high',
      category: 'home',
      completed: false
    };
    console.log(newTask);

    // call newTask with the new object
    insertTask(newTask);
  })
  $('#viewTasks').on('click', '.completeBtn', completeTask);

  $('#viewTasks').on('click', '.deleteBtn', deleteTask);
  $('.dropdown-toggle').dropdown();
}

function dropdown(){
  $('.dropdown').on('show.bs.dropdown', function(){
    console.log('drop down clicked!')
  });
  $('.dropdown').on('shown.bs.dropdown', function(){
    alert('The dropdown is now fully shown.');
  });
  $('.dropdown').on('hide.bs.dropdown', function(e){
    alert('The dropdown is about to be hidden.');
  });
  $('.dropdown').on('hidden.bs.dropdown', function(){
    alert('The dropdown is now fully hidden.');
  });
};

// function dropdown() {
//   console.log('drop down!');
  
// }

function insertTask(taco) {
  console.log('in insertTask', taco);
  // ajax call to add newTask object to DB
  $.ajax({
    type: 'POST',
    url: '/todo',
    data: taco,
  }).then(function (response) {
    console.log('Response from server.', response);
    getTasks();
    $('#taskInput').val('');
  }).catch(function (error) {
    console.log('Error in POST', error)
    alert('Unable to add task at this time. Please try again later.');
  });

}

function deleteTask() {
  let id = $(this).closest('tr').data('id');
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

function completeTask() {
  let id = $(this).closest('tr').data('id');
  // console.log('Clicked COMPLETE', id);
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
          <tr data-id=${task.id} data-complete=${task.completed}>
              <td class="priorityClass highPriority">${task.priority}</td>
              <td>${task.task}</td>
              <td>${task.category}</td>
              <td><button class="btn btn-success completeBtn">Got 'er done!</button></td>
              <td><button class="btn btn-danger deleteBtn">Remove</button></td>
        </tr>
          `);
      $('#viewTasks').prepend(row);
      // console.log(row.data('id'));
      console.log(row.data('complete'));
  
    } else {
      let row = $(`
      <tr class="taskCompleted" data-id=${task.id} data-complete=${task.completed}>
              <td class="priorityClass highPriority">${task.priority}</td>
              <td>${task.task}</td>
              <td>${task.category}</td>
              <td></td>
              <td><button class="btn btn-danger deleteBtn">Remove</button></td>
      </tr>
        `);
      $('#viewTasks').prepend(row);
      // console.log(row.data('id'));
      console.log(row.data('complete'));
    }
  }
}
