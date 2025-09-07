import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BrainService from "../../utils/brainService";

const Sharedbrain = () => {
    const params = useParams();
    const navigation = useNavigate();

    const [shareBrain, setShareBrain] = useState();

    useEffect(() => {
        const brainId = params.brainId;
        if (!brainId) {
            navigation("/my-brain");
            return;
        }
        fetchBrainItems(brainId);
    }, []);

    const fetchBrainItems = async (brainId: string) => {
        const response = await BrainService.getSharedBrain(brainId);
        if (response.success) {
            setShareBrain(response.data);
        }
    };
    return <div>{JSON.stringify(shareBrain)}</div>;
};

export default Sharedbrain;
