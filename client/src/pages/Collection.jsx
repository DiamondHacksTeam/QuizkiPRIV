import React from "react";
import "./Collection.css";

export const Collection = () => {
    return (
        <div> 
            <div className="collection-header">
                <h1>My Smiski Collection</h1>
            </div>


            {/* sunday series smiski  */}
            <div className="series-header">
                <h1>Sunday Series</h1>
            </div>
            <div className="series-image1">
                <div>
                    <img src="../../public/sunday_airplane.png" alt="Airplane Smiski" />
                    <p>Smiski Paper Airplane</p>
                </div>
                <div>
                    <img src="../../public/sunday_bubbles.png" alt="Bubbles Smiski" />
                    <p>Smiski Blowing Bubbles</p>
                </div>
                <div>
                    <img src="../../public/sunday_garden.png" alt="Garden Smiski" />
                    <p>Smiski Gardening</p>
                </div>
                <div>
                    <img src="../../public/sunday_sing.png" alt="Singing Smiski" />
                    <p>Smiski Singing Along</p>
                </div>
                <div>
                    <img src="../../public/sunday_skateboard.png" alt="Skateboard Smiski" />
                    <p>Smiski Skateboarding</p>
                </div>
                <div>
                    <img src="../../public/sunday_sunbathe.png" alt="Sunbathe Smiski" />
                    <p>Smiski Sunbathing</p>
                </div>
            </div>


            {/* exercise series smiski */}
            <div className="series-header">
                <h1>Exercising Series</h1>
            </div>
            <div className="series-image2">
                <div>
                    <img src="../../public/exercise_crunch.png" alt="Smiski Doing Crunches" />
                    <p>Smiski Doing Crunches</p>
                </div>
                <div>
                    <img src="../../public/exercise_aerobics.png" alt="Smiski Aerobics" />
                    <p>Smiski Aerobics</p>
                </div>
                <div>
                    <img src="../../public/exercise_balance.png" alt="Smiski Balance" />
                    <p>Smiski Balance</p>
                </div>
                <div>
                    <img src="../../public/exercise_dumbell.png" alt="Smiski Dumbell" />
                    <p>Smiski Dumbell</p>
                </div>
                <div>
                    <img src="../../public/exercise_hoop.png" alt="Smiski Hoop" />
                    <p>Smiski Hoop</p>
                </div>
                <div>
                    <img src="../../public/exercise_stretch.png" alt="Smiski Stretch" />
                    <p>Smiski Stretch</p>
                </div>
            </div>


            {/* bath series smiski */}
            <div className="series-header">
                <h1>Bath Series</h1>
            </div>
            <div className="series-image3">
                <div>
                    <img src="../../public/bath_dazed.png" alt="Smiski Dazed" />
                    <p>Smiski Dazed</p>
                </div>
                <div>
                    <img src="../../public/bath_duck.png" alt="Smiski With Duck" />
                    <p>Smiski With Duck</p>
                </div>
                <div>
                    <img src="../../public/bath_looking.png" alt="Smiski Looking" />
                    <p>Smiski Looking</p>
                </div>
                <div>
                    <img src="../../public/bath_nolook.png" alt="Smiski Not Looking" />
                    <p>Smiski Not Looking</p>
                </div>
                <div>
                    <img src="../../public/bath_scrub.png" alt="Smiski Scrubbing" />
                    <p>Smiski Scrubbing</p>
                </div>
                <div>
                    <img src="../../public/bath_shampoo.png" alt="Smiski Shampooing" />
                    <p>Smiski Shampooing</p>
                </div>
            </div>


            {/* toilet series smiski */}
            <div className="series-header">
                <h1>Toilet Series</h1>
            </div>
            <div className="series-image4">
                <div>
                    <img src="../../public/toilet_help.png" />
                    <p>Smiski Helping Out</p>
                </div>
                <div>
                    <img src="../../public/toilet_hold.png" />
                    <p>Smiski Holding It In</p>
                </div>
                <div>
                    <img src="../../public/toilet_peek.png" />
                    <p>Smiski Peek-A-Boo</p>
                </div>
                <div>
                    <img src="../../public/toilet_rest.png"  />
                    <p>Smiski Resting</p>
                </div>
                <div>
                    <img src="../../public/toilet_smelly.png"  />
                    <p>Smiski Little Smelly</p>
                </div>
                <div>
                    <img src="../../public/toilet_squat.png"  />
                    <p>Smiski Squating</p>
                </div>
            </div>


            {/* work series smiski */}
            <div className="series-header">
                <h1>At Work Series</h1>
            </div>
            <div className="series-image5">
                <div>
                    <img src="../../public/work_approve.png" />
                    <p>Smiski Approving</p>
                </div>
                <div>
                    <img src="../../public/work_hurry.png" />
                    <p>Smiski In A Hurry</p>
                </div>
                <div>
                    <img src="../../public/work_idea.png" />
                    <p>Smiski Good Idea</p>
                </div>
                <div>
                    <img src="../../public/work_present.png"  />
                    <p>Smiski Presenting</p>
                </div>
                <div>
                    <img src="../../public/work_research.png"  />
                    <p>Smiski Researching</p>
                </div>
                <div>
                    <img src="../../public/work_think.png"  />
                    <p>Smiski Group Thinking</p>
                </div>
            </div>

        </div>
    );
};