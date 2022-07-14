import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  generateCharacter,
  generateLoadout,
  getSpellByName,
} from "./generator";

function Character() {
  const [character, setCharacter] = useState(generateCharacter());

  const [loadout, setLoadout] = useState();
  const [useLoadouts, setUseLoadouts] = useState(false);

  const handleChange = () => {
    setUseLoadouts(!useLoadouts);
  };

  useEffect(() => {
    if (useLoadouts) {
      setLoadout(generateLoadout());
      return;
    }

    setLoadout();
  }, [useLoadouts, character]);

  const generateCharacterClicked = () => setCharacter(generateCharacter());

  return (
    <main>
      <h1>Generatore Personaggi per Cairn</h1>
      <p>
        <button className="link" onClick={generateCharacterClicked}>
          Clicca
        </button>{" "}
        per generare un nuovo personaggio.
      </p>
      <p>
        <label>
          <input
            type="checkbox"
            checked={useLoadouts}
            onChange={handleChange}
          />{" "}
          Usa i Pacchetti di Equipaggiamento
        </label>{" "}
        <small>
          (di{" "}
          <a href="https://cairnrpg.com/hacks/third-party/fantasy-loadouts/">
            Jim Parkins
          </a>
          )
        </small>
      </p>
      <div className="character">
        <h1>Aspetto</h1>
        <p>
          Sei <i>{character.name}</i>, in passato eri {character.background}.{" "}
          {character.traits} Hai {character.age} anni.
        </p>

        <h1>Attributi</h1>
        <div>
          <b>HP:</b> {character.hp}
        </div>
        <div>
          <b>Armatura:</b> {loadout ? loadout.armorValue : character.armorValue}
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

        <div>
          <b>Attrezzatura di partenza</b>:{" "}
          <ul>
            {character.startingSupplies.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {loadout ? (
          <>
            <h1>{loadout.title}</h1>
            <ul>
              {loadout.equipment.map((item) => (
                <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
            {(loadout.spells || []).length ? <h2>Incantesimi</h2> : ""}
            {(loadout.spells || [])
              .map((spellName) => getSpellByName(spellName))
              .map((spell) => (
                <div key={spell.name}>
                  <b>
                    <i>{spell.name}</i>
                  </b>
                  : {spell.description}
                </div>
              ))}
            {(loadout.drugs || []).length ? <h2>Droghe</h2> : ""}
            {(loadout.drugs || []).map((drug) => (
              <div key={drug.name}>
                <b>
                  <i>{drug.name}</i>
                </b>
                : {drug.description}
              </div>
            ))}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      <div className="attribution">
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
          <Link href="/loadouts">
            Vedi i Pacchetti di Equipaggiamento Opzionali
          </Link>
        </p>
        <p>
          Realizzato da <a href="https://mb.maletta.space/">Sbax</a>.
        </p>
      </div>
    </main>
  );
}

export default Character;
