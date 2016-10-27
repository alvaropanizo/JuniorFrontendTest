//Álvaro Panizo Romano -27/10/2016
//Calling github api to search users

  document.addEventListener("DOMContentLoaded", function(event) {

    //OnClick event to the input in the form with id="submit_search"
    document.getElementById('submit').onclick = function(event){
      
      //Abort any other events
      event.preventDefault();

      //Element tu render
      document.getElementById("result").innerHTML = '';

      var inputUsername = document.getElementById("profile_name").value;
      var urlUser = "https://api.github.com/users/" + inputUsername;

      request(urlUser,renderUser);
  };

  //Request method GET with AJAX
  function request(url, render) {
      var request = new XMLHttpRequest();
      
      request.open("GET", url, true);
      request.onreadystatechange = render;
      request.send();
  };

  // --------- CALLING GITHUB API ---------------------
  //
  // Call the api and colect the response with the state and status
  function renderUser() {
      
      if (this.readyState == 4 && this.status == 200) {
          var apiResponse = JSON.parse(this.responseText);        
          //this url call the request to return and show user
          var apiUrlResponse = "https://api.github.com/search/repositories?q=+user:" + apiResponse.login;
          request(apiUrlResponse, renderAPIResponse);

          showProfile(apiResponse);
      }

      else 
          showFails();
  };


  //Render the JSON reponse from the API
  function renderAPIResponse() {
      if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          showRepositories(response.items);
      }
  };

  // ------------------------- COMPOSE RENDER METHODS 
  //

  // Prints the array of repositories from response.
  function showRepositories(repositoriesArray) {
      var print = '<h5> Repositories </h5>'
     
      print += "<table>";

      //Compose the render with stargazers coun and forks from git
      for(var i = 0; i < repositoriesArray.length; i++) {
          print += '<tr>';
          print += '<td>' + repositoriesArray[i].name + '</td>' 
           + '<td> <i class="fa fa-star" aria-hidden="true"> </i>' + repositoriesArray[i].stargazers_count + '</td>'
           + '<td> <i class="fa fa-code-fork" aria-hidden="true"> </i>' + repositoriesArray[i].forks + '</td>';         
          print += '</tr>' //tr
      }

      print += '</table>' //table

      //Add the render to index
      document.getElementById("result").innerHTML = print;
  };

  function showProfile(profile) {
      var print = '<p>@' + profile.login + '</p>'
      print += '<h4>' + profile.name + '</h4>'
      print += '<img id="image" src=' + profile.avatar_url + '>'
      
      document.getElementById("profile").innerHTML = print;
  }

  // Prints an error.
  function showFails(){
    var print = '<div class="alert alert-danger margin-top-1"> Does not exists! </div>'
    document.getElementById("profile").innerHTML = print;
  }

});
