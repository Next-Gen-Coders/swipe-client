/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

const cardData = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        url: "https://images.unsplash.com/photo-1570464197285-9949814674a7?q=80&w=2273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 7,
        url: "https://images.unsplash.com/photo-1578608712688-36b5be8823dc?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 8,
        url: "https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];


const Card = ({ id, url, setCards, cards, setIsDragging, setShowMoreInfo, setDragSide }: { id: number, url: string, setCards: any, cards: any, setIsDragging: any, setShowMoreInfo: any, setDragSide: any }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);


    const isFront = id === cards[cards.length - 1].id;

    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

    const rotate = useTransform(() => {
        const offset = isFront ? 1 : id % 2 ? 4 : -4;

        return `${rotateRaw.get() + offset}deg`;
    });


    const handleDragEnd = () => {
        setIsDragging(false);
        if (Math.abs(y.get()) > 70 && (y.get()) < 0) {
            setShowMoreInfo(true);
        }

        if ((x.get()) > 60) {
            console.log("right");
            setCards((pv: any) => pv.filter((v: any) => v.id !== id));
        }

        if ((x.get()) < -60) {
            console.log("left");
            setCards((pv: any) => pv.filter((v: any) => v.id !== id));
        }
    };

    return (
        <motion.div
            className={`w-[80%] md:w-[70%] aspect-[7/8] origin-bottom rounded-3xl bg-white hover:cursor-grab active:cursor-grabbing overflow-hidden flex justify-center items-center  border border-black/10  shadow-black ${isFront ? 'shadow-xl rotate-0' : '!opacity-50 '}`}
            style={{
                gridRow: 1,
                gridColumn: 1,
                x,
                y,
                opacity,
                rotate,
                transition: "0.125s transform",
            }}
            animate={{
                scale: isFront ? 1 : 0.98,
            }}
            drag={isFront ? true : false}
            dragConstraints={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            onDrag={(e, info) => {
                // Convert x movement to degrees - assuming you have a function or value that does this
                const deg =info.offset.x
                
                if (deg < 2) {
                    setDragSide("left");
                } else {
                    setDragSide("right");
                }
            }}

        >
            <img src={url}
                alt="Placeholder alt"

                className="h-full w-full object-cover"
            />
        </motion.div>
    );
};


const SwipeCards = ({ setIsDragging, setShowMoreInfo, setDragSide }: { setIsDragging: (isDragging: boolean) => void, setShowMoreInfo: (showMoreInfo: boolean) => void, setDragSide: (dragSide: "left" | "right") => void }) => {
    const [cards, setCards] = useState(cardData);

    return (
        <>
            <div
                className="grid h-full w-full place-items-center"
            >
                {cards.map((card) => {
                    return (
                        <Card key={card.id} cards={cards} setCards={setCards} {...card} setIsDragging={setIsDragging} setShowMoreInfo={setShowMoreInfo} setDragSide={setDragSide} />
                    );
                })}
            </div>
        </>
    );
};



export default SwipeCards;
