
const lojas = [
    { 
      nome: "RIO SUL", 
      lat: -22.798465383728914, 
      lng: -43.644806268176616, 
      endereco: "Estr. Rio São Paulo, 1380 - Campo Lindo, Seropédica - RJ, 23890-000" 
    },
    { 
      nome: "RIO SUL", 
      lat: -22.74137499494114, 
      lng: -43.48521255254507, 
      endereco: "R. Tomás Fonseca, 500 - Comendador Soares, Nova Iguaçu - RJ, 26280-376" 
    },
    { 
      nome: "ADONAI", 
      lat: -22.846318250530064, 
      lng: -43.32485432192923, 
      endereco: "R. Cisplatina, 9 - 11 - Irajá, Rio de Janeiro - RJ, 21235-070" 
    },
  ];
  
  // Função para calcular distância (fórmula Haversine)
  function calculateDistance(lat1, lng1, lat2, lng2) {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Raio da Terra em km
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  // Manipulação do formulário
  document.getElementById("locationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedRegion = document.getElementById("region").value;
    const [userLat, userLng] = selectedRegion.split(",").map(Number);
    const resultsDiv = document.getElementById("results");
  
    // Calcula distâncias para cada loja
    const distances = lojas.map(loja => ({
      nome: loja.nome,
      endereco: loja.endereco,
      distancia: calculateDistance(userLat, userLng, loja.lat, loja.lng),
      lat: loja.lat,
      lng: loja.lng
    }));
  
    // Ordena lojas por proximidade
    distances.sort((a, b) => a.distancia - b.distancia);
  
    // Exibe resultados com nome, endereço e distância
    resultsDiv.innerHTML = "<h2>Lojas mais próximas:</h2>" +
      distances.map(loja => `
        <div>
          <p><strong>${loja.nome}</strong></p>
          <p>${loja.endereco}</p>
          <p>Distância: ${loja.distancia.toFixed(2)} km</p>
          <a href="https://www.google.com/maps?q=${loja.lat},${loja.lng}" target="_blank">
            <button class="directions-button">Como Chegar</button>
          </a>
        </div>
      `).join("");
  });
  