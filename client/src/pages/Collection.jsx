import React from "react";
import { useState, useEffect, useMemo } from "react";
import "./Collection.css";
import { useAuth0 } from "@auth0/auth0-react";
import Chatbot from "../components/Chatbot";

async function getCollected(email) {
  let response = await fetch(`http://localhost:5050/records/users/${email}`);
  const result = await response.json();
  return result[0].collected;
}

export const Collection = () => {
  const { isAuthenticated, user } = useAuth0();
  const [smiskis, setSmiskis] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      getCollected(user.email).then((collectedSmiskis) => {
        console.log(collectedSmiskis);
        setSmiskis(collectedSmiskis);
      });
    }
  }, [isAuthenticated, user]);

  const dictionary = useMemo(() => {
    const dict = {};
    for (let i = 0; i < smiskis.length; i++) {
      dict[smiskis[i]["name"]] = true;
    }
    return dict;
  }, [smiskis]);

  return (
    <div className="outer-container">
      <div className="collection-header">
        <h1>My Smiski Collection</h1>
      </div>

      <div className="series-header">
        <h1>Sunday Series</h1>
      </div>
      <div className="series-image1">
        <div>
          <img
            src="../../public/sunday_airplane.png"
            alt="Airplane Smiski"
            className={dictionary["Paper_Airplane"] ? "" : "locked"}
          />
          <p>Smiski Paper Airplane</p>
        </div>
        <div>
          <img
            src="../../public/sunday_bubbles.png"
            alt="Bubbles Smiski"
            className={dictionary["Bubbles"] ? "" : "locked"}
          />
          <p>Smiski Blowing Bubbles</p>
        </div>
        <div>
          <img
            src="../../public/sunday_garden.png"
            alt="Garden Smiski"
            className={dictionary["Gardening"] ? "" : "locked"}
          />
          <p>Smiski Gardening</p>
        </div>
        <div>
          <img
            src="../../public/sunday_sing.png"
            alt="Singing Smiski"
            className={dictionary["Sing-Along"] ? "" : "locked"}
          />
          <p>Smiski Singing Along</p>
        </div>
        <div>
          <img
            src="../../public/sunday_skateboard.png"
            alt="Skateboard Smiski"
            className={dictionary["Skateboarding"] ? "" : "locked"}
          />
          <p>Smiski Skateboarding</p>
        </div>
        <div>
          <img
            src="../../public/sunday_sunbathe.png"
            alt="Sunbathe Smiski"
            className={dictionary["Sunbathing"] ? "" : "locked"}
          />
          <p>Smiski Sunbathing</p>
        </div>
      </div>

      <div className="series-header">
        <h1>Exercising Series</h1>
      </div>
      <div className="series-image2">
        <div>
          <img
            src="../../public/exercise_crunch.png"
            alt="Smiski Doing Crunches"
            className={dictionary["Crunches"] ? "" : "locked"}
          />
          <p>Smiski Doing Crunches</p>
        </div>
        <div>
          <img
            src="../../public/exercise_aerobics.png"
            alt="Smiski Aerobics"
            className={dictionary["Aerobics"] ? "" : "locked"}
          />
          <p>Smiski Aerobics</p>
        </div>
        <div>
          <img
            src="../../public/exercise_balance.png"
            alt="Smiski Balance"
            className={dictionary["Balance"] ? "" : "locked"}
          />
          <p>Smiski Balance</p>
        </div>
        <div>
          <img
            src="../../public/exercise_dumbell.png"
            alt="Smiski Dumbbell"
            className={dictionary["Dumbbell"] ? "" : "locked"}
          />
          <p>Smiski Dumbbell</p>
        </div>
        <div>
          <img
            src="../../public/exercise_hoop.png"
            alt="Smiski Hoop"
            className={dictionary["Hoop"] ? "" : "locked"}
          />
          <p>Smiski Hoop</p>
        </div>
        <div>
          <img
            src="../../public/exercise_stretch.png"
            alt="Smiski Stretch"
            className={dictionary["Stretching"] ? "" : "locked"}
          />
          <p>Smiski Stretch</p>
        </div>
      </div>

      <div className="series-header">
        <h1>Bath Series</h1>
      </div>
      <div className="series-image3">
        <div>
          <img
            src="../../public/bath_dazed.png"
            alt="Smiski Dazed"
            className={dictionary["Dazed"] ? "" : "locked"}
          />
          <p>Smiski Dazed</p>
        </div>
        <div>
          <img
            src="../../public/bath_duck.png"
            alt="Smiski With Duck"
            className={dictionary["With_Duck"] ? "" : "locked"}
          />
          <p>Smiski With Duck</p>
        </div>
        <div>
          <img
            src="../../public/bath_looking.png"
            alt="Smiski Looking"
            className={dictionary["Looking"] ? "" : "locked"}
          />
          <p>Smiski Looking</p>
        </div>
        <div>
          <img
            src="../../public/bath_nolook.png"
            alt="Smiski Not Looking"
            className={dictionary["Not_Looking"] ? "" : "locked"}
          />
          <p>Smiski Not Looking</p>
        </div>
        <div>
          <img
            src="../../public/bath_scrub.png"
            alt="Smiski Scrubbing"
            className={dictionary["Scrubbing"] ? "" : "locked"}
          />
          <p>Smiski Scrubbing</p>
        </div>
        <div>
          <img
            src="../../public/bath_shampoo.png"
            alt="Smiski Shampooing"
            className={dictionary["Shampoo"] ? "" : "locked"}
          />
          <p>Smiski Shampooing</p>
        </div>
      </div>

      {/* toilet series smiski */}
      <div className="series-header">
        <h1>Toilet Series</h1>
      </div>
      <div className="series-image4">
        <div>
          <img
            src="../../public/toilet_help.png"
            className={dictionary["Helping_Out"] ? "" : "locked"}
          />
          <p>Smiski Helping Out</p>
        </div>
        <div>
          <img
            src="../../public/toilet_hold.png"
            className={dictionary["Holding_In"] ? "" : "locked"}
          />
          <p>Smiski Holding It In</p>
        </div>
        <div>
          <img
            src="../../public/toilet_peek.png"
            className={dictionary["Peek-A-Boo"] ? "" : "locked"}
          />
          <p>Smiski Peek-A-Boo</p>
        </div>
        <div>
          <img
            src="../../public/toilet_rest.png"
            className={dictionary["Resting"] ? "" : "locked"}
          />
          <p>Smiski Resting</p>
        </div>
        <div>
          <img
            src="../../public/toilet_smelly.png"
            className={dictionary["Little_(Smelly)"] ? "" : "locked"}
          />
          <p>Smiski Little Smelly</p>
        </div>
        <div>
          <img
            src="../../public/toilet_squat.png"
            className={dictionary["Squatting"] ? "" : "locked"}
          />
          <p>Smiski Squating</p>
        </div>
      </div>

      {/* work series smiski */}
      <div className="series-header">
        <h1>At Work Series</h1>
      </div>
      <div className="series-image5">
        <div>
          <img
            src="../../public/work_approve.png"
            className={dictionary["Approving"] ? "" : "locked"}
          />
          <p>Smiski Approving</p>
        </div>
        <div>
          <img
            src="../../public/work_hurry.png"
            className={dictionary["On_the_Rord"] ? "" : "locked"}
          />
          <p>Smiski On the Rord</p>
        </div>
        <div>
          <img
            src="../../public/work_idea.png"
            className={dictionary["Good_Idea"] ? "" : "locked"}
          />
          <p>Smiski Good Idea</p>
        </div>
        <div>
          <img
            src="../../public/work_present.png"
            className={dictionary["Presenting"] ? "" : "locked"}
          />
          <p>Smiski Presenting</p>
        </div>
        <div>
          <img
            src="../../public/work_research.png"
            className={dictionary["Researching"] ? "" : "locked"}
          />
          <p>Smiski Researching</p>
        </div>
        <div>
          <img
            src="../../public/work_think.png"
            className={dictionary["Group_Think"] ? "" : "locked"}
          />
          <p>Smiski Group Thinking</p>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};
