import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const SearchPage = () => {

    const router = useRouter();

    const { q } = router?.query

    const [typedText, setTypedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const [typingStatus , setTypingStatus] = useState<"not allow" | "typing" | "finished">("not allow")

    const [cursorPosition, setCursorPosition] = useState({ x: Math.random()*1000, y: Math.random()*1000 });
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

    const inputRef = useRef<any>(null)

    useEffect(() => {
        let text = q ?? ""
        if(typingStatus !== "not allow"){
            if (currentIndex < text.length ) {

                const typingTimeout = setTimeout(() => {
                    setTypedText(prevText => prevText + text[currentIndex]);
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }, 200);
    
                return () => clearTimeout(typingTimeout);
            }else{
                setTypingStatus("finished")
            }
        }
        
    }, [currentIndex, q,typingStatus]);

    useEffect(() => {
        if (inputRef.current) {
            const targetRect = inputRef.current.getBoundingClientRect();
            setTargetPosition({
                x: targetRect.right - 30,
                y: targetRect.top + targetRect.height / 2,
            });
        }
    }, [inputRef])

    useEffect(() => {
        if (targetPosition) {
            setTimeout(() => {
                setCursorPosition({ x: targetPosition.x, y: targetPosition.y })
            }, 500)
        }
    }, [targetPosition])

    useEffect(() => {
        setTimeout(()=>{
            setTypingStatus("typing")
        },2400)
    }, []);


    return (
        <div className="my-[200px]">
            <p ref={inputRef} className="pr-[30px]">
                {typedText}
                <span className="inline-block mx-[2px] translate-y-[-1px] animation-carrot">|</span>
            </p>
            
            <svg className="w-5 h-5" style={{ position: 'absolute', top: cursorPosition.y, left: cursorPosition.x, pointerEvents: 'none', zIndex: 9999, transition: 'all 2s' }} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="1064.7701 445.5539 419.8101 717.0565" enable-background="new 1064.7701 445.5539 419.8101 717.0565">
<polygon fill="#231F20" points="1283.1857,1127.3097 1406.1421,1077.6322 1314.2406,850.1678 1463.913,852.7823 1093.4828,480.8547 
	1085.4374,1005.6964 1191.2842,899.8454 "/>
</svg>
        </div>
    )
}

export default SearchPage