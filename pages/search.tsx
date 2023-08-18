import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const SearchPage = () => {

    const router = useRouter();

    const { q } = router?.query

    const [typedText, setTypedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const [typingStatus, setTypingStatus] = useState<"not allow" | "typing" | "finished">("not allow")

    const [cursorPosition, setCursorPosition] = useState({ x: Math.random() * 1000, y: Math.random() * 1000 });
    const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
    const [searchBtnPosition, setSearchBtnPosition] = useState({ x: 0, y: 0 });

    const inputRef = useRef<any>(null)
    const searchBtnRef = useRef<any>(null)

    useEffect(() => {
        let text = q ?? ""
        if (typingStatus !== "not allow") {
            if (currentIndex < text.length) {

                const typingTimeout = setTimeout(() => {
                    setTypedText(prevText => prevText + text[currentIndex]);
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }, 200);

                return () => clearTimeout(typingTimeout);
            } else {
                setTypingStatus("finished")
            }
        }

    }, [currentIndex, q, typingStatus]);

    useEffect(() => {
        if (inputRef.current) {
            const targetRect = inputRef.current.getBoundingClientRect();
            setInputPosition({
                x: targetRect.left + targetRect.width / 2 + 50,
                y: targetRect.top + 10,
            });
        }
    }, [inputRef])

    useEffect(() => {
        if (inputPosition) {
            setTimeout(() => {
                setCursorPosition({ x: inputPosition.x, y: inputPosition.y })
            }, 500)
        }
    }, [inputPosition])

    useEffect(() => {
        setTimeout(() => {
            setTypingStatus("typing")
        }, 2500)
    }, []);

    useEffect(()=>{
        if (typingStatus === "finished"){
            if (searchBtnRef.current) {
                const targetRect = searchBtnRef.current.getBoundingClientRect();
                setCursorPosition({
                    x: targetRect.left + targetRect.width / 2 + 15,
                    y: targetRect.top + 30,
                });

                setTimeout(()=>{
                    //@ts-ignore
                    window.location = `https://www.google.com/search?q=${q}`
                },2500)
            }
        }
    },[typingStatus])

    return (
        <div className="w-full min-h-screen bg-gray-700 p-[16px]">


            <svg className="w-5 h-5" style={{ position: 'absolute', top: cursorPosition.y, left: cursorPosition.x, pointerEvents: 'none', zIndex: 9999, transition: 'all 2s' }} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="1064.7701 445.5539 419.8101 717.0565" enable-background="new 1064.7701 445.5539 419.8101 717.0565">
                <polygon fill="#231F20" points="1283.1857,1127.3097 1406.1421,1077.6322 1314.2406,850.1678 1463.913,852.7823 1093.4828,480.8547 
	1085.4374,1005.6964 1191.2842,899.8454 "/>
            </svg>

            <div className={"pt-[150px] mx-auto"}>
                <div className={'flex flex-col items-center justify-center '}>
                    <div className="w-full max-w-[250px]">
                        <img className="w-full" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png" />
                    </div>

                    <div className={"mt-[40px] w-full h-[45px] max-w-[550px] border border-white rounded-[25px] flex items-center"}>
                        <p ref={inputRef} className="w-full pr-[30px] text-right text-white">
                            {typedText}
                            <span className="inline-block mx-[2px] translate-y-[-1px] animation-carrot">|</span>
                        </p>
                    </div>

                    <div className=" mt-[20px] flex items-center justify-center gap-[32px]">
                        <div className="px-[24px] py-[12px] bg-gray-800 text-white rounded-[4px]">I'm Feeling Lucky</div>
                        <div ref={searchBtnRef} className="px-[24px] py-[12px] bg-gray-800 text-white rounded-[4px]">Google Search</div>
                    </div>

                    <div className="mt-[50px] text-red-400 text-[20px] animate-pulse">
                        <p>
                            خیلی سخت بود ؟‌ =))
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage