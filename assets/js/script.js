$(function(){

  $('button').click(function(event){
    event.preventDefault();

    var pokemonID = $('#pokedex').val()
    var settings = {
      "url": `https://pokeapi.co/api/v2/pokemon/${pokemonID}`,
      "method": "GET",
    };
    //comprobacion para asegurarse que se ingrese un digito que exista en la api para los pokemones
    if (parseInt(pokemonID) <= 0 || parseInt(pokemonID) > 898){
      window.alert("Error en PokeID. Identificación fuera de rango; no  hay registros.")
    } else if (pokemonID === ""){
      window.alert("Debe ingresar un número para la consulta.")
    } else {
      $.ajax(settings).done(function (response) {
        $('#pokeName').text(response.name)
        $('#pokeSprite').attr('src', response.sprites['front_shiny'])
        $('#pokeWeight').text(`Peso: ${response.weight} (Lb)`)
        createGraph(response)
      });
    }
    
  })

  function createGraph(data){
    var pokeStats = data.stats.map(function(about){
      return { label: about.stat.name, y: about.base_stat }
    })

    var chart = new CanvasJS.Chart("chartContainer", {
      //theme: "dark1", // "light2", "dark1", "dark2"
      backgroundColor: "#343a40",
      animationEnabled: true, // change to true		
      title:{
        text: "Estadísticas del Pokemón",
        fontColor: "#effd0d", // 1, color para concordar con el desplegadoen el sitio.
      },
      axisX:{
        labelFontColor: "#effd0d" // 2
      },
      axisY:{
        labelFontColor: "#effd0d" // 3
      },
      data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: "column",
          dataPoints: pokeStats
        
        }
      ],
      width: 600,
    });
    chart.render();
  } 
})
