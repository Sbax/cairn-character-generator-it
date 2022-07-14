import React from "react";
import { Link } from "wouter";
import { generateLoadout, getSpellByName } from "./generator";
import generator from "./generator.it.json";

function Loadouts() {
  return (
    <main>
      <h1>
        Pacchetti di Equipaggiamento Opzionali{" "}
        <small>
          (di{" "}
          <a href="https://cairnrpg.com/hacks/third-party/fantasy-loadouts/">
            Jim Parkins
          </a>
          )
        </small>
      </h1>
      <Link href="/">Torna al Generatore</Link>
      {generator.loadouts
        .map((loadout) => generateLoadout(loadout))
        .map((loadout) => (
          <article key={loadout.title}>
            <h2>
              {loadout.number}. {loadout.title}
            </h2>
            <ul>
              {loadout.equipment.map((item) => (
                <li>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
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
            {(loadout.drugs || []).map((drug) => (
              <div key={drug.name}>
                <b>
                  <i>{drug.name}</i>
                </b>
                : {drug.description}
              </div>
            ))}
          </article>
        ))}
    </main>
  );
}

export default Loadouts;
