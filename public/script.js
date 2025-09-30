async function buscarJogador() {
  const tagInput = document.getElementById("playerTag").value.trim();
  if (!tagInput) {
    alert("Digite a tag do jogador!");
    return;
  }

  const tag = tagInput.replace("#", "%23");
  const res = await fetch(`/player/${tag}`);
  const data = await res.json();

  if (data.reason) {
    document.getElementById("result").innerHTML =
      `<p style="color:red">Erro: ${data.reason}</p>`;
    return;
  }

  document.getElementById("result").innerHTML = `
    <h2>${data.name} (${data.tag})</h2>
    <p><b>Nível:</b> ${data.expLevel}</p>
    <p><b>Troféus:</b> ${data.trophies}</p>
    <p><b>Melhor Troféus:</b> ${data.bestTrophies}</p>
    <p><b>Vitórias:</b> ${data.wins} | <b>Derrotas:</b> ${data.losses}</p>
    <p><b>Clã:</b> ${data.clan ? data.clan.name : "Sem clã"}</p>
  `;
}
