import { generateCharacter } from "./generator";

function App() {
  const character = generateCharacter();

  return (
    <main>
      <h1>Generatore Personaggi per Cairn</h1>
      <div className="character">
        <h1>Aspetto</h1>
        <p>
          Sei <i>{character.name}</i>, in passato eri un {character.background}.{" "}
          {character.traits} Hai {character.age} anni.
        </p>

        <h1>Attributi</h1>
        <div>
          <b>HP:</b> {character.hp}
        </div>
        <div>
          <b>Armatura:</b> {character.armorValue}
        </div>
        <div>
          <b>FOR:</b> {character.str}
        </div>
        <div>
          <b>DES:</b> {character.dex}
        </div>
        <div>
          <b>VOL:</b> {character.wil}
        </div>

        <h1>Equipaggiamento</h1>
        <div>
          <b>Armatura</b>: {character.armor}
        </div>
        <div>
          <b>Arma</b>: {character.weapon}
        </div>
        <div>
          <b>Attrezzi, strumenti e chincaglieria</b>:{" "}
          {character.gearToolsAndTrinkets}
        </div>
        <div>
          {(() => {
            console.log(character.bonus);
            if (character.bonus.name) {
              return (
                <>
                  <b>Libro di Incantesimi:</b> {character.bonus.name},{" "}
                  {character.bonus.description.toLowerCase()}
                </>
              );
            }

            return (
              <>
                <b>Bonus</b>: {character.bonus}
              </>
            );
          })()}
        </div>
        <div>
          <b>Attrezzatura di partenza</b>:{" "}
          <ul>
            {character.startingSupplies.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p>
        <a href="/">Ricarica la pagina</a> per generare un nuovo personaggio.
      </p>
      <p>
        Basato sul generatore di personaggi per{" "}
        <a href="https://cairnrpg.com/">Cairn</a> di{" "}
        <a href="https://nakade.itch.io/">Nakade</a>.
      </p>
      <p>
        Traduzioni a cura di{" "}
        <a href="https://ita-translation-alliance.itch.io/cairn-ita">
          Italian Translation Alliance
        </a>
        .
      </p>
      <p>
        Realizzato da <a href="https://mb.maletta.space/">Sbax</a>.
      </p>
    </main>
  );
}

export default App;
