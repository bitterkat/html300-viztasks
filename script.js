// Load the Visualization API and the corechart package.
// We need this for all chart library usage in this file.
google.charts.load('current', {'packages':['corechart']});
// Set a callback to run when the Google Visualization API is loaded- trigger drawing the bar chart
google.charts.setOnLoadCallback(drawBasic);

var tasks = []
var jeremy = []
var jennifer = []
var sid = []

window.onload = function() {
  drawTasks()
  var form = document.querySelector("form")
  form.onsubmit = getTasks
}

function getTasks() {
  event.preventDefault()
  var form = document.querySelector("form")

  var newTasks = {
    task: form.task.value,
    taskDoer: form.taskDoer.value,
    taskDifficulty: form.taskDifficulty.value
  }
  tasks.push(newTasks)

  // track task count by task doer
  fetchDoers()
  // redraw the task list
  drawTasks()
  form.reset()
}

// Fetches length of filtered array (by task doer name)
function fetchDoers() {
  jeremy = tasks.filter(function(o) { return o.taskDoer == "Jeremy"})
  jennifer = tasks.filter(function(o) { return o.taskDoer == "Jennifer"})
  sid = tasks.filter(function(o) { return o.taskDoer == "Sid"})
}

// Draws a bar chart
function drawBasic() {
  var data = new google.visualization.DataTable()
  data.addColumn('string', '')
  data.addColumn('number', 'Count')

  data.addRows([
    ['Jeremy', jeremy.length],
    ['Jennifer', jennifer.length],
    ['Sid', sid.length]
  ])

  var options = {
    title: 'Who is the busiest Task Doer?',
    hAxis: {
      title: ''
    },
    vAxis: {
      title: 'Number of Tasks Assigned'
    }
  }

  var chart = new google.visualization.ColumnChart(
    document.getElementById('chart_div'))

  chart.draw(data, options)
}

// draws a list of tasks
function drawTasks() {
  event.preventDefault()
  var parent = document.getElementById('task-list')

  // //clear out existing contents
  parent.innerHTML = ""
  var h2 = document.createElement("h2")
  h2.innerHTML = "Task List:"
  parent.appendChild(h2)
  // create a <ul> node
  var ul = document.createElement("ul")

  for (var i = 0; i < tasks.length; i++) {
  // create an <li> node
  var li = document.createElement("li")

  // add the task string to the li
  li.innerHTML = `${tasks[i].taskDoer} is going to ${tasks[i].task}, which is a ${tasks[i].taskDifficulty} task.`

  // append li to ul
  ul.appendChild(li)
  }
  // append the ul to the #task container
  parent.appendChild(ul)

  // redraw the chart
  drawBasic()
}
