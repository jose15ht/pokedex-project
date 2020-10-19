$(function(){

  $('button').click(function(event){
    event.preventDefault();

    var pokemonID = $('#pokedex').val()
    var settings = {
      "url": `https://pokeapi.co/api/v2/pokemon/${pokemonID}`,
      "method": "GET",
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      $('#pokeName').text(response.name)
      $('#pokeSprite').attr('src', response.sprites['front_shiny'])
      $('#pokeWeight').text(`Peso: ${response.weight} (Kg)`)
      createGraph(response)
    });
  })

  function createGraph(data){
    var pokeStats = data.stats.map(function(about){
      return { label: about.stat.name, y: about.base_stat }
    })

    var chart = new CanvasJS.Chart("chartContainer", {
      theme: "light1", // "light2", "dark1", "dark2"
      animationEnabled: true, // change to true		
      title:{
        text: "Estadísticas del Pokemón"
      },
      data: [
      {
        // Change type to "bar", "area", "spline", "pie",etc.
        type: "column",
        dataPoints: pokeStats
        
      }
      ]
    });
    chart.render();
  } 
})