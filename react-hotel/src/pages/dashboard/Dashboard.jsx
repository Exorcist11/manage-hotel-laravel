import { toast } from "sonner";

export default function Dashboard() {
    return (
        <div>
            <button onClick={() => toast.success("My first toast")}>
                Give me a toast
            </button>
        </div>
    );
}
