import AthleticsSports from "./AthleticsSports";
import Cycling from "./Cycling";
import Fitness from "./Fitness";
import IndividualSports from "./IndividualSports";
import TeamSports from "./TeamSports";
import WaterSports from "./WaterSports";

const categoriesIcons = [
    { name: 'Athletics Sports', component: <AthleticsSports /> },
    { name: 'Water Sports', component: <WaterSports /> },
    { name: 'Cycling', component: <Cycling /> },
    { name: 'Fitness', component: <Fitness /> },
    { name: 'Team Sports', component: <TeamSports /> },
    { name: 'Individual Sports', component: <IndividualSports /> },
];

export default categoriesIcons;