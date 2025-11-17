import { motion } from "framer-motion";

interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <motion.button
            className="px-6 py-3 bg-primary text-md rounded-xl font-semibold text-white shadow-md hover:scale-110 transition-transform duration-300 will-change-transform"
            onClick={props.onClick}
            style={{ transformOrigin: "center" }}
        >
            <span className="block">{props.label}</span>
        </motion.button>
    );
}