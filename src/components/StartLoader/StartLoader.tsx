import Loader from "@/components/loader/Loader";
import {ProgressSpeed, ProgressStart, ProgressValue} from "@/enums/Loader";

export const StartLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className="w-[75vh] h-[75vh] bg-[url('../images/home.gif')] bg-contain bg-center bg-no-repeat transform scale-0 animate-fadeIn"></div>

            <Loader
                progressFill
                progressValue={ProgressValue.mainLoader}
                progressSpeed={ProgressSpeed.mainLoader}
                progressStart={ProgressStart.mainLoader}/>
        </div>
    )
}