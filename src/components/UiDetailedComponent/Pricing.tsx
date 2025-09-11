import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store";
import { setNavbarItem } from "../../slices/uiSlice";

export const Pricing = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(setNavbarItem("plans"));
        
        return () => {
            dispatch(setNavbarItem(null));
        };
    }, []);
    return <div>Pricing/Plans</div>;
};

export default Pricing;
