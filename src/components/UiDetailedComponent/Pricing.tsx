import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store";
import { setNavbarItem } from "../../slices/uiSlice";

import plans from "../../demo/plan_data";

import { Button } from "../../ui/ButtonElement";

export const Pricing = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(setNavbarItem("plans"));

        return () => {
            dispatch(setNavbarItem(null));
        };
    }, []);
    return (
        <div className="bg-first-bg text-secondary-text py-24 px-6">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-green-text mb-4">
                    Pricing & Plans
                </h1>
                <p className="text-lg text-tertiary-text max-w-2xl mx-auto">
                    Choose the plan that fits your brain power. Upgrade anytime
                    as your ideas grow.
                </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex flex-col rounded-2xl border shadow-xl p-8 ${
                            plan.highlighted
                                ? "bg-primary-bg border-primary-border scale-105"
                                : "bg-primary-bg border-secondary-border"
                        }`}
                    >
                        <h2 className="text-2xl font-semibold mb-2">
                            {plan.name}
                        </h2>
                        <p className="text-3xl font-bold text-green-text mb-4">
                            {plan.price}
                        </p>
                        <p className="mb-6 text-tertiary-text">
                            {plan.description}
                        </p>

                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-2"
                                >
                                    <Check className="w-5 h-5 text-secondary-text" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        {plan.buyName && (
                            <Button
                                isFull={true}
                                variant="primary"
                                size="md"
                                text={plan.buyName}
                                onClickHandler={() =>
                                    toast.success(
                                        "This Feature is not yet Supported"
                                    )
                                }
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
