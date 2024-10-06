
//import Loader from "@/components/loader/Loader";

import './page.scss'
//import {useHandleFirstSession} from "@/hooks/useHandleFirstSession";
import {getPlanets} from "@/lib/planets";
import {PlanetSlider} from "@/components/planetSlider/PlanetSlider";
import {Planet} from "@/types/Planet";

export default function Banner() {
    //const { isLoading } = useHandleFirstSession();

     const planets:Planet[]  = getPlanets();

    return (
        <>
            {/*{isLoading ? (
                <>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-[75vh] h-[75vh] bg-[url('../images/home.gif')] bg-contain bg-center bg-no-repeat transform scale-0 animate-fadeIn"></div>

                        <Loader />
                    </div>
                </>
            ) : (*/}
                <div className="grid grid__container">
                    <div className="grid__wrapper">
                        <div className="grid__item"/>
                        <div className="grid__item">
                            <PlanetSlider planetSliders={planets}/>
                        </div>
                        <div className="grid__item"/>
                        <div className="grid__item"/>
                        <div className="grid__item"/>
                    </div>
                </div>
             {/* )
            }*/}
        </>

    );
}
