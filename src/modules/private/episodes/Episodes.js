import React from "react";

import EpisodesTitle from "../../../components/episodes-title/EpisodesTitle";
import EpisodesTable from "../../../components/episodes-table/EpisodesTable";

const Episodes = () => {
    return (
        <div className="home">
            <EpisodesTitle />
            <EpisodesTable />
        </div>
    );
};

export default Episodes;