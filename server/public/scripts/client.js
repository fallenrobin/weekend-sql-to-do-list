$(onReady);

function onReady() {
    console.log('ready!');
connectToDB();
}

function connectToDB(){
    console.log( 'in connect to DB' );
    // ajax call to server to get koalas
    $.ajax({
      type: 'GET',
      url: '/todo' 
    }).then(function(response) {
      console.log(response);
    //   renderKoalas(response); // Still needs to be created
    }).catch(function(error){
      console.log('error in GET', error);
    });
  
  } // end getKoalas