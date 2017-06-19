// Load the Visualization API and the corechart package.
// We need this for all chart library usage in this file.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded- trigger drawing the bar chart
google.charts.setOnLoadCallback(drawBasic);

var tasks = [];

var taskCounter = {
  j1: 0,
  j2: 0,
  s1: 0
}

window.onload = function() {
  drawTasks();
  var form = document.querySelector("form");
  form.onsubmit = getTasks;
}

function getTasks() {
  event.preventDefault();
  var form = document.querySelector("form");

  // create a new task object with form values
  var newTasks = {
    task: form.task.value,
    taskDoer: form.taskDoer.value,
    taskDifficulty: form.taskDifficulty.value}

  // insert new tasks object into tasks
  tasks.push(newTasks);
  // taskCounter(tasks);
  vote();
  drawTasks();
  //clear the form
  form.reset();
  }

function vote() {
  if (document.getElementById('jeremy').checked == true) {
    taskCounter.j1 = taskCounter.j1 + 1;
  } else if (document.getElementById('jennifer').checked == true) {
    taskCounter.j2 = taskCounter.j2 + 1;
  } else if (document.getElementById('sid').checked == true) {
    taskCounter.s1 = taskCounter.s1 + 1;
  }
  // redraw the chart
  drawBasic();
}

// Draws a bar chart
// Documentation: https://developers.google.com/chart/interactive/docs/gallery/columnchart
function drawBasic() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', "Task Doer");
  data.addColumn('number', 'Count');

  // Numeric values for rows are pulled from our global variable that holds counts for each topping
  data.addRows([
    ['Jeremy', taskCounter.j1],
    ['Jennifer', taskCounter.j2],
    ['Sid', taskCounter.s1]
  ]);

  var options = {
    title: 'Who is the busiest Task Doer?',
    hAxis: {
      title: 'Task Doer'
    },
    vAxis: {
      title: 'Number of Tasks Assigned'
    }
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById('chart_div'));

  chart.draw(data, options);
}

// draws a list of tasks
function drawTasks() {
  event.preventDefault();

  var parent = document.getElementById('task-list');

  //clear out existing contents
  parent.innerHTML = "";

  //create a <h2> node
  var h2 = document.createElement("h2");

  // create a <ul> node
  var ul = document.createElement("ul");

  for (var i = 0; i < tasks.length; i++) {

  // create an <li> node
  var li = document.createElement("li");

  // add the task string to the li
  li.innerHTML = "<strong>task:</strong> "+tasks[i].task+", <strong>assigned to:</strong> "+tasks[i].taskDoer+", <strong>difficulty level:</strong> "+tasks[i].taskDifficulty;

  // add h2
  h2.innerHTML = "TASK LIST";

  // append li to ul
  ul.appendChild(li);
  }

  // append the h2 and ul to the #task container
  parent.appendChild(h2);
  parent.appendChild(ul);
}
