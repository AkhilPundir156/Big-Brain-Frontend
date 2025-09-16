import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BrainService from "../../utils/brainService";

import BrainItemCard from "./BrainItemCard";
import BrianItemContent from "./BrainItemContent";
import DialogModal from "../../ui/DialogModal";

const Sharedbrain = () => {
    const params = useParams();
    const navigation = useNavigate();

    const [shareBrain, setShareBrain] = useState<any>(null);
    const [brainSelected, setBrainSelected] = useState<any>(null);
    const triggerRef = useRef<HTMLSpanElement>(null);

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

    const handleSelectBrain = (brain: any) => {
        setBrainSelected(brain);
        // Hack to open Brain without displaying the trigger button / opening the modal without clicking its own button.
        // clicking modal button from another button so it get opened up 
        if (triggerRef.current) {
            triggerRef.current.click();
        }
    };

    return (
        <div className="p-10">
            {shareBrain && (
                <BrainItemCard
                    brainItems={shareBrain}
                    isShared={true}
                    handleSelectBrain={handleSelectBrain}
                />
            )}

            <DialogModal
                title="Brain Item"
                trigger={<span ref={triggerRef} className="hidden" />}
                onclose={() => setBrainSelected(null)}
            >
                <BrianItemContent brainItem={brainSelected} />
            </DialogModal>
        </div>
    );
};

export default Sharedbrain;
