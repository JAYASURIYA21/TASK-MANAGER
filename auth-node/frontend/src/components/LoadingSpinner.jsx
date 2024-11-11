import { LoaderCircle} from "lucide-react";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
        <LoaderCircle className="animate-spin w-20 h-20 text-white"/>
		</div>
	);
};

export default LoadingSpinner;