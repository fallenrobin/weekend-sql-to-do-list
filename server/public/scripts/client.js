$(onReady);

function onReady() {
  console.log('ready!');
  getTasks();
  // $('.dropdown-toggle').dropdown();
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
    console.log(response);
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
      console.log(row.data('task'));
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
      console.log(row.data('task'));
    }
  }
}
